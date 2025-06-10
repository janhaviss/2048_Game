import React, { useState, useEffect } from 'react';
import { moveLeft, moveRight, moveUp, moveDown, spawnNewTile } from '../logic/gamelogic';
import Board from './Board';

const initialBoard = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

export default function Game() {
  const [board, setBoard] = useState(spawnNewTile(spawnNewTile(initialBoard)));

  // Update board after move and spawn new tile if board changed
  function makeMove(moveFunc) {
    const newBoard = moveFunc(board);
    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      setBoard(spawnNewTile(newBoard));
    }
  }

  // Keyboard arrow handler
  useEffect(() => {
    function handleKey(e) {
      switch(e.key) {
        case 'ArrowLeft': makeMove(moveLeft); break;
        case 'ArrowRight': makeMove(moveRight); break;
        case 'ArrowUp': makeMove(moveUp); break;
        case 'ArrowDown': makeMove(moveDown); break;
        default: break;
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [board]);

  // Swipe handling for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 30) makeMove(moveRight);
        else if (diffX < -30) makeMove(moveLeft);
      } else {
        // Vertical swipe
        if (diffY > 30) makeMove(moveDown);
        else if (diffY < -30) makeMove(moveUp);
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
    <div className="flex justify-center items-center min-h-screen bg-zinc-900">
      <Board board={board} />
    </div>
  );
}
           