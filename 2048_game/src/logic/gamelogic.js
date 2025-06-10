// Slide and merge a single row left
export function slideAndMergeRowLeft(row) {
  let filtered = row.filter(n => n !== 0);
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      filtered[i + 1] = 0;
      i++;
    }
  }
  filtered = filtered.filter(n => n !== 0);
  while (filtered.length < 4) filtered.push(0);
  return filtered;
}

// Move board left
export function moveLeft(board) {
  return board.map(row => slideAndMergeRowLeft(row));
}

// Move board right (reverse, move left, reverse)
export function moveRight(board) {
  return board.map(row => slideAndMergeRowLeft(row.slice().reverse()).reverse());
}

// Transpose a 2D array (for up/down moves)
function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

// Move board up
export function moveUp(board) {
  let transposed = transpose(board);
  transposed = transposed.map(row => slideAndMergeRowLeft(row));
  return transpose(transposed);
}

// Move board down
export function moveDown(board) {
  let transposed = transpose(board);
  transposed = transposed.map(row => slideAndMergeRowLeft(row.slice().reverse()).reverse());
  return transpose(transposed);
}

// Spawn a new tile (2 or 4) at random empty position
export function spawnNewTile(board) {
  let emptyPositions = [];
  board.forEach((row, i) => {
    row.forEach((val, j) => {
      if (val === 0) emptyPositions.push([i, j]);
    });
  });
  if (emptyPositions.length === 0) return board; // no empty spot

  const [x, y] = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const newTile = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map(row => row.slice());
  newBoard[x][y] = newTile;
  return newBoard;
}
