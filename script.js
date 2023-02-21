// A web application for a calculator
const MAX_LENGTH = 11;

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
function appendOperand(operand, digit) {
    if (operand.length >= MAX_LENGTH) {
        return operand;
    }
    operand += digit;
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
            firstOperand = appendOperand(firstOperand, button.value);
        } else {
            secondOperand = appendOperand(secondOperand, button.value);
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
    firstOperand = firstOperand.toString().slice(0, MAX_LENGTH);
    if (firstOperand[-1] === ".") {
        firstOperand = firstOperand.slice(0, -1);
    }
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

// Add event listener to all clear button
const allClearButton = document.querySelector(".all-clear");
allClearButton.addEventListener("click", () => {
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    display.textContent = "0";
});

// Add event listener to sign button
const signButton = document.querySelector(".sign");
function changeOperandSign(operand) {
    if (operand === "") {
        return "";
    }
    operand = -operand;
    display.textContent = operand;
    return operand;
}
signButton.addEventListener("click", () => {
    if (currentOperator === null) {
        firstOperand = changeOperandSign(firstOperand);
    } else {
        secondOperand = changeOperandSign(secondOperand);
    }
});