// A web application for a calculator
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;

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
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentOperator === null) {
            firstOperand += button.value;
            display.textContent = firstOperand;
        } else {
            secondOperand += button.value;
            display.textContent = secondOperand;
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
    currentOperator = null;
    secondOperand = "";
    display.textContent = firstOperand;
}

// Add event listeners to operator buttons
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        evaluate();
        currentOperator = button.value;
    });
});

// Add event listener to equal button
equalButton.addEventListener("click", evaluate);