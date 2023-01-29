//Global variables
let operand1 = "";
let operand2 = "";
let operator = "";

//DOM element for calculator display
const display = document.querySelector('div.display');


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
    if(b === 0) return "ERROR, cannot divide by 0";

    return a/b;
}

//called if user performs action on two numbers
function operate(a,b,operator) {

    //check if a and b are numbers

    if(typeof(a) !== 'number' && typeof(b) !== "number") {
        return "ERROR, please enter a valid number";
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
        default: 
            return "ERROR, operator not valid!";
    }
}


//function to update display
const updateDisplay = function (content) {
    display.textContent = content;
}

//function to clear display
const clearDisplay = function() {
    operand1 = "";
    operand2 = "";
    operator = "";
    display.textContent = "";
}


//main function
function calculate() {

    const clearKey = document.querySelector("#clear-key");
    const backSpace = document.querySelector("#backspace-key");

    //clear calculator
    clearKey.addEventListener('click', clearDisplay);

    const inputKeys = document.querySelectorAll(".show-input");
    inputKeys.forEach(key => key.addEventListener('click', (e) => {
        if(operator !== "") {
            operand2 += e.target.textContent;
            updateDisplay(operand2);
        } else {
            operand1 += e.target.textContent;
            updateDisplay(operand1);
        }      
    }));

    const operatorKeys = document.querySelectorAll(".operator");
    operatorKeys.forEach( key => key.addEventListener( 'click',(e) => {
        operator = e.target.textContent;  
    }));

    const equalKey = document.querySelector("#equal-key");
    equalKey.addEventListener('click', (e) => {
        if(operand1 !== "" && operand2 !== "" && operator !== "") {
            operand1 = operate(Number(operand1), Number(operand2), operator);
            updateDisplay(operand1);
            operator = "";
            operand2 = "";
        }

        else {
            display.textContent = "ERROR, please provide proper input";
            return "ERROR, please provide proper input";
        }
    });
}


calculate();