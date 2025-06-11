import React from 'react';
import '../css/Gameover.css'; // Create this file for styling

export default function GameOver({ onRestart }) {
  return (
    <div className="gameover-overlay">
      <div className="gameover-box">
        <h2>Game Over</h2>
        <p>No more moves left. Try again!</p>
        <button onClick={onRestart} className="restart-btn">Restart</button>
      </div>
    </div>
  );
}
