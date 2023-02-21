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

// Truncate the current operand if it is too long
function truncateOperand(operand) {
    operand = operand.toString().slice(0, MAX_LENGTH);
    if (operand[-1] === ".") {
        operand = operand.slice(0, -1);
    }
    return operand;
}

// Add event listeners to number buttons
function appendOperand(operand, digit) {
    console.log(operand, digit === "00");
    if (
        (digit === "0" && operand === "0") ||
        (digit === "00" && (operand === "" || operand === "0"))
    ) {
        return operand;
    }
    operand += digit;
    operand = truncateOperand(operand);
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
        firstOperand = Number(firstOperand);
    } else {
        firstOperand = applyOperator(
            currentOperator,
            Number(firstOperand),
            Number(secondOperand)
        );
    }
    firstOperand = truncateOperand(firstOperand);
    currentOperator = null;
    secondOperand = "";
    display.textContent = firstOperand;
    resetDisplay = true;
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

// Add event listener to all clear button
const allClearButton = document.querySelector(".all-clear");
allClearButton.addEventListener("click", () => {
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    display.textContent = "";
});

// Add event listener to sign button
const signButton = document.querySelector(".sign");
function changeOperandSign(operand) {
    if (operand === "") {
        return "";
    }
    operand = "-" + operand;
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

// Add event listener to decimal button
const decimalButton = document.querySelector(".decimal");
function appendDecimal(operand) {
    if (operand === "" || operand.includes(".")) {
        return operand;
    }
    operand += ".";
    operand = truncateOperand(operand);
    display.textContent = operand;
    return operand;
}
decimalButton.addEventListener("click", () => {
    if (currentOperator === null) {
        firstOperand = appendDecimal(firstOperand);
    } else {
        secondOperand = appendDecimal(secondOperand);
    }
});

// Add event listener to percent button
const percentButton = document.querySelector(".percent");
function convertToPercent(operand) {
    if (operand === "") {
        return operand;
    }
    operand /= 100;
    operand = truncateOperand(operand);
    display.textContent = operand;
    return operand;
}
percentButton.addEventListener("click", () => {
    if (currentOperator === null) {
        firstOperand = convertToPercent(firstOperand);
    } else {
        secondOperand = convertToPercent(secondOperand);
    }
});
