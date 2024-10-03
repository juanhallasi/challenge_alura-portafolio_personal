const words = ["javascript", "html", "css", "ahorcado", "programacion"];
let selectedWord = "";
let guessedWord = [];
let mistakes = 0;
const maxMistakes = 6;

const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const letterButtons = document.getElementById("letterButtons");
const resetButton = document.getElementById("resetButton");
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

function initializeGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(selectedWord.length).fill("_");
  mistakes = 0;
  message.textContent = "";
  wordDisplay.textContent = guessedWord.join(" ");
  drawHangman();
  createLetterButtons();
}

function createLetterButtons() {
  letterButtons.innerHTML = "";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  for (const letter of letters) {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter, button));
    letterButtons.appendChild(button);
  }
}

function handleGuess(letter, button) {
  button.disabled = true;
  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        guessedWord[i] = letter;
      }
    }
    wordDisplay.textContent = guessedWord.join(" ");
    checkWin();
  } else {
    mistakes++;
    drawHangman();
    checkLoss();
  }
}

function checkWin() {
  if (!guessedWord.includes("_")) {
    message.textContent = "¡Ganaste! 🎉";
    disableAllButtons();
    resetButton.style.display = "block";
  }
}

function checkLoss() {
  if (mistakes === maxMistakes) {
    message.textContent = `Perdiste 😔. La palabra era: ${selectedWord}`;
    disableAllButtons();
    resetButton.style.display = "block";
  }
}

function disableAllButtons() {
  const buttons = letterButtons.querySelectorAll("button");
  buttons.forEach(button => button.disabled = true);
}

function drawHangman() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  
  // Base
  ctx.beginPath();
  ctx.moveTo(10, 190);
  ctx.lineTo(190, 190);
  ctx.stroke();

  // Poste
  ctx.moveTo(50, 190);
  ctx.lineTo(50, 10);
  ctx.lineTo(130, 10);
  ctx.lineTo(130, 30);
  ctx.stroke();

  if (mistakes > 0) {
    // Cabeza
    ctx.beginPath();
    ctx.arc(130, 50, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (mistakes > 1) {
    // Cuerpo
    ctx.moveTo(130, 70);
    ctx.lineTo(130, 120);
    ctx.stroke();
  }
  if (mistakes > 2) {
    // Brazo izquierdo
    ctx.moveTo(130, 80);
    ctx.lineTo(110, 100);
    ctx.stroke();
  }
  if (mistakes > 3) {
    // Brazo derecho
    ctx.moveTo(130, 80);
    ctx.lineTo(150, 100);
    ctx.stroke();
  }
  if (mistakes > 4) {
    // Pierna izquierda
    ctx.moveTo(130, 120);
    ctx.lineTo(110, 150);
    ctx.stroke();
  }
  if (mistakes > 5) {
    // Pierna derecha
    ctx.moveTo(130, 120);
    ctx.lineTo(150, 150);
    ctx.stroke();
  }
}

resetButton.addEventListener("click", () => {
  resetButton.style.display = "none";
  initializeGame();
});

// Inicializar el juego
initializeGame();

// Inicializar el juego
