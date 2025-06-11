// Slide and merge a single row left
// Modified function to also return score gained
export function slideAndMergeRowLeft(row) {
  let scoreGained = 0;
  let filtered = row.filter(n => n !== 0);

  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      scoreGained += filtered[i]; // Add to score
      filtered[i + 1] = 0;
      i++;
    }
  }

  filtered = filtered.filter(n => n !== 0);
  while (filtered.length < 4) filtered.push(0);
  return { row: filtered, scoreGained };
}


// Move board left
export function moveLeft(board) {
  let newBoard = [];
  let totalScore = 0;

  for (let row of board) {
    const { row: newRow, scoreGained } = slideAndMergeRowLeft(row);
    newBoard.push(newRow);
    totalScore += scoreGained;
  }

  return { board: newBoard, score: totalScore };
}


export function moveRight(board) {
  let newBoard = [];
  let totalScore = 0;

  for (let row of board) {
    const reversed = row.slice().reverse();
    const { row: newRow, scoreGained } = slideAndMergeRowLeft(reversed);
    newBoard.push(newRow.reverse());
    totalScore += scoreGained;
  }

  return { board: newBoard, score: totalScore };
}


// Transpose a 2D array (for up/down moves)
function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

// Move board up
export function moveUp(board) {
  let transposed = transpose(board);
  let newTransposed = [];
  let totalScore = 0;

  for (let row of transposed) {
    const { row: newRow, scoreGained } = slideAndMergeRowLeft(row);
    newTransposed.push(newRow);
    totalScore += scoreGained;
  }

  return { board: transpose(newTransposed), score: totalScore };
}



export function moveDown(board) {
  let transposed = transpose(board);
  let newTransposed = [];
  let totalScore = 0;

  for (let row of transposed) {
    const reversed = row.slice().reverse();
    const { row: newRow, scoreGained } = slideAndMergeRowLeft(reversed);
    newTransposed.push(newRow.reverse());
    totalScore += scoreGained;
  }

  return { board: transpose(newTransposed), score: totalScore };
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

export function isGameOver(board) {
  const size = board.length;

  // If any tile is 0, not over
  for (let row of board) {
    if (row.includes(0)) return false;
  }

  // Check horizontal and vertical merges
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - 1; j++) {
      if (board[i][j] === board[i][j + 1] || board[j][i] === board[j + 1][i]) {
        return false;
      }
    }
  }

  return true; // No moves left
}


