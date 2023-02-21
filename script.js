// A web application for a calculator
const MAX_LENGTH = 10;

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let resetDisplay = false;

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");

function applyOperator(operator, firstNumber, secondNumber) {
    switch (operator) {
        case "+":
            return firstNumber + secondNumber;
        case "-":
            return firstNumber - secondNumber;
        case "*":
            return firstNumber * secondNumber;
        case "/":
            return firstNumber / secondNumber;
    }
}

// Add event listeners to number buttons
function updateOperand(operand, value) {
    if (operand.length >= MAX_LENGTH) {
        return operand;
    }
    operand += value;
    display.textContent = operand;
    return operand;
}
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentOperator === null) {
            if (resetDisplay) {
                firstOperand = "";
                resetDisplay = false;
            }
            firstOperand = updateOperand(firstOperand, button.value);
        } else {
            secondOperand = updateOperand(secondOperand, button.value);
        }
    });
});

// Evaluate the current expression if possible
function evaluate() {
    if (currentOperator === null || secondOperand === "") {
        return;
    }
    firstOperand = applyOperator(
        currentOperator,
        Number(firstOperand),
        Number(secondOperand)
    );
    firstOperand = Math.round(firstOperand * 10 ** MAX_LENGTH) / 10 ** MAX_LENGTH;
    currentOperator = null;
    secondOperand = "";
    display.textContent = firstOperand;
}

// Add event listeners to operator buttons
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        evaluate();
        currentOperator = button.value;
        resetDisplay = true;
    });
});

// Add event listener to equal button
equalButton.addEventListener("click", evaluate);