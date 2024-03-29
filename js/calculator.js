$(document).ready(function(){

    const display = $('.result p');
    const fontSize = display.css('font-size');
    var firstNum = '';
    var operator = '';
    var totalNum = '';

    $('.clear').on('click', function(){
        allClear();
    });

    // Equals button press
    $('.equals').on('click', function(){
        equals();
    });

    // Handle key presses
    $(document).on('keypress', (function(e){
        if(e.which === 13){
            e.which = 61;
            e.preventDefault();
        }
        let keypress = String.fromCharCode(e.which);

        if(keypress === '='){
            equals();
        }
        else if(keypress >= 0 || keypress <= 9){
            let aNumber = parseFloat(keypress);
            handleNumber(aNumber);
        }
        else if(keypress === '%'){
            doPercentage();
        }
        else if(keypress === '+/-'){
            doPlusMinus();
        }
        else if(keypress === '.'){
            doDecimal();
        }
        else{
            handleOperator(keypress);
        }

    }));

    // Handle number button presses
    $('.number').on('click', function(e){
        let btn = e.target.innerHTML;
        let aNumber = parseFloat(btn);
        handleNumber(aNumber);
    });

    function handleNumber(aNumber){
        // Check to see if first number is empty if so add to first number.
        if(firstNum === ''){
            if(checkLength() === 1 && parseFloat(display.text()) === 0){
                totalNum = aNumber;
            }
            else if(checkLength() < 16){
                totalNum = display.text().concat(aNumber);
            }
            updateDisplay(totalNum);
        }
        else {
            if(totalNum === ''){
                display.text('');
                totalNum = aNumber;
            }
            else if(checkLength() < 16){
                totalNum = display.text().concat(aNumber);
            }
            updateDisplay(totalNum);
        }
    }

    // Handle operator button presses
    $('.operator').on('click', function(e){
        let anOperator = e.target.innerHTML;
        handleOperator(anOperator);
    });

    function setOperator(anOperator){
        operator = anOperator;
    }

    function equals(){
        if(totalNum !== '' && firstNum !== ''){
            handleOperator('=');
        }
        else if(operator !== ''){
            updateDisplay(firstNum);
        }
        else {
            updateDisplay(totalNum);
        }
    }

    function doPercentage(){
        if(firstNum === ''){
            totalNum = percentage(totalNum);
            updateDisplay(totalNum);
        }
        else {
            equals();
            firstNum = percentage(firstNum);
            updateDisplay(firstNum);
        }
    }

    function doPlusMinus(){
        if(totalNum !== ''){
            totalNum = plusMinus(totalNum);
            updateDisplay(totalNum);
        }
    }

    function doDecimal(){
        let currentInput = display.text();
        if(operator === '' && currentInput.indexOf(".") === -1 && checkLength() <= 14){
            display.append('.');
        }
        else if(operator !== '' && totalNum === ''){
            totalNum = '0.'
            updateDisplay(totalNum);
        }
        else if(currentInput.indexOf(".") === -1 && checkLength() <= 14){
            display.append('.');
        }
    }

    function handleOperator(anOperator){

        switch(anOperator){
            case '%':
                doPercentage();
                break;
            case '+/-':
                doPlusMinus();
                break;
            case '.':
                doDecimal();
                break;
            default:
                if(firstNum === ''){
                    firstNum = totalNum;
                    totalNum = '';
                }
                else if(operator === ''){
                    if(totalNum !== '' && firstNum !== ''){
                        handleArithmetic(anOperator, firstNum, totalNum);
                    }
                }
                else if(anOperator === '='){
                    if(totalNum !== '' && firstNum !== ''){
                        handleArithmetic(operator, firstNum, totalNum);
                    }
                }
                else {
                    if(totalNum !== '' && firstNum !== ''){
                        handleArithmetic(operator, firstNum, totalNum);
                    }
                }
                setOperator(anOperator);
        }
    }

    function allClear(){
        firstNum = '';
        operator = '';
        totalNum = '';
        decimalUsed = false;
        updateDisplay('');
        updateFontSize();
    }
    //
    function updateDisplay(input){
        if(input !== ''){
            display.text(input);
        }
        else {
            display.text(0);
        }
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

    function handleArithmetic(operator, theFirstNum, theSecondNum){
        // Check if it is an operator
        switch(operator) {
            case '+':
                totalNum = addition(theFirstNum, theSecondNum);
                updateDisplay(totalNum);
                break;
            case '-':
                totalNum = subtraction(theFirstNum, theSecondNum);
                updateDisplay(totalNum);
                break;
            case '*':
                totalNum = multiplication(theFirstNum, theSecondNum);
                updateDisplay(totalNum);
                break;
            case '×':
                totalNum = multiplication(theFirstNum, theSecondNum);
                updateDisplay(totalNum);
                break;
            case '/':
                totalNum = division(theFirstNum, theSecondNum);
                updateDisplay(totalNum);
                break;
            case '÷':
                totalNum = division(theFirstNum, theSecondNum);
                updateDisplay(totalNum);
                break;
        }
        firstNum = totalNum;
        totalNum = '';
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

    function plusMinus(value1){
        return (parseFloat(value1) * -1);
    }

});