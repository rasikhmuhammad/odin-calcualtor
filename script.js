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
        case '/':
            return divide(a,b);
            break;
        default: 
            return "ERROR, operator not valid!";
    }
}
