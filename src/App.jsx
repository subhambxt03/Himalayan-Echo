import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import Playlist from './components/Playlist';
import Footer from './components/Footer';
import { playlists, portfolioUrl, githubUrl } from './data/playlists';
import './styles/App.css';

function App() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(playlists[0].id);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const audioRef = useRef(new Audio());

  const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId) || playlists[0];
  const songs = selectedPlaylist.songs;

  // ---- 1. Define handleNext and handlePrevious FIRST ----
  const handleNext = useCallback(() => {
    const idx = songs.findIndex(s => s.id === currentSong?.id);
    if (idx === -1) return;
    let nextIdx = idx + 1;
    if (shuffle) {
      let randomIdx;
      do { randomIdx = Math.floor(Math.random() * songs.length); } while (randomIdx === idx && songs.length > 1);
      nextIdx = randomIdx;
    } else if (nextIdx >= songs.length) {
      nextIdx = 0;
    }
    setCurrentSong(songs[nextIdx]);
    setProgress(0);
    setIsPlaying(true);
  }, [songs, currentSong, shuffle]);

  const handlePrevious = useCallback(() => {
    const idx = songs.findIndex(s => s.id === currentSong?.id);
    if (idx <= 0) return;
    setCurrentSong(songs[idx - 1]);
    setProgress(0);
    setIsPlaying(true);
  }, [songs, currentSong]);

  // ---- 2. Media Session API integration ----
  useEffect(() => {
    if (!currentSong) return;

    // Update metadata
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: selectedPlaylist.name,
        artwork: [
          { src: currentSong.cover, sizes: '96x96', type: 'image/png' },
          { src: currentSong.cover, sizes: '128x128', type: 'image/png' },
          { src: currentSong.cover, sizes: '192x192', type: 'image/png' },
          { src: currentSong.cover, sizes: '256x256', type: 'image/png' },
          { src: currentSong.cover, sizes: '384x384', type: 'image/png' },
          { src: currentSong.cover, sizes: '512x512', type: 'image/png' },
        ]
      });

      // Set action handlers (play/pause/next/previous/seek)
      navigator.mediaSession.setActionHandler('play', () => {
        setIsPlaying(true);
        audioRef.current.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        setIsPlaying(false);
        audioRef.current.pause();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        handlePrevious();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        handleNext();
      });
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.fastSeek) {
          audioRef.current.fastSeek(details.seekTime);
        } else {
          audioRef.current.currentTime = details.seekTime;
        }
        setProgress(audioRef.current.currentTime);
      });
    }

    // Cleanup: reset handlers when song changes
    return () => {
      if ('mediaSession' in navigator) {
        // Remove action handlers (optional, but good practice)
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
        navigator.mediaSession.setActionHandler('seekto', null);
      }
    };
  }, [currentSong, selectedPlaylist, handleNext, handlePrevious]);

  // ---- 3. Volume and other effects ----
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // Auto-select first song
  useEffect(() => {
    if (!currentSong && songs.length) setCurrentSong(songs[0]);
  }, [songs, currentSong]);

  // Load audio when currentSong changes
  useEffect(() => {
    if (currentSong) {
      const audio = audioRef.current;
      audio.src = currentSong.audio;
      audio.load();
      if (isPlaying) audio.play().catch(() => {});
    }
  }, [currentSong]);

  // Play/pause toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying]);

  // Time update & ended
  useEffect(() => {
    const audio = audioRef.current;
    const handleTime = () => setProgress(audio.currentTime);
    const handleDuration = () => setDuration(audio.duration);
    const handleEnd = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };
    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('loadedmetadata', handleDuration);
    audio.addEventListener('ended', handleEnd);
    return () => {
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('loadedmetadata', handleDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [repeat, handleNext]);

  // ---- 4. Other handlers ----
  const handleSeek = (val) => {
    audioRef.current.currentTime = val;
    setProgress(val);
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleSelectPlaylist = (id) => {
    setSelectedPlaylistId(id);
    const newPlaylist = playlists.find(p => p.id === id);
    if (newPlaylist && newPlaylist.songs.length) {
      setCurrentSong(newPlaylist.songs[0]);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handleRemoveSong = (songId) => {
    const pl = playlists.find(p => p.id === selectedPlaylist.id);
    if (!pl) return;
    pl.songs = pl.songs.filter(s => s.id !== songId);
    if (currentSong?.id === songId) {
      setCurrentSong(pl.songs.length ? pl.songs[0] : null);
      if (pl.songs.length === 0) setIsPlaying(false);
    }
    setSelectedPlaylistId(selectedPlaylist.id);
  };

  const handleVolumeChange = (val) => setVolume(val);

  // ---- 5. Render ----
  return (
    <div className="app-container">
      <Header
        portfolioUrl={portfolioUrl}
        githubUrl={githubUrl}
        showPlaylists={showPlaylists}
        setShowPlaylists={setShowPlaylists}
      />
      <div className="app-main">
        <Sidebar
          playlists={playlists}
          selectedId={selectedPlaylistId}
          onSelect={handleSelectPlaylist}
          show={showPlaylists}
          onClose={() => setShowPlaylists(false)}
        />
        <div className="app-content">
          <MusicPlayer
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onShuffle={() => setShuffle(!shuffle)}
            onRepeat={() => setRepeat(!repeat)}
            shuffle={shuffle}
            repeat={repeat}
            progress={progress}
            duration={duration}
            onSeek={handleSeek}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
          <Playlist
            playlist={selectedPlaylist}
            currentSong={currentSong}
            onSelectSong={handleSelectSong}
            onRemoveSong={handleRemoveSong}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;