const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Create all cards
function createCards() {
  cardsData.forEach((cardData, index) => createCard(cardData, index));
}

// Create Single card in DOM
function createCard(cardData, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>${cardData.question}</p>
  </div>
  <div class="inner-card-back">
    <p>${cardData.answer}</p>
  </div>
</div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards !== null ? cards : [];
}

// Add cards to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

/*----------- Event Listeners -------------- */
// Change to next card
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

// Change to previous card
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));

// Hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = {
      question,
      answer,
    };

    createCard(newCard);

    questionEl.innerHTML = "";
    answerEl.innerHTML = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

// Clear cards
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
