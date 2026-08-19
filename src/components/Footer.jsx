import React from 'react';
import { FiLink } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import '../styles/Footer.css';
import { portfolioUrl, githubUrl } from '../data/playlists';

const Footer = () => {
  return (
    <footer className="footer">
      <span>© 2026 GX Shubhamm MP3 Player</span>
      <div className="footer-links">
        <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
          <FiLink size={16} /> Portfolio
        </a>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <FaGithub size={16} /> GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;