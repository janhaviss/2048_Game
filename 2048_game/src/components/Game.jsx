import React, { useState, useEffect } from 'react';
import { moveLeft, moveRight, moveUp, moveDown, spawnNewTile, isGameOver } from '../logic/gamelogic';
import Board from './Board';
import '../css/Game.css';

export default function Game({ score, setScore, setGameOver,setMoveCount, tileTheme,hardMode, soundEnabled  }) {
 const createInitialBoard = () => 
  spawnNewTile(spawnNewTile([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]), hardMode);


  const [board, setBoard] = useState(createInitialBoard);

  function playSound(name) {
  if (!soundEnabled) return;
  const audio = new Audio(`/sounds/${name}.wav`);
  audio.play();
}

function makeMove(moveFunc) {
  const { board: newBoard, score: gained } = moveFunc(board);
  if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
    const newSpawned = spawnNewTile(newBoard);
    setBoard(newSpawned);
    setScore(prev => prev + gained);
    setMoveCount(prev => prev + 1);
    playSound('move'); // 🔊
    if (isGameOver(newSpawned)) {
      setGameOver(true);
      playSound('gameover'); // 🔊
    }
  }
}


  // Keyboard input
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') makeMove(moveLeft);
      else if (e.key === 'ArrowRight') makeMove(moveRight);
      else if (e.key === 'ArrowUp') makeMove(moveUp);
      else if (e.key === 'ArrowDown') makeMove(moveDown);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [board]);

  // Touch input
  useEffect(() => {
    let startX = 0, startY = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX;
      const dy = endY - startY;

      if (Math.abs(dx) > Math.abs(dy)) {
        dx > 30 ? makeMove(moveRight) : dx < -30 && makeMove(moveLeft);
      } else {
        dy > 30 ? makeMove(moveDown) : dy < -30 && makeMove(moveUp);
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [board]);

  return (
<div className={`game-wrapper ${tileTheme}`}>      
  <div className="game-container">
        <Board board={board} />
      </div>
    </div>
  );
}
