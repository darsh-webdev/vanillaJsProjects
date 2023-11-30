const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

// Hangman Figure Parts
const figureParts = document.querySelectorAll(".figure-part");

const correctLetters = [];
const wrongLetters = [];
let playable = true;
const words = [
  "tumble",
  "elastic",
  "sleep",
  "trimester",
  "hatless",
  "seducing",
  "lilly",
  "frozen",
  "princess",
  "doorknob",
  "scorch",
  "underuse",
  "darwinism",
  "able",
  "satin",
  "construct",
  "afternoon",
  "antics",
  "aspirin",
  "affecting",
  "hug",
  "buffed",
  "wool",
  "romp",
  "puppet",
  "busboy",
  "stoplight",
  "matron",
  "greeting",
  "myself",
  "petite",
  "prozac",
  "opium",
  "emblaze",
  "impulse",
  "swaddling",
  "agenda",
  "uneasy",
  "deviant",
  "lunacy",
  "unison",
  "jingling",
  "petted",
  "zealous",
  "sponsor",
  "galleria",
  "engraver",
  "turbulent",
  "scrap",
  "try",
];

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

let selectedWord = getRandomWord();
// Show Hidden Word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) =>
          `<span class="letter">${
            correctLetters.includes(letter) ? letter : ""
          }</span>`
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!😃";
    popup.style.display = "flex";

    playable = false;
  }
}

// Update Wrong Letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Unfortunately You Lost!😕 \n The word was "${selectedWord}"`;
    popup.style.display = "flex";

    playable = false;
  }
}

// Show Notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  let keyCode = e.key.charCodeAt(0);
  if (playable) {
    if (keyCode >= 97 && keyCode <= 122) {
      const letter = e.key;
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Restart game
playAgainBtn.addEventListener("click", () => {
  // Empty Arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Get new random word
  selectedWord = getRandomWord();
  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
  playable = true;
});

displayWord();
