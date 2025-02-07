// Scientific Calculator Functionality

class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.displayValue = '';
        this.memory = 0;
        this.angleMode = 'DEG'; // Default to degrees
    }

    updateDisplay() {
        this.displayElement.value = this.displayValue;
    }

    append(value) {
        if (this.displayValue === 'Error') this.displayValue = '';
        this.displayValue += value;
        this.updateDisplay();
    }

    clear() {
        this.displayValue = '';
        this.updateDisplay();
    }

    deleteLast() {
        this.displayValue = this.displayValue.slice(0, -1);
        this.updateDisplay();
    }

    calculate() {
        try {
            this.displayValue = eval(this.displayValue.replace(/\u00D7/g, '*').replace(/\u00F7/g, '/')).toString();
            this.updateDisplay();
        } catch {
            this.displayValue = 'Error';
            this.updateDisplay();
        }
    }

    trigonometric(fn) {
        let value = parseFloat(this.displayValue);
        if (isNaN(value)) return;
        if (this.angleMode === 'DEG') {
            value = value * (Math.PI / 180);
        }
        this.displayValue = Math[fn](value).toString();
        this.updateDisplay();
    }

    factorial(n) {
        if (n < 0) return 'Error';
        return n === 0 ? 1 : n * this.factorial(n - 1);
    }

    toggleAngleMode() {
        this.angleMode = this.angleMode === 'DEG' ? 'RAD' : 'DEG';
    }

    memoryStore() {
        this.memory = parseFloat(this.displayValue) || 0;
    }

    memoryRecall() {
        this.displayValue = this.memory.toString();
        this.updateDisplay();
    }

    memoryClear() {
        this.memory = 0;
    }

    memoryAdd() {
        this.dispvalue= parseFloat(this.displayValue);
        this.dispvalue += parseFloat(this.memory);
        this.displayValue = this.dispvalue.toString();
        this.updateDisplay();
    }

    memorySubtract() {
        this.dispvalue= parseFloat(this.displayValue);
        this.dispvalue = parseFloat(this.memory);
        this.displayValue = this.dispvalue.toString();
        this.updateDisplay();
    }
}

const display = document.querySelector('input');
const calculator = new Calculator(display);

document.querySelectorAll('.calDiv__btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        switch (id) {
            case '=': calculator.calculate(); break;
            case 'reset-char': calculator.clear(); break;
            case 'remove-char': calculator.deleteLast(); break;
            case 'sin()': calculator.trigonometric('sin'); break;
            case 'cos()': calculator.trigonometric('cos'); break;
            case 'tan()': calculator.trigonometric('tan'); break;
            case '!': 
                calculator.displayValue = calculator.factorial(parseInt(calculator.displayValue)).toString(); 
                calculator.updateDisplay(); 
                break;
            case 'π': calculator.append(Math.PI.toString()); break;
            case 'e': calculator.append(Math.E.toString()); break;
            case 'sqrt': 
                calculator.displayValue = Math.sqrt(parseFloat(calculator.displayValue)).toString(); 
                calculator.updateDisplay(); 
                break;
            case 'log1': 
                calculator.displayValue = Math.log10(parseFloat(calculator.displayValue)).toString(); 
                calculator.updateDisplay(); 
                break;
            case 'ln': 
                calculator.displayValue = Math.log(parseFloat(calculator.displayValue)).toString(); 
                calculator.updateDisplay(); 
                break;
            case '**': calculator.append('**'); break;
            case 'modulo': 
                calculator.displayValue = Math.abs(parseFloat(calculator.displayValue)).toString(); 
                calculator.updateDisplay(); 
                break;
            case 'm-clear': calculator.memoryClear(); break;
            case 'm-recall': calculator.memoryRecall(); break;
            case 'm-plus': calculator.memoryAdd(); break;
            case 'm-minus': calculator.memorySubtract(); break;
            case 'm-store': calculator.memoryStore(); break;
            case 'unit-of-angle': calculator.toggleAngleMode(); break;
            case 'second-fn': calculator.toggleSecondFunction(); break;
            case '10sq': calculator.powerOfTen(); break;
            case '*': calculator.append('\u00D7'); break;
            case '/': calculator.append('\u00F7'); break;
            default: calculator.append(button.textContent);
        }
    });
});
