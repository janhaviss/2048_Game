import React from 'react';
import '../css/Tile.css'; // Import the CSS file

export default function Tile({ value }) {
  const tileClass = `tile tile-${value}`; // Dynamic tile class
  return (
    <div className={tileClass}>
      {value !== 0 ? value : ''}
    </div>
  );
}
