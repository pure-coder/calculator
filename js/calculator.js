$(document).ready(function(){

    const display = $(".result p");
    const fontSize = display.css('font-size');
    var firstNum = '';
    var secondNum = '';
    var operator = '';
    var totalNum = '';
    var currentInput;
    var decimalUsed = false;

    $("button").on("click", function(e){
        var btn = e.target.innerHTML;
        // Stops fake red, yellow, green button from interfering with calculator
        if(btn !== ''){
            handleInput(btn);
        }

    });

    $(document).on('keypress',(function(e){
        // This prevents the last number entered from being constantly re-entered when enter key is pressed.
        if(e.which === 13){
            e.which = 61;
            e.preventDefault();
        }
        handleInput(String.fromCharCode(e.which));
    }));

    function handleInput(btn){
        // Change font size if more than 5 numbers
        updateFontSize();

        // Check if button pressed is a number
        if(btn >= 0 || btn <= 9){
            // Reset after calculation has been made (only if user doesn't click on another operator to continue current calculation)
            if(totalNum !== ''){
                allClear();
            }
            if(checkLength() === 1 && parseFloat(display.text()) === 0 ){
                currentInput = btn;
            }
            else if(checkLength() < 16){
                // Use concat here instead of append as call to updateDisplay would display [object object]
                currentInput = display.text().concat(btn);
            }
            // Update display with user input
            updateDisplay(currentInput);
        }
        else if(btn === 'AC' || btn === '.' || btn === '+/-'){
            switch(btn) {
                case 'AC':
                    allClear();
                    break;
                case '.':
                    checkDecimal(btn);
                    break;
                case '+/-':
                    // Toggle plus/minus
                    // Make sure display is not empty
                    if(display.text() !== ''){
                        display.text(parseFloat(display.text())*-1);
                    }
                    break;
            }
        }
        else if(totalNum !== '' && btn !== '='){
            handleNumber(firstNum);
            totalNum = '';
            operator = btn;
        }
        // Check to see if first number, if so and = is pressed don't update screen, wait for an arithmetic operator to be pressed.
        else if ((btn === '=' && firstNum === '') && currentInput !== ''){
            updateDisplay(currentInput);
        }
        else if(currentInput !== ''){
            currentInput = parseFloat(currentInput);
            if($.isNumeric(currentInput)){
                handleNumber(currentInput);
                handleOperator(btn);
            }
            if(btn === '%' && currentInput <= 0){
                totalNum = percentage(firstNum);
                updateDisplay(totalNum);
            }
        }
    }

    function handleNumber(number){
        if(firstNum === ''){
            firstNum = number;
        }
        else{
            secondNum = number;
        }
        currentInput = '';
        updateDisplay(currentInput);
    }

    function handleOperator(theOperator) {
        if (operator === '') {
            operator = theOperator;
        } else {
            if(secondNum !== ''){
                handleArithmetic(operator, firstNum, secondNum);
            }
            operator = theOperator;
        }

        decimalUsed = false;

    }

    function allClear(){
        firstNum = '';
        secondNum = '';
        operator = '';
        totalNum = '';
        currentInput = 0;
        decimalUsed = false;
        updateDisplay(currentInput);
        updateFontSize();
    }

    function updateDisplay(input){
        display.text(input);
        updateFontSize();
    }

    function checkLength(){
        return display.text().length
    }

    function updateFontSize(){
        if(checkLength() < 6){
            display.css('font-size', fontSize);
            display.css('bottom', '0');
        }
        else if( checkLength() <= 16){
            display.css('font-size', '20px');
            display.css('bottom', '10px');
        }
        else {
            display.css('font-size', '16px');
            display.css('bottom', '10px');
        }
    }

    function checkDecimal(decimal){
        if(!decimalUsed && checkLength() <= 14){
            display.append(decimal);
            decimalUsed = true;
        }
    }

    function handleArithmetic(operator){
        // Check if it is an operator
        switch(operator) {
            case '=':
                updateDisplay(totalNum);
                break;
            case '+':
                totalNum = addition(firstNum, secondNum);
                updateDisplay(totalNum);
                break;
            case '-':
                totalNum = subtraction(firstNum, secondNum);
                updateDisplay(totalNum);
                break;
            case '*':
                totalNum = multiplication(firstNum, secondNum);
                updateDisplay(totalNum);
                break;
            case '×':
                totalNum = multiplication(firstNum, secondNum);
                updateDisplay(totalNum);
                break;
            case '/':
                totalNum = division(firstNum, secondNum);
                updateDisplay(totalNum);
                break;
            case '÷':
                totalNum = division(firstNum, secondNum);
                updateDisplay(totalNum);
                break;
        }
        firstNum = totalNum;
        secondNum = '';
        updateDisplay(totalNum);
    }

    function addition(value1, value2){
        return parseFloat(value1) + parseFloat(value2);
    }

    function subtraction(value1, value2){
        return parseFloat(value1) - parseFloat(value2);
    }

    function multiplication(value1, value2){
        return parseFloat(value1) * parseFloat(value2);
    }

    function division(value1, value2){
        return parseFloat(value1) / parseFloat(value2);
    }

    function percentage(value1){
        return (parseFloat(value1) / 100);
    }

});