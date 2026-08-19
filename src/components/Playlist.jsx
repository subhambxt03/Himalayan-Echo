import React, { useState } from 'react';
import SongRow from './SongRow';
import '../styles/Playlist.css';

const Playlist = ({ playlist, currentSong, onSelectSong, onRemoveSong }) => {
  const [showSpotify, setShowSpotify] = useState(false);
  if (!playlist) return null;

  // Build the embed URL using the playlist's spotifyId
  const embedUrl = playlist.spotifyId
    ? `https://open.spotify.com/embed/playlist/${playlist.spotifyId}`
    : null;

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <span className="playlist-title">SELECTED PLAYLIST: {playlist.name}</span>
        {playlist.spotifyId && (
          <button className="spotify-toggle" onClick={() => setShowSpotify(!showSpotify)}>
            {showSpotify ? 'Hide Spotify' : 'Show Spotify Playlist'}
          </button>
        )}
      </div>
      {showSpotify && embedUrl && (
        <div className="spotify-embed">
          <iframe
            src={embedUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            title={`Spotify: ${playlist.name}`}
          />
        </div>
      )}
      <div className="playlist-table">
        <div className="playlist-table-header">
          <span>#</span><span>SONG</span><span>ARTIST</span><span>TIME</span><span>⋮</span>
        </div>
        {playlist.songs.map((song, idx) => (
          <SongRow
            key={song.id}
            song={song}
            index={idx}
            isActive={currentSong?.id === song.id}
            onSelect={() => onSelectSong(song)}
            onRemove={() => onRemoveSong(song.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;