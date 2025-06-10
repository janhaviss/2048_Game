import React from 'react';
import Tile from './Tile';

export default function Board({ board }) {
  return (
    <div className="grid grid-cols-4 gap-2 bg-zinc-800 p-4 rounded-2xl shadow-xl">
      {board.flat().map((value, index) => (
        <Tile key={index} value={value} />
      ))}
    </div>
  );
}
