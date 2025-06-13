import React, { useState, useEffect } from 'react';
import Sidebar from './components/Slidebar';
import Game from './components/Game';
import GameOver from './components/Gameover';
import HowToPlay from './components/HowToPlay';
import Footer from './components/Footer';
import Settings from './components/Settings';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('game');

  // Score
  const [score, setScore] = useState(0);

  //HighScore
  const [highScore, setHighScore] = useState(() => {
  const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  //Game over
  const [gameOver, setGameOver] = useState(false);

  //Game key
  const [gameKey, setGameKey] = useState(0);

  //Move
  const [moveCount, setMoveCount] = useState(0); 

  //Theme
  const [tileTheme, setTileTheme] = useState(() => {
    return localStorage.getItem('tileTheme') || 'green';
  });

  //Hard Mode
  const [hardMode, setHardMode] = useState(false);

  //sound settings
  const [soundEnabled, setSoundEnabled] = useState(true);



// For Tile theme 
 useEffect(() => {
  if (!localStorage.getItem('tileTheme')) {
    localStorage.setItem('tileTheme', 'green');
  }
}, []);


// For Highscore 
useEffect(() => {
  if (score > highScore) {
    setHighScore(score);
    localStorage.setItem('highScore', score);
  }
}, [score, highScore]);


// for reseting highscore
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
          tileTheme={tileTheme}
          hardMode={hardMode}
          soundEnabled={soundEnabled}


        />

        {gameOver && <GameOver onRestart={handleRestart} />}
        </>
        ) : activePage === 'howToPlay' ? (
          <HowToPlay />
        ) :  (
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

        <Footer />
      </div>
    </div>
  );
}