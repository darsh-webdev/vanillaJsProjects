const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorageTransactions !== null ? localStorageTransactions : [];

// Add new transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: parseInt(amount.value),
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    updateLocalStorage();

    // Clear the form inputs
    text.value = "";
    amount.value = "";
  }
}

// Generate random transaction ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// Add Transaction to DOM List
function addTransactionDOM(transaction) {
  // Get Sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text}<span>${sign}₹${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  // Get total amount
  const total = amounts.reduce((acc, amount) => (acc += amount), 0);

  // Calculate the total income
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0);

  // Calculate the total expense
  const expense = Math.abs(
    amounts
      .filter((amount) => amount < 0)
      .reduce((acc, amount) => (acc += amount), 0)
  );

  balance.innerText = `₹${total}`;
  moneyPlus.innerText = `₹${income}`;
  moneyMinus.innerText = `₹${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initialise App
function init() {
  list.innerHTML = "";
  transactions.forEach((transaction) => addTransactionDOM(transaction));

  updateValues();
}

init();

/*-------- Event Listeners ---------- */
form.addEventListener("submit", addTransaction);
