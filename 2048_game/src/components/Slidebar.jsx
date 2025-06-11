import React, { useState } from 'react';
import '../css/sidebar.css';
import { FaBars, FaTimes, FaCog, FaGamepad, FaInfoCircle } from 'react-icons/fa';

const menuItems = [
  { name: 'Play 2048', link: '/', icon: <FaGamepad /> },
  { name: 'How to Play', link: '/how-to-play', icon: <FaInfoCircle /> },
  { name: 'Settings', link: '/settings', icon: <FaCog /> },
];

const Sidebar = () => {
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
          <a key={index} href={item.link}>
            <span className="nav-icon">{item.icon}</span>
            {open && <span>{item.name}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
