import React, { useState } from 'react';
import '../css/sidebar.css';
import { FaBars, FaTimes, FaCog, FaGamepad, FaInfoCircle } from 'react-icons/fa';

const menuItems = [
  { name: 'Play 2048', link: '/', icon: <FaGamepad /> },
  { name: 'How to Play', link: '/how-to-play', icon: <FaInfoCircle /> },
  { name: 'Settings', link: '/settings', icon: <FaCog /> },
];


const Sidebar = ({ setTileTheme }) => {
  const [open, setOpen] = useState(true);

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
      {/* <ul className="theme-selector">
  <li>
    <button onClick={() => setTileTheme('green')} className="theme-btn">
      <span className="swatch" style={{ backgroundColor: "#B0DB9C" }}></span>
      Green Theme
    </button>
  </li>
  <li>
    <button onClick={() => setTileTheme('pink')} className="theme-btn">
      <span className="swatch" style={{ backgroundColor: "#fbd3e9" }}></span>
      Pink Theme
    </button>
  </li>
  <li>
    <button onClick={() => setTileTheme('blue')} className="theme-btn">
      <span className="swatch" style={{ backgroundColor: "#ADD8E6" }}></span>
      Blue Theme
    </button>
  </li>
</ul> */}

      </nav>
    </div>
  );
};

export default Sidebar;
