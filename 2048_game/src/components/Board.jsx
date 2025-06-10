import React from 'react';
import Tile from './Tile';

export default function Board({ board }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((value, colIndex) => (
            <Tile key={colIndex} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
}
