function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

function verifyPrompt() {
    const num1 = generateRandomNumber();
    const num2 = generateRandomNumber();
    const correctAnswer = num1 + num2;

    const userAnswer = prompt(`Please solve the following problem: ${num1} + ${num2} = ?`);

    if (parseInt(userAnswer) === correctAnswer) {
        alert("Verification successful!");
    } else {
        alert("Incorrect answer. Please try again.");
        verifyPrompt();
    }
}
const likeCounts = {
like1: 0,
like2: 0,
};
function addLike(id) {
likeCounts[id]++;
document.getElementById(id).textContent = likeCounts[id];
}
const currencyCell = document.getElementById("currency");
const currencies = ["₸130000", "$450", "£120", "₽9000", "€400"];
let ind = 0;

function updateCurrency() {
    currencyCell.textContent = currencies[ind];
    ind = (ind + 1) % currencies.length;
}

updateCurrency(); 

for (let i = 0; i < currencies.length; i++) {
    setTimeout(() => {
        updateCurrency();
    }, i * 2000);
}

