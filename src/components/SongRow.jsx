import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import '../styles/SongRow.css';

const SongRow = ({ song, index, isActive, onSelect, onRemove }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = (e) => { e.stopPropagation(); setMenuOpen(!menuOpen); };

  return (
    <div className={`song-row ${isActive ? 'active' : ''}`} onClick={onSelect}>
      <div className="song-index">
        {isActive ? (
          <span className="equalizer"><span></span><span></span><span></span></span>
        ) : (index + 1)}
      </div>
      <div className="song-cover"><img src={song.cover} alt="" /></div>
      <div className="song-info">
        <div className="song-title">{song.title}</div>
        <div className="song-artist">{song.artist}</div>
      </div>
      <div className="song-duration">{song.duration}</div>
      <div className="song-more">
        <button onClick={toggleMenu} className="more-btn">
          <FiMoreVertical size={18} />
        </button>
        {menuOpen && (
          <div className="song-dropdown dropdown-menu">
            <button onClick={(e) => { e.stopPropagation(); onSelect(); setMenuOpen(false); }}>Play</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongRow;