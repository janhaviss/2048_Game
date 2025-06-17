import React, { useState, useEffect, useRef } from 'react';
import { moveLeft, moveRight, moveUp, moveDown, spawnNewTile, isGameOver } from '../logic/gamelogic';
import Board from './Board';
import '../css/Game.css';

export default function Game({ score, setScore, setGameOver, setMoveCount, tileTheme, hardMode, soundEnabled }) {
  const gameRef = useRef(null);
  
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
      playSound('move');
      if (isGameOver(newSpawned)) {
        setGameOver(true);
        playSound('gameover');
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

  // Touch input - REVISED VERSION
  useEffect(() => {
    let startX = 0, startY = 0;
    let isSwiping = false;

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      isSwiping = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isSwiping) return;
      e.preventDefault(); // Prevent page scroll
    };

    const handleTouchEnd = (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      
      if (!e.changedTouches[0]) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX;
      const dy = endY - startY;

      // Only register the swipe if movement is significant enough
      if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
        if (Math.abs(dx) > Math.abs(dy)) {
          dx > 0 ? makeMove(moveRight) : makeMove(moveLeft);
        } else {
          dy > 0 ? makeMove(moveDown) : makeMove(moveUp);
        }
      }
    };

    const gameElement = gameRef.current;
    if (gameElement) {
      gameElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      gameElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      gameElement.addEventListener('touchend', handleTouchEnd);
      gameElement.addEventListener('touchcancel', () => isSwiping = false);
    }

    return () => {
      if (gameElement) {
        gameElement.removeEventListener('touchstart', handleTouchStart);
        gameElement.removeEventListener('touchmove', handleTouchMove);
        gameElement.removeEventListener('touchend', handleTouchEnd);
        gameElement.removeEventListener('touchcancel', () => isSwiping = false);
      }
    };
  }, [board]);

  return (
    <div 
      className={`game-wrapper ${tileTheme}`}
      ref={gameRef}
    >      
      <div className="game-container">
        <Board board={board} />
      </div>
    </div>
  );
}