import React from 'react';

const tileColors = {
  0: 'bg-zinc-700',
  2: 'bg-yellow-100 text-zinc-800',
  4: 'bg-yellow-200 text-zinc-800',
  8: 'bg-orange-400 text-white',
  16: 'bg-orange-500 text-white',
  32: 'bg-orange-600 text-white',
  64: 'bg-orange-700 text-white',
  128: 'bg-green-400 text-white',
  256: 'bg-green-500 text-white',
  512: 'bg-blue-500 text-white',
  1024: 'bg-purple-600 text-white',
  2048: 'bg-yellow-500 text-black',
};

export default function Tile({ value }) {
  const tileClass = tileColors[value] || 'bg-zinc-600 text-white';
  return (
    <div
      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center font-bold text-xl sm:text-2xl transition-all ${tileClass}`}
    >
      {value !== 0 ? value : ''}
    </div>
  );
}
