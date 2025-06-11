import React, { useState } from 'react';
import '../css/sidebar.css';
import { FaBars, FaTimes, FaCog, FaGamepad, FaInfoCircle } from 'react-icons/fa';

// 👇 Remove hrefs and use route keys instead
const menuItems = [
  { name: 'Play 2048', route: 'game', icon: <FaGamepad /> },
  { name: 'How to Play', route: 'howToPlay', icon: <FaInfoCircle /> },
  { name: 'Settings', route: 'settings', icon: <FaCog /> },
];

const Sidebar = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`sidebar ${!open ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {open && <h1>2048 Game</h1>}
        <button className="toggle-button" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className="nav-links">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="nav-item"
            onClick={() => onNavigate(item.route)}
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
