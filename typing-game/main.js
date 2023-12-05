const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "sexualized",
  "troys",
  "reaps",
  "marines",
  "thistle",
  "parents",
  "bronzed",
  "oppositely",
  "cancelling",
  "extractive",
  "whetted",
  "damns",
  "barca",
  "crypt",
  "defocussed",
  "acidifiers",
  "arbitraged",
  "emollients",
  "nymph",
  "buhls",
  "thunk",
  "thief",
  "carry",
  "planche",
  "mynheer",
  "anteing",
  "aquatic",
  "rewears",
  "dispelling",
  "privatises",
];

// Initalise random word
let randomWord;

// Initialise score
let score = 0;

// Initalise best score
let bestScore =
  localStorage.getItem("bestScore") !== null
    ? localStorage.getItem("bestScore")
    : 0;

// Set best score from local storage
bestScoreEl.innerHTML = bestScore;

//Initialise time
let time = 10;

// Set difficulty value
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

// Set difficulty select value;
difficultySelect.value = difficulty;

// Start countdown
const timeInterval = setInterval(updateTime, 1000);

// Generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();

  word.innerText = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;

  if (score > bestScore) {
    bestScore = score;
    bestScoreEl.innerHTML = bestScore;

    localStorage.setItem("bestScore", bestScore);
  }
}

// Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    // End Game
    gameOver();
  }
}

// Game Over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out!</h1>
        <p>Your final score is <span>${score}</span></p>
        <p>Best score: <span>${bestScore}</span></p>
        <button onclick="location.reload()">Play Again</button>
    `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

/*------ Event Listeners ------- */
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear input
    e.target.value = "";

    // Add time as per difficulty
    switch (difficulty) {
      case "easy":
        time += 5;

      case "medium":
        time += 3;

      case "hard":
        time += 2;

      default:
        break;
    }

    updateTime();
  }
});

// Focus on text on page load
window.addEventListener("load", () => {
  text.focus();
});

// Toggle Settings option on button click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Choosing difficulty
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
