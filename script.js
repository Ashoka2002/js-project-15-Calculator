const calculatorDisplay = document.querySelector(".calculator-display h1");
const inputBtn = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(num) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = num;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add num to it
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === "0" ? num : displayValue + num;
  }
}

// Desimal add logic
function addDecimal() {
  if (awaitingNextValue) return;
  const isOperator = calculatorDisplay.textContent[calculatorDisplay.textContent.length - 1];

  if (isOperator === "+" || isOperator === "-" || isOperator === "*" || isOperator === "/") return;

  // if decimal not included add it to display
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent += ".";
  }
}

// Calculate first and second value depending on operator
const calculate = {
  "/": (fNum, SNum) => fNum / SNum,
  "*": (fNum, SNum) => fNum * SNum,
  "-": (fNum, SNum) => fNum - SNum,
  "+": (fNum, SNum) => fNum + SNum,
  "=": (fNum, SNum) => SNum,
};

function useOperator(operator) {
  if (operator && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  const currentValue = Number(calculatorDisplay.textContent);
  if (!firstValue) firstValue = currentValue;
  else {
    const result = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = result;
    firstValue = result;
  }
  operatorValue = operator;
  // Ready for next value, store Operator
  awaitingNextValue = true;
}

inputBtn.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", addDecimal);
  }
});

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = 0;
}
clearBtn.addEventListener("click", resetAll);
