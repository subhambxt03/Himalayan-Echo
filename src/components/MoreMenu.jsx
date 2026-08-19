import React from 'react';
import { FiLink } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import '../styles/MoreMenu.css';

const MoreMenu = ({ portfolioUrl, githubUrl, onClose }) => {
  return (
    <div className="more-menu dropdown-menu">
      <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" onClick={onClose}>
        <FiLink size={18} />
        Portfolio
      </a>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" onClick={onClose}>
        <FaGithub size={18} />
        GitHub
      </a>
    </div>
  );
};

export default MoreMenu;