import React, { useState, useEffect } from 'react';
import { moveLeft, moveRight, moveUp, moveDown, spawnNewTile } from './gamelogic';

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
    function handleKey(e) {
      switch (e.key) {
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
        if (diffX > 30) makeMove(moveRight);
        else if (diffX < -30) makeMove(moveLeft);
      } else {
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
    <div
      style={{
        padding: 20,
        backgroundColor: '#222',  // slightly lighter dark background for board container
        borderRadius: 12,
        display: 'inline-block',
        userSelect: 'none',       // disable text selection while playing
      }}
    >
      {board.map((row, i) => (
        <div key={i} style={{ display: 'flex' }}>
          {row.map((val, j) => (
            <div
              key={j}
              style={{
                width: 60,
                height: 60,
                margin: 4,
                background: val ? '#eee' : '#888',  // light tile if number, medium gray if zero
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 24,
                color: '#000',  // black text on light tile
                borderRadius: 8,
              }}
            >
              {val !== 0 ? val : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
