document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let gameBoard = Array(9).fill(null);
    let isGameOver = false;
  
    function checkWin() {
      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
      return gameBoard.includes(null) ? null : 'Tie';
    }
  
    function computerMove() {
      const emptyCells = gameBoard.map((val, index) => val === null ? index : null).filter(val => val !== null);
      if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameBoard[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        const winner = checkWin();
        if (winner) {
          setTimeout(() => alert(winner === 'Tie' ? 'It\'s a tie!' : `${winner} wins!`), 100);
          isGameOver = true;
        }
      }
    }
  
    function handleClick(event) {
      const cellIndex = event.target.getAttribute('data-cell-index');
      if (!gameBoard[cellIndex] && !isGameOver) {
        gameBoard[cellIndex] = 'X';
        event.target.textContent = 'X';
        const winner = checkWin();
        if (winner) {
          setTimeout(() => alert(winner === 'Tie' ? 'It\'s a tie!' : `${winner} wins!`), 100);
          isGameOver = true;
        } else {
          setTimeout(computerMove, 300);  // delay for computer move
        }
      }
    }
  
    cells.forEach(cell => cell.addEventListener('click', handleClick));
    
    resetButton.addEventListener('click', () => {
      gameBoard.fill(null);
      cells.forEach(cell => {
        cell.textContent = '';
      });
      isGameOver = false;
    });
  });
  