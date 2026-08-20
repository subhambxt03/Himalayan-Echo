import React from 'react';
import {
  FiShuffle,
  FiSkipBack,
  FiPlay,
  FiPause,
  FiSkipForward,
  FiRepeat
} from 'react-icons/fi';
import '../styles/MusicPlayer.css';

const MusicPlayer = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat,
  shuffle,
  repeat,
  progress,
  duration,
  onSeek,
  volume,
  onVolumeChange,
}) => {
  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentSong) return <div className="player-empty">Select a song</div>;

  return (
    <div className="music-player">
      <div className={`artwork-wrapper ${isPlaying ? 'playing' : ''}`}>
        <div className="player-artwork">
          <div className="artwork-glow" style={{ backgroundImage: `url(${currentSong.cover})` }} />
          <img
            src={currentSong.cover}
            alt="album"
            className="artwork-image"
            loading="lazy"   // 👈 LAZY LOAD
          />
        </div>
      </div>
      <div className="player-info">
        <div className="player-song-title">{currentSong.title}</div>
        <div className="player-artist">{currentSong.artist}</div>
        <div className="player-controls">
          <div className="player-progress">
            <span className="time-current">{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 1}
              value={progress}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="progress-bar"
              step="0.01"
            />
            <span className="time-duration">{formatTime(duration)}</span>
          </div>
          <div className="player-buttons">
            <div className="btn-group-left">
              <button className={`ctrl-btn ${shuffle ? 'active' : ''}`} onClick={onShuffle}>
                <FiShuffle size={20} />
              </button>
              <button className="ctrl-btn" onClick={onPrevious}>
                <FiSkipBack size={20} />
              </button>
            </div>

            <button className="ctrl-btn play-btn" onClick={onPlayPause}>
              {isPlaying ? <FiPause size={28} /> : <FiPlay size={28} />}
            </button>

            <div className="btn-group-right">
              <button className="ctrl-btn" onClick={onNext}>
                <FiSkipForward size={20} />
              </button>
              <button className={`ctrl-btn ${repeat ? 'active' : ''}`} onClick={onRepeat}>
                <FiRepeat size={20} />
              </button>

              {/* Volume slider – desktop only */}
              <div className="volume-control">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="volume-slider"
                  title="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;