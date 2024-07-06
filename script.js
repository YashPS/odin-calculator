var operandOne, operandTwo, operator, alreadyOperated, currentInputNumber, inputsCaptured = [], finalResult;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        alert('Divide by zero problem!')
    }
    else {
        return a / b;
    }

}

function operate(operandOne, operator, operandTwo) {
    switch (operator) {
        case '+':
            return add(operandOne, operandTwo);
            break;
        case '-':
            return subtract(operandOne, operandTwo);
            break;
        case '*':
            return multiply(operandOne, operandTwo);
            break;
        case '/':
            return divide(operandOne, operandTwo);
            break;
        default:
    }
}

keys = document.querySelector('.keys')
display = document.querySelector('.display')

// display.textContent = 1
keys.addEventListener('click', function (event) {
    var target = event.target;


    if (target.id == 'clear') {
        display.textContent = null;
        inputsCaptured = [];
        console.log('all cleared');
    } else if (target.classList.contains('number')) {
        if (display.textContent) {
            display.textContent = (parseInt(display.textContent) * 10) + parseInt(target.textContent);
        }
        else {
            display.textContent = parseInt(target.textContent);
        }
        if (operator) {
            alreadyOperated = true;
        }
    } else if (target.classList.contains('operator')) {

        currentInput = parseInt(display.textContent)

        if (isNumber(currentInput)) {
            display.textContent = null;
            inputsCaptured.push(currentInput);
            inputsCaptured.push(target.textContent);
            console.log(inputsCaptured)
        }

    } else if (target.id == 'equal') {

        currentInput = parseInt(display.textContent)
        if (isNumber(currentInput)) {
            display.textContent = null;
            inputsCaptured.push(currentInput);
        }
        if (isOperator(inputsCaptured[-1])) {
            inputsCaptured.pop();
        }
        console.log('final list ' + inputsCaptured)
        while (inputsCaptured.length >= 3) {
            var result = operate(inputsCaptured[0], inputsCaptured[1], inputsCaptured[2]);
            inputsCaptured.splice(0, 3);
            inputsCaptured.unshift(result);
        }
        console.log('final list after calc' + inputsCaptured)
        display.textContent = inputsCaptured[0]
        inputsCaptured.splice(0, 1);
    }


});

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

function isOperator(value) {
    return value === '+' || value === '-' || value === '/' || value === '*';
}