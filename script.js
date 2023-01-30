//data variables
let operand1 = "0";
let operand2 = "";
let operator = "";

//DOM element for calculator display
const display = document.querySelector('div.display');


//function to update display
const updateDisplay = function (content) {
    display.textContent = content;
}

//function to reset data variables
const reset = function () {
    operand1 = "0";
    operand2 = "";
    operator = "";
}

//function to clear display
const clearDisplay = function() {
    display.classList.remove("error");
    reset();
    display.textContent = "0";
}

//function to display error message
const displayError = function(error) {
    display.textContent = error;
    display.classList.add("error");
    reset();
}


const add = function (a,b) {
    return a+b;
}

const subtract = function(a,b) {
    return a-b;
}

const multiply = function(a,b) {
    return a*b;
}

const divide = function(a,b) {
    if(b === 0) {
        displayError("ERROR, cannot divide by 0");
        return "0";
    }
    return a/b;
}

//called if user performs action on two numbers
function operate(a,b,operator) {

    //check if a and b are numbers

    if(typeof(a) !== 'number' && typeof(b) !== "number") {
         displayError("ERROR, please enter a valid number");
         return "0";
    } 

    //call the appropriate function based on operator chosen by user
    switch(operator) {
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case 'x':
            return multiply(a,b);
            break;
        case "\u00F7":
            return divide(a,b);
            break;
    }
}

//main function
function calculate() {

    const clearKey = document.querySelector("#clear-key");
    const backSpace = document.querySelector("#backspace-key");

    //clear calculator
    clearKey.addEventListener('click', clearDisplay);

    //event listener on number keys
    const inputKeys = document.querySelectorAll(".show-input");
    inputKeys.forEach(key => key.addEventListener('click', (e) => {
        if(operator !== "") {
            operand2 += e.target.textContent;
            updateDisplay(operand2);
        } else {
            if(operand1 === "0" || operand1 === ""){
                operand1 = e.target.textContent;
            } else {
                operand1 += e.target.textContent;
            }
            updateDisplay(operand1);
        }
    }));

    //event listener on operator keys
    const operatorKeys = document.querySelectorAll(".operator");
    operatorKeys.forEach( key => key.addEventListener( 'click',(e) => {
        if (operand1 !== "" && operand2 !== "" && operator !== "") {
            operand1 = operate(Number(operand1), Number(operand2), operator);
            updateDisplay(operand1);
            operator = "";
            operand2 = "";
        } 
        operator = e.target.textContent;
    }));

    //event listener on equal to key
    const equalKey = document.querySelector("#equal-key");
    equalKey.addEventListener('click', (e) => {
        if(operand1 !== "" && operand2 !== "" && operator !== "") {
            operand1 = operate(Number(operand1), Number(operand2), operator);
            updateDisplay(operand1);
            operator = "";
            operand2 = "";
        }

        else {
            displayError("ERROR, please provide both operands");
            return "ERROR, please provide proper input";
        }
    });
}


calculate();