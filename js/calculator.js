/* calculator constructor to perform calculator engine */
function Calculator() {
    // state constants
    const START = "START", GETFIRST = "GETFIRST", GETSECOND = "GETSECOND",
            GETFIRSTDEC = "GETFIRSTDEC", GETSECONDDEC = "GETSECONDDEC", ERROR = "ERROR",
            EQPRESSED = "EQPRESSED", OPTPRESSED = "OPTPRESSED";

    // properties
    // store string to display, firstNum and secondNum, and operator
    this.screen = "";
    this.display = "0"; 
    this.firstNum = "";
    this.secondNum = "";
    this.operator = "";
    this.state = "START"; // to keep track of current state

    // get methods
    this.getDisplay = function () { return this.display };

    // set methods
    this.setDisplay = function (value) { this.display = value; };
    this.setScreen = function () {
        const SCREENLENGTH = 8;
        const NUMMAX = 99999999;
        const NUMMIN = -9999999;
        const DECIMALPT = '.';
        const outputNumber = this.display === "ERROR" ? "ERROR" : Number(this.display);
        const outputNumberStr = outputNumber + '';
        const outputScreen = Array(SCREENLENGTH).fill('');

        if (this.display.match(/^0\.0*$/)) {
            //this.screen = this.display;
            this.screen = this.display.length > SCREENLENGTH ? "ERROR" : this.display;
            if (this.screen === "ERROR") { this.state = "ERROR"; }
            return this.screen;
        }

        if (outputNumber === "ERROR" || outputNumber < NUMMIN || outputNumber > NUMMAX) {
            this.screen = "ERROR";
            this.state = "ERROR";
            return this.screen;
        }

        // populate screen digits
        for (let i = 0; i < SCREENLENGTH; i++) {
            outputScreen[i] = outputNumberStr[i];
        }

        this.screen = outputScreen.join(''); // convert to string
        return this.screen;

    };
    

    // operation methods
    this.add = function () { return +this.firstNum + +this.secondNum };
    this.subtract = function () { return +this.firstNum - +this.secondNum};
    this.mult = function () { return +this.firstNum * +this.secondNum};
    this.divide = function () { 
        if (this.secondNum === '0') {
            this.state = "ERROR";
            return "ERROR"; }
        return +this.firstNum / +this.secondNum; };
    
    // operate function calls appropriate operation based on operator value
    // return a string
    this.operate = function () {
        switch (this.operator) {
            case "+":   return this.add() + '';
                        break;
            case "-":   return this.subtract() + '';
                        break;
            case "*":   return this.mult() + '';
                        break;
            case "/":   return this.divide() + '';
                        break;
            default:    return "ERROR";
        }
    };

    // fsm is the finite state machine which controls the calculator
    this.fsm = function (btnType, value) {
        // define button type pressed
        const NUMBTN = "NUMBTN", OPTBTN = "OPTBTN", EQBTN = "EQBTN";
        const DECIMALPT = "."; // value is '.'
        console.log("Enter FSM: ",this.state, this.display, btnType, value);
        // perform actions depending on state
        switch (this.state) {
            // beginning state
            case START:
                if (btnType === NUMBTN) {
                    // if decimal pressed set state to getfirstdec else getfirst
                    this.state = value === DECIMALPT ? GETFIRSTDEC : GETFIRST;
                    this.display += value;
                    this.firstNum += value;
                }
                break;
            // get first number
            case GETFIRST:
                if (btnType === NUMBTN) {
                    // if decimal pressed set state to getfirstdec else getfirst
                    this.state = value === DECIMALPT ? GETFIRSTDEC : GETFIRST;
                    this.display += value;
                    this.firstNum += value;
                } else if (btnType === EQBTN) {
                    // do nothing
                } else if (btnType === OPTBTN) {
                    this.state = OPTPRESSED;
                    this.operator = value;
                }
                break;
            // get first number decimal
            case GETFIRSTDEC:
                if (btnType === EQBTN || value === DECIMALPT) {
                    // do nothing
                } else if (btnType === NUMBTN) {
                    this.display += value;
                    this.firstNum += value;
                } else if (btnType === OPTBTN) {
                    this.state = OPTPRESSED;
                    this.operator = value;
                }
                break;
            // operator button pressed
            case OPTPRESSED:
                if (btnType === NUMBTN) {
                    // if decimal pressed set state to getseconddec else getsecond
                    this.state = value === DECIMALPT ? GETSECONDDEC: GETSECOND;                    
                    this.display = "0";
                    this.display += value;
                    this.secondNum += value;
                } else if (btnType === OPTBTN) {
                    this.operator = value;
                } else if (btnType === EQBTN) {
                    this.state = EQPRESSED;
                    //this.secondNum += value;
                    this.display = this.operate();
                    this.firstNum = this.display;
                }
                break;
            // equal button pressed
            case EQPRESSED: 
                if (btnType === NUMBTN) {
                    // if decimal pressed set state to getfirstdec else getfirst
                    this.state = value === DECIMALPT ? GETFIRSTDEC: GETFIRST;  
                    this.display = "0";
                    this.display += value;
                    this.firstNum = "0";
                    this.firstNum += value;
                    this.secondNum = "0";
                } else if (btnType === EQBTN) {
                    // Do nothing
                } else if (btnType === OPTBTN) {
                    this.state = OPTPRESSED;
                    this.operator = value;
                    this.firstNum = "";
                    this.firstNum = this.display;
                    this.secondNum = "0";
                }
                break;
            // getting second number
            case GETSECOND:
                if (btnType === NUMBTN) {
                    // if decimal pressed set state to getseconddec else getsecond
                    this.state = value === DECIMALPT ? GETSECONDDEC: GETSECOND;  
                    this.display += value;
                    this.secondNum += value;
                } else if (btnType === EQBTN) {
                    this.state = EQPRESSED;
                    this.display = this.operate();
                } else if (btnType = OPTBTN) {
                    this.state = OPTPRESSED;
                    this.display = this.operate();
                    this.firstNum = "";
                    this.firstNum = this.display;
                    this.operator = value;
                    this.secondNum = "";
                }
                break;
            // getting second number decimal
            case GETSECONDDEC:
                if (value === DECIMALPT) {
                    // no nothing
                } else if (btnType === NUMBTN) {
                    this.display += value;
                    this.secondNum += value;
                } else if (btnType === EQBTN) {
                    this.state = EQPRESSED;
                    this.display = this.operate();
                } else if (btnType = OPTBTN) {
                    this.state = OPTPRESSED;
                    this.display = this.operate();
                    this.firstNum = "";
                    this.firstNum = this.display;
                    this.operator = value;
                    this.secondNum = "";
                }
                break;
            // ERROR Condition
            case ERROR:
                // do nothing
                break;
        }
    };
}

// event callback function for button press
function btnPressed(e) {
    const BTNS = {'num':'NUMBTN', 'op':'OPTBTN', 'eq':'EQBTN'};
    const btnType = BTNS[e.target.getAttribute('class')];
    const value = e.target.textContent;
    console.log(btnType, value);
    calculator.fsm(btnType, value);
    display.textContent = calculator.setScreen();
    console.log(calculator.setScreen());
}

// create new calculator instance
const calculator = new Calculator();
// get display element (div)
const display = document.querySelector('.display'); 

// register event callback function for buttons
const buttons = document.querySelectorAll('button');
for (button of buttons) {
    button.addEventListener('click', btnPressed);
}


