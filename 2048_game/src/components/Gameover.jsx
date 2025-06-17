import React from 'react';
import '../css/Gameover.css';

export default function GameOver({ onRestart, score, moves }) {
  return (
    <div className="gameover-overlay">
      <div className="gameover-box">
        <h2>Game Over</h2>
        <p>Your Score: <strong>{score}</strong></p>
        <p>Moves Taken: <strong>{moves}</strong></p>
        <p>No more moves left. Try again!</p>
        <button onClick={onRestart} className="restart-btn">Restart</button>
      </div>
    </div>
  );
}
