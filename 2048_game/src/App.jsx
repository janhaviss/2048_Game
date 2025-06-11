import React, { useState, useEffect } from 'react';
import Sidebar from './components/Slidebar';
import Game from './components/Game';
import GameOver from './components/Gameover';
import './App.css'; 

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [gameOver, setGameOver] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [moveCount, setMoveCount] = useState(0); 
  const [tileTheme, setTileTheme] = useState(() => {
    return localStorage.getItem('tileTheme') || 'green';
  });

  useEffect(() => {
    localStorage.setItem('tileTheme', tileTheme);
  }, [tileTheme]);



  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score);
    }
  }, [score, highScore]);

 function handleRestart() {
  const confirmed = window.confirm("Are you sure you want to restart the game?");
  if (confirmed) {
    setGameKey(prev => prev + 1); // remount the Game component
    setScore(0);
    setGameOver(false);
    setMoveCount(0);
  }
}


  return (
    <div className={`app-container ${tileTheme}`}>
      <Sidebar setTileTheme={setTileTheme} />
      <div className="main-content">
        <h1>Welcome to 2048!</h1>
        <h4 className="intro-text">
          Combine the numbered tiles by swiping or using your arrow keys. Reach 2048 to win — but how far can you really go?
        </h4>
        <div className="score-container">
          <div className="score-item">Score: {score}</div>
          <div className="score-item">High Score: {highScore}</div>
          <div className="score-item">Moves: {moveCount}</div>
          <button className="restart-btn" onClick={handleRestart}>Restart</button>
        <div className="theme-circles">
  <button className="theme-btn green" onClick={() => setTileTheme('green')} />
  <button className="theme-btn pink" onClick={() => setTileTheme('pink')} />
  <button className="theme-btn blue" onClick={() => setTileTheme('blue')} />
</div>
        </div>

        <Game 
          key={gameKey}
          score={score} 
          setScore={setScore} 
          setGameOver={setGameOver} 
          setMoveCount={setMoveCount}
          tileTheme={tileTheme}

        />

        {gameOver && <GameOver onRestart={handleRestart} />}
      </div>
    </div>
  );
}
