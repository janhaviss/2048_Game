import React, { useState } from 'react';
import Sidebar from './components/Slidebar';
import Game from './components/Game';
import GameOver from './components/Gameover';
import HowToPlay from './components/HowToPlay';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('game');

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [moveCount, setMoveCount] = useState(0);

  const handleRestart = () => {
    const confirmed = window.confirm("Are you sure you want to restart the game?");
    if (confirmed) {
      setGameKey(prev => prev + 1);
      setScore(0);
      setGameOver(false);
      setMoveCount(0);
    }
  };

  return (
    <div className="app-container">
      <Sidebar onNavigate={setActivePage} />
      <div className="main-content">
        {activePage === 'game' ? (
          <>
            <h1>Welcome to 2048!</h1>
            <h4 className="intro-text">
              Combine the numbered tiles by swiping or using your arrow keys. Reach 2048 to win — but how far can you really go?
            </h4>
            <div className="score-container">
              <div className="score-item">Score: {score}</div>
              <div className="score-item">High Score: {highScore}</div>
              <div className="score-item">Moves: {moveCount}</div>
              <button className="restart-btn" onClick={handleRestart}>Restart</button>
            </div>
            <Game
              key={gameKey}
              score={score}
              setScore={setScore}
              setGameOver={setGameOver}
              setMoveCount={setMoveCount}
            />
            {gameOver && <GameOver onRestart={handleRestart} />}
          </>
        ) : activePage === 'howToPlay' ? (
          <HowToPlay />
        ) : (
          <div>Settings Coming Soon</div>
        )}

        <Footer />
      </div>
    </div>
  );
}