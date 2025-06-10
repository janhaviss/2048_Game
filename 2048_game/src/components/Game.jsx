import React, { useState, useEffect } from 'react';
import { moveLeft, moveRight, moveUp, moveDown, spawnNewTile } from '../logic/gamelogic';
import Board from './Board';
import '../css/Game.css';

const initialBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

export default function Game() {
  const [board, setBoard] = useState(spawnNewTile(spawnNewTile(initialBoard)));

  function makeMove(moveFunc) {
    const newBoard = moveFunc(board);
    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      setBoard(spawnNewTile(newBoard));
    }
  }

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowLeft': makeMove(moveLeft); break;
        case 'ArrowRight': makeMove(moveRight); break;
        case 'ArrowUp': makeMove(moveUp); break;
        case 'ArrowDown': makeMove(moveDown); break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [board]);

  useEffect(() => {
    let startX = 0, startY = 0;

    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX;
      const dy = endY - startY;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) makeMove(moveRight);
        else if (dx < -30) makeMove(moveLeft);
      } else {
        if (dy > 30) makeMove(moveDown);
        else if (dy < -30) makeMove(moveUp);
      }
    }

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [board]);

  return (
  <div className="game-wrapper">
    <div className="game-container">
      <Board board={board} />
    </div>
  </div>
);

}
