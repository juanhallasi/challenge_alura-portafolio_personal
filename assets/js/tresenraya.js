const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const tictactoeMessage = document.getElementById('tictactoeMessage');
const tictactoeResetButton = document.getElementById('tictactoeResetButton');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Funciones del tres en raya (handleCellClick, checkForWinner, switchPlayer, etc.)

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');
  
    if (boardState[clickedIndex] !== '' || !gameActive) {
      return;
    }
  
    boardState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
  
    checkForWinner();
    switchPlayer();
  }
  
  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Es turno de: ${currentPlayer}`;
  }
  
  function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      const a = boardState[winCondition[0]];
      const b = boardState[winCondition[1]];
      const c = boardState[winCondition[2]];
  
      if (a === '' || b === '' || c === '') {
        continue;
      }
  
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
  
    if (roundWon) {
      message.textContent = `¡Jugador ${currentPlayer} ha ganado! 🎉`;
      gameActive = false;
      resetButton.style.display = 'block';
      return;
    }
  
    if (!boardState.includes('')) {
      message.textContent = '¡Es un empate!';
      gameActive = false;
      resetButton.style.display = 'block';
      return;
    }
  }
  
  function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    message.textContent = `Es turno de: ${currentPlayer}`;
    cells.forEach(cell => (cell.textContent = ''));
    resetButton.style.display = 'none';
  }

function initializeTicTacToe() {
  currentPlayer = 'X';
  gameActive = true;
  boardState = ['', '', '', '', '', '', '', '', ''];
  tictactoeMessage.textContent = `Es turno de: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
tictactoeResetButton.addEventListener("click", initializeTicTacToe);

initializeTicTacToe();

