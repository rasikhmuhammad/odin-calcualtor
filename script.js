//data variables
let operand1 = "0";
let operand2 = "";
let operator = "";
let result = 0;
let isError = false;
// record if decimal point is being used
let decimalActive = false;

//DOM element for calculator display
const display = document.querySelector('p#ongoing-display');
const history = document.querySelector('p#history');

//nodelist for various keys/buttons

//all buttons except clear
const keys = document.querySelectorAll('button.keys');
//all keys whose value can be outputted to display
const inputKeys = document.querySelectorAll(".show-input");
//only operators keys
const operatorKeys = document.querySelectorAll(".operator");
//equal to key for calculating
const equalKey = document.querySelector("#equal-key");
//backspace key
const backspace = document.querySelector('#backspace-key');
//clear key
const clearKey = document.querySelector("#clear-key");
//decimal point key
const decimalKey = document.getElementById('decimal-key');


//function to update display
const updateDisplay = function (content) {
    display.textContent = content;
}

//function to update history
const updateHistory = function (content) {
    history.textContent = content;
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

//function to clear display and reset calculator
const clearDisplay = function() {
    display.classList.remove("error");
    reset();    
    display.textContent = "0";
    history.textContent = "";
    if(isError === true) {
        keys.forEach(button => button.removeAttribute('disabled'));
    }
    decimalActive = false;
    decimalKey.removeAttribute('disabled');
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
         displayError("Not a valid number, clear and try again!");
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
                displayError("Cannot divide by 0, clear and try again!");
            }
            else updateDisplay(result);
            break;
    }
}

//main function
function calculate() {

    //clear calculator
    clearKey.addEventListener('click', clearDisplay);

    //event listener on number keys
    inputKeys.forEach(key => key.addEventListener('click', (e) => {
        if(operator !== "") {
            operand2 += e.target.textContent;
            updateDisplay(operand2);
        } else {
            if(operand1 === "0"){
                operand1 = e.target.textContent;
            } else {
                operand1 += e.target.textContent;
            }
            updateDisplay(operand1);
        }
    }));



    //event listener on operator keys
    operatorKeys.forEach( key => key.addEventListener( 'click',(e) => {
        if (operand1 !== "" && operand2 !== "" && operator !== "") {
            operate(Number(operand1), Number(operand2), operator);

            //display operands or history
            updateHistory(operand1 + " " + operator + " " + operand2);

            //result being 0 indicates an error thrown
            if(result !==0) {
                operand1 = result;
            }
            operator = "";
            operand2 = "";
        } 
        operator = e.target.textContent;
        updateHistory(operand1 + " " + operator);

        //enable decimal point when operator is clicked
        decimalActive = false;
        decimalKey.removeAttribute('disabled');
    }));



    //event listener on equal to key
    equalKey.addEventListener('click', (e) => {
        if(operand1 !== "" && operand2 !== "" && operator !== "") {
            operate(Number(operand1), Number(operand2), operator);

            //display operands or history
            updateHistory(operand1 + " " + operator + " " + operand2 + " =");

            //result being 0 indicates an error thrown
            if(result !==0) {
                operand1 = result.toString();
            }

            //disable decimal point if answer has decimal key
            if(operand1.includes(".")) {
                decimalActive = true;
                decimalKey.setAttribute('disabled', 'true');
            }
            operator = "";
            operand2 = "";
        } else {
            displayError("Wrong inputs! clear and try again");
        }
    });



    //event listener on backspace key
    backspace.addEventListener('click', (e) => {
        //for operand1
        if(operator === "" && operand2 === "") {
            //if operand1 has more than 1 digit, remove last digit
            if(operand1.length > 1) {
                operand1 = operand1.slice(0, -1);
                updateDisplay(operand1);
            } else {
                operand1 = "0"
                updateDisplay(operand1);
            } 
            //enable decimal point if it has been erased due to backspace
            if(!operand1.includes(".")) {
                decimalActive = false;
                decimalKey.removeAttribute('disabled');
            }
        }

        //for operand2
        else if(operator !== "") {
            if(operand2.length > 1) {
                operand2 = operand2.slice(0, -1);
                updateDisplay(operand2);
            } else {
                operand2 = "";
                updateDisplay(operand2);
            }
            //enable decimal point if it has been erased due to backspace
            if(!operand2.includes(".")) {
                decimalActive = false;
                decimalKey.removeAttribute('disabled');
            }
        }     
    });



    //decimal point input functionality
    decimalKey.addEventListener('click', (e) => {
        if(operator === "" && operand2 === "") {
            if(operand1.includes(".") === false) {
                operand1 += ".";
                updateDisplay(operand1);
                decimalActive = true;
                e.target.setAttribute('disabled', 'true');
            }

            console.log(operand1.includes("."));
        }

        else if(operator !== "") {
            if(operand2.includes(".") === false) {
                operand2 += ".";
                updateDisplay(operand2);
                decimalActive = true;
                e.target.setAttribute('disabled', 'true');
            }
        }
    });
    }

    
calculate();