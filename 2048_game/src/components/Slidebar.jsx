import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaCog, FaGamepad, FaInfoCircle } from 'react-icons/fa';
import '../css/sidebar.css';

const menuItems = [
  { name: 'Play 2048', route: 'game', icon: <FaGamepad /> },
  { name: 'How to Play', route: 'howToPlay', icon: <FaInfoCircle /> },
  { name: 'Settings', route: 'settings', icon: <FaCog /> },
];

const Sidebar = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 640;
      setIsMobile(isNowMobile);
      if (isNowMobile) {
        setOpen(false); // Never open on mobile
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => {
    if (!isMobile) {
      setOpen(prev => !prev); // Only allow toggle on desktop
    }
  };

  return (
    <div className={`sidebar ${open ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        {open && <h1>2048 Game</h1>}
        <button className="toggle-button" onClick={handleToggle}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className="nav-links">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="nav-item"
            onClick={() => onNavigate(item.route)}
            title={!open ? item.name : ''}
            style={{ cursor: 'pointer' }}
          >
            <span className="nav-icon">{item.icon}</span>
            {open && <span>{item.name}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
