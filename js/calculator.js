/* calculator constructor to perform calculator engine */
function Calculator() {
    // state constants
    const START = "START", GETFIRST = "GETFIRST", GETSECOND = "GETSECOND",
            EQPRESSED = "EQPRESSED", OPTPRESSED = "OPTPRESSED";

    // properties
    // store string to display, firstNum and secondNum, and operator
    this.display = ""; 
    this.firstNum = "";
    this.secondNum = "";
    this.operator = "";
    this.state = "START"; // to keep track of current state

    // operation methods
    this.add = function () { return +this.firstNum + +this.secondNum };
    this.subtract = function () { return +this.firstNum - +this.secondNum};
    this.mult = function () { return +this.firstNum * +this.secondNum};
    this.divide = function () { if (+this.secondNum === 0) {
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

        // perform actions depending on state
        switch (this.state) {
            // beginning state
            case START:
                if (btnType === NUMBTN) {
                    this.state = GETFIRST;
                    this.display += value;
                    this.firstNum += value;
                }
                break;
            // get first number
            case GETFIRST:
                if (btnType === NUMBTN) {
                    this.display += value;
                    this.firstNum += value;
                } else if (btnType === EQBTN) {
                    // do nothing
                } else if (btnType === OPTBTN) {
                    this.state = OPTPRESSED;
                    this.operator = value;
                }
                break;
            // operator button pressed
            case OPTPRESSED:
                if (btnType === NUMBTN) {
                    this.state = GETSECOND;
                    this.display = "";
                    this.display += value;
                    this.secondNum += value;
                } else if (btnType === OPTBTN) {
                    this.operator = value;
                } else if (btnType === EQBTN) {
                    this.state = EQPRESSED;
                    this.secondNum += value;
                    this.display = this.operate()
                }
                break;
            // equal button pressed
            case EQPRESSED: 
                if (btnType === NUMBTN) {
                    this.state = GETFIRST;
                    this.display = "";
                    this.display = value;
                    this.firstNum = "";
                    this.firstNum = value;
                    this.secondNum = "";
                } else if (btnType === EQBTN) {
                    // Do nothing
                } else if (btnType === OPTBTN) {
                    this.state = OPTPRESSED;
                    this.firstNum = "";
                    this.firstNum = this.display;
                    this.secondNum = "";
                }
                break;
            // getting second number
            case GETSECOND:
                if (btnType === NUMBTN) {
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
        }
    };
}

/*
// test calculator functions 
calc = new Calculator();
// 3 + 4 = 7
console.log("3 + 4 = 7")
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "3");
console.log(calc.state,calc.display);
calc.fsm("OPTBTN", "+");
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "4");
console.log(calc.state,calc.display);
calc.fsm("EQBTN", "");
console.log(calc.state,calc.display);
// 3 * 5 = 15
console.log("3 * 5 = 15")
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "3");
console.log(calc.state,calc.display);
calc.fsm("OPTBTN", "*");
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "5");
console.log(calc.state,calc.display);
calc.fsm("EQBTN", "");
console.log(calc.state,calc.display);
// 4 - 1 = 3
console.log("4 - 1 = 3")
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "4");
console.log(calc.state,calc.display);
calc.fsm("OPTBTN", "-");
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "1");
console.log(calc.state,calc.display);
calc.fsm("EQBTN", "");
console.log(calc.state,calc.display);
// 4 / 2 = 2
console.log("4 / 2 = 2")
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "4");
console.log(calc.state,calc.display);
calc.fsm("OPTBTN", "/");
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "2");
console.log(calc.state,calc.display);
calc.fsm("EQBTN", "");
console.log(calc.state,calc.display);
// 3 * 4 + 8 = 20
console.log("3 * 4 + 8 = 2")
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "3");
console.log(calc.state,calc.display);
calc.fsm("OPTBTN", "*");
console.log(calc.state,calc.display);
calc.fsm("NUMBTN", "4");
console.log(calc.state,calc.display);
calc.fsm("OPTBTN", "+");
console.log(calc.state,calc.firstNum,calc.operator,calc.display);
calc.fsm("NUMBTN", "8");
console.log(calc.state, calc.display);
calc.fsm("EQBTN", "");
console.log(calc.state, calc.display);
*/