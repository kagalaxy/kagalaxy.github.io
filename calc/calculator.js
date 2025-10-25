const calculator = document.getElementById('calc');
const footer = document.getElementById('status');
document.addEventListener("DOMContentLoaded", () => {
    calculator.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') return;
        handleInput(event.target.value);
    });
});

let calculate = false;
let op = "";
let val1 = 0;
let val2 = 0;
let valTotal = 0;
let step = 0;

function handleInput(value) {
    switch (value) {
        case "=":
            calculate = true;
            valTotal = eval(val1 + op + val2);
            break;
        case "+":
            op = value;
            break;
        case "10":
            removeValue();
            break;
        default:
            addValue(value);
            break;
    }
    calculatorStep();
    updateButtons();
    updateDisplay();
    updateStatus();
}

function addValue(value) {
    if (op === "" && val1 == "0") {
        val1 = value;
    }
    else if (op === "") 
    {
        val1 = val1 + value;
    }
    else if (op !== "" && val2 == "0") {
        val2 = value;
    }
    else if (op !== "") {
        val2 = val2 + value;
    }
}

function calculatorStep() {
    if (val1 !== "0" && op === "") {
        step = 0;
    }
    else if (val2 === "0" && op !== "") {
        step = 1;
    }
    else if (val2 !== "0" && op !== "" && calculate == false) {
        step = 2;
    }
    else if (calculate == true) {
        step = 3;
    }
}

function removeValue() {
    if (step == 0) {
        val1 = val1.slice(0, -1);
        if (val1 === "") {
            val1 = "0";
        }
    }
    else if (step == 1) {
        op = "";
    }
    else if (step == 2) {
        val2 = val2.slice(0, -1);
        if (val2 === "") {
            val2 = "0";
        }
    }
    else if (step == 3) {
        calculate = false;
    }
}

function updateDisplay() {
    let s = "";
    switch (step) {
        case 3:
            s = valTotal;
            break;
        case 2:
        case 1:
            s = val1 + " " + op + " " + val2;
            break;
        case 0:
            s = val1;
            break;
    }
    document.getElementById('display').value = s;
}

function updateButtons() {
    const buttons = calculator.querySelectorAll('button');
    const buttonsNumbers = Array.from(buttons).filter(button => parseInt(button.value) >= 0 && parseInt(button.value) <= 9);
    buttonsNumbers.forEach(button => {
        if (step == 3) {
            button.disabled = true;
        }
        else {
            button.disabled = false;
        }
    });
    const buttonsOperations = Array.from(buttons).filter(button => button.value != "=" && button.value != "10" && (parseInt(button.value) >= 0 && parseInt(button.value) <= 9) == false)
    buttonsOperations.forEach(button => {
        if (step >= 1 && step <= 3) {
            button.disabled = true;
        }
        else {
            button.disabled = false;
        }
    });
    const buttonClear = Array.from(buttons).filter(button => button.value == "10");
    if (val1 === "0") {
        buttonClear[0].disabled = true;
    }
    else {
        buttonClear[0].disabled = false;
    }
    const buttonEqual = Array.from(buttons).filter(button => button.value == "=");
    if (step == 3 && val2 === "0") {
        buttonEqual[0].disabled = true;
    }
    else {
        buttonEqual[0].disabled = false;
    }
}

function updateStatus() {
    switch (step) {
        case 3:
            footer.innerHTML = "Result.";
            break;
        case 2:
        case 1:
            footer.innerHTML = "Enter the second value or calculate.";
            break;
        case 0:
            footer.innerHTML = "Enter the first value.";
            break;
    }
}