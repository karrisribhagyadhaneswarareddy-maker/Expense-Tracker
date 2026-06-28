const form = document.getElementById("transaction-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const transactionList = document.getElementById("transaction-list");

let transactions = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    description: description.value,
    amount: Number(amount.value),
    type: type.value,
  };

  transactions.push(transaction);

  description.value = "";
  amount.value = "";

  displayTransactions();
  updateSummary();
});

function displayTransactions() {
  transactionList.innerHTML = "";

  transactions.forEach(function (item) {
    const li = document.createElement("li");

    li.innerHTML = `
            ${item.description} - ₹${item.amount} (${item.type})

            <button class="delete-btn"
            onclick="deleteTransaction(${item.id})">
            Delete
            </button>
        `;

    transactionList.appendChild(li);
  });
}

function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(function (item) {
    if (item.type === "Income") {
      totalIncome += item.amount;
    } else {
      totalExpense += item.amount;
    }
  });

  income.textContent = "₹" + totalIncome;
  expense.textContent = "₹" + totalExpense;
  balance.textContent = "₹" + (totalIncome - totalExpense);
}

function deleteTransaction(id) {
  transactions = transactions.filter(function (item) {
    return item.id !== id;
  });

  displayTransactions();
  updateSummary();
}
