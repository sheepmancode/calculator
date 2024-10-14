// Variable for the display
let display = document.querySelector(".display");

// Selecting elements
let numButtons = document.querySelectorAll(".num-btns");
let oprButtons = document.querySelectorAll(".opr-btns");
let equalButton = document.querySelector(".equal-btns");
let clearButton = document.querySelector(".clear-btns");
let decimalButton = document.querySelector(".decimal");

// Variables for operands and operator
let firstOperand = "";
let secondOperand = "";
let operator = "";
let isFirstOperandActive = true; // Flag to track if we are working on the first operand
let result = 0;

// Function to update the display
function updateDisplay(content) {
  display.textContent = content;
}

// Function to handle number input
function handleNumberInput(number) {
  if (isFirstOperandActive) {
    firstOperand += number;
    updateDisplay(firstOperand);
  } else {
    secondOperand += number;
    updateDisplay(secondOperand);
  }
}

// Function to handle operator input
function handleOperatorInput(op) {
  if (operator === "") {
    operator = op;
    updateDisplay(firstOperand + " " + operator);
    isFirstOperandActive = false; // Now input goes to secondOperand
  } else {
    operator = op; // Replace operator if it's already set
    updateDisplay(firstOperand + " " + operator);
  }
}

// Function to calculate the result
function calculateResult() {
  let firstOperandNum = parseFloat(firstOperand);
  let secondOperandNum = parseFloat(secondOperand);

  if (isNaN(firstOperandNum) || isNaN(secondOperandNum)) {
    updateDisplay("Error");
    return;
  }

  switch (operator) {
    case "+":
      result = firstOperandNum + secondOperandNum;
      break;
    case "-":
      result = firstOperandNum - secondOperandNum;
      break;
    case "*":
      result = firstOperandNum * secondOperandNum;
      break;
    case "/":
      if (secondOperandNum === 0) {
        updateDisplay("Error"); // Handle division by zero
        return;
      }
      result = firstOperandNum / secondOperandNum;
      break;
    default:
      updateDisplay("Error");
      return;
  }

  updateDisplay(result);
  firstOperand = result.toString(); // Allow for chaining operations
  secondOperand = "";
  operator = "";
  isFirstOperandActive = true; // Ready for next operation
}

// Function to reset the calculator
function resetCalculator() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  isFirstOperandActive = true;
  result = 0;
  updateDisplay("0"); // Reset display to 0
  console.log("Calculator reset");
}

// Event handler for number buttons
numButtons.forEach((button) => {
  button.addEventListener("click", function () {
    handleNumberInput(button.textContent);
  });
});

// Event handler for operator buttons
oprButtons.forEach((button) => {
  button.addEventListener("click", function () {
    handleOperatorInput(button.textContent);
  });
});

// Event handler for the equal button
equalButton.addEventListener("click", function () {
  calculateResult();
});

// Event handler for the clear button
clearButton.addEventListener("click", function () {
  resetCalculator();
});
