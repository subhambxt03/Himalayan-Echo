import React, { useState } from 'react';
import { FiMusic, FiActivity, FiMoreVertical, FiMenu } from 'react-icons/fi';
import MoreMenu from './MoreMenu';
import '../styles/Header.css';

const Header = ({ portfolioUrl, githubUrl, showPlaylists, setShowPlaylists }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const togglePlaylists = () => setShowPlaylists(!showPlaylists);

  return (
    <header className="header">
      <button className="hamburger-btn" onClick={togglePlaylists} aria-label="Toggle playlists">
        <FiMenu size={24} />
      </button>

      <div className="header-left">
        <FiMusic size={22} />
        <span className="header-library">Himalayan Echo</span>
      </div>

      <div className="header-center">
        <FiActivity size={20} color="#FFAE24" />
        <span className="header-title">
          <span className="tagline-dash">—</span>
          <span className="tagline-text">Garhwal • Kumaon • Music</span>
          <span className="tagline-note"> ♪</span>
        </span>
      </div>

      <div className="header-right">
        <button className="header-more-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <FiMoreVertical size={24} />
        </button>
        {menuOpen && (
          <MoreMenu
            portfolioUrl={portfolioUrl}
            githubUrl={githubUrl}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;