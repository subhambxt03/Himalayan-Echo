import React from 'react';
import { FiList } from 'react-icons/fi';
import '../styles/Sidebar.css';

const Sidebar = ({ playlists, selectedId, onSelect, show, onClose }) => {
  return (
    <>
    
      <aside className="sidebar-desktop">
        <div className="sidebar-section">
          <div className="sidebar-label">LIBRARY</div>
          <div className="sidebar-playlists">
            {playlists.map(pl => {
              const songCount = pl.songs.length;
              return (
                <div
                  key={pl.id}
                  className={`sidebar-playlist ${selectedId === pl.id ? 'active' : ''}`}
                  onClick={() => onSelect(pl.id)}
                >
                  <FiList size={18} />
                  <span className="playlist-name">{pl.name}</span>
                  <span className="playlist-count">{songCount}</span>
                </div>
              );
            })}
          </div>
        </div>
      
        <div className="sidebar-image-wrapper">
          <img src="/images/photo.webp" alt="sidebar decoration" className="sidebar-image" />
        </div>
      </aside>

      
      {show && (
        <div className="sidebar-overlay" onClick={onClose}>
          <div className="sidebar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-section">
              <div className="sidebar-label">LIBRARY</div>
              <div className="sidebar-playlists">
                {playlists.map(pl => {
                  const songCount = pl.songs.length;
                  return (
                    <div
                      key={pl.id}
                      className={`sidebar-playlist ${selectedId === pl.id ? 'active' : ''}`}
                      onClick={() => {
                        onSelect(pl.id);
                        onClose();
                      }}
                    >
                      <FiList size={18} />
                      <span className="playlist-name">{pl.name}</span>
                      <span className="playlist-count">{songCount} songs</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;