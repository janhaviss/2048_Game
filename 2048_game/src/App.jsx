import React, { useState, useEffect } from 'react';
import Sidebar from './components/Slidebar';
import Game from './components/Game';
import GameOver from './components/Gameover';
import HowToPlay from './components/HowToPlay';
import Footer from './components/Footer';
import Settings from './components/Settings';
import Landing from './components/Landing';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('game');
  const [hasStarted, setHasStarted] = useState(false);
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
  const [hardMode, setHardMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('tileTheme')) {
      localStorage.setItem('tileTheme', 'green');
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score);
    }
  }, [score, highScore]);

  const resetHighScore = () => {
    localStorage.removeItem('highScore');
    setHighScore(0);
  };

  const handleRestart = () => {
    setGameKey(prev => prev + 1);
    setScore(0);
    setGameOver(false);
    setMoveCount(0);
  };

  return (
    <div className={`app-container ${tileTheme}`}>
      <Sidebar setTileTheme={setTileTheme} onNavigate={setActivePage} />

      <div className="content-wrapper">
        <div className="main-content">
          {!hasStarted ? (
            <Landing onStart={() => setHasStarted(true)} />
          ) : activePage === 'game' ? (
            <>
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
                tileTheme={tileTheme}
                hardMode={hardMode}
                soundEnabled={soundEnabled}
              />

    {gameOver && (
      <GameOver 
      onRestart={handleRestart} 
      score={score} 
      moves={moveCount} 
      />
      )}
            </>
          ) : activePage === 'howToPlay' ? (
            <HowToPlay />
          ) : (
            <Settings
              tileTheme={tileTheme}
              setTileTheme={setTileTheme}
              resetHighScore={resetHighScore}
              hardMode={hardMode}
              setHardMode={setHardMode}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
