//data variables
let operand1 = "0";
let operand2 = "";
let operator = "";
let result = 0;
let isError = false;

//DOM element for calculator display
const display = document.querySelector('div.display');

//nodelist for all keys
const keys = document.querySelectorAll('button.keys');


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

//function to display and handle error
const displayError = function(error) {
    display.textContent = error;
    display.classList.add("error");
    reset();
    isError = true;
    keys.forEach(button => button.setAttribute('disabled', 'true'));
}

//function to clear display
const clearDisplay = function() {
    display.classList.remove("error");
    reset();    
    display.textContent = "0";
    if(isError === true) {
        keys.forEach(button => button.removeAttribute('disabled'));
    }
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
        return 0;
    } else return a/b;
}

//called if user performs action on two numbers
function operate(a,b,operator) {

    //check if a and b are numbers

    if(typeof(a) !== 'number' && typeof(b) !== "number") {
         displayError("ERROR, not a valid number, clear and try again!");
    } 

    //call the appropriate function based on operator chosen by user
    switch(operator) {
        case '+':
            result = add(a,b);
            updateDisplay(result);
            break;
        case '-':
            result = subtract(a,b);
            updateDisplay(result);
            break;
        case 'x':
            result = multiply(a,b);
            updateDisplay(result);
            break;
        case "\u00F7":
            result = divide(a,b);
            if(result === 0) {
                displayError("ERROR, cannot divide by 0, clear and try again!");
            }
            else updateDisplay(result);
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
            operate(Number(operand1), Number(operand2), operator);
            if(result !==0) {
                operand1 = result;
            }
            operator = "";
            operand2 = "";
        } 
        operator = e.target.textContent;
    }));

    //event listener on equal to key
    const equalKey = document.querySelector("#equal-key");
    equalKey.addEventListener('click', (e) => {
        if(operand1 !== "" && operand2 !== "" && operator !== "") {
            operate(Number(operand1), Number(operand2), operator);
            if(result !==0) {
                operand1 = result;
            }
            operator = "";
            operand2 = "";
        }

        else {
            displayError("ERROR, wrong inputs! clear and try again");
        }
    });
}


calculate();