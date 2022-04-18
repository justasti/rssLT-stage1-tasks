class Calculator {
  constructor(prevCountText, currCountText) {
    this.prevCountText = prevCountText;
    this.currCountText = currCountText;
    this.clear();
    this.multiplier = Math.pow(10, 10);
  }

  clear() {
    this.currInput = "0";
    this.prevInput = "";
    this.operation = undefined;
  }

  deleteLastChar() {
    if (this.currInput === "Error!" || this.currInput === "Infinity") return;
    this.currInput = this.currInput.toString().slice(0, -1);
    if (this.currInput === "") {
      this.currInput = "0";
    }
  }

  negate() {
    if (this.currInput == "Error!" || this.currInput === "Infinity") return;
    if (this.currInput === "") return;
    this.currInput = (-this.currInput).toString();
  }

  appendOperation(operation) {
    if (this.currInput === "Error!" || this.currInput === "Infinity") return;
    if (this.prevInput !== "") {
      this.calculate();
    }
    if (this.currInput !== "") {
      if (operation === "xⁿ") {
        operation = "^";
      }
      this.operation = operation;
      this.prevInput = this.currInput + operation;
      this.currInput = "0";
    }
  }

  calculate() {
    let calculation;
    const previousOperand = parseFloat(this.prevInput);
    const currentOperand = parseFloat(this.currInput);

    if (isNaN(previousOperand) || isNaN(currentOperand)) return;

    switch (this.operation) {
      case "+":
        calculation =
          (currentOperand * this.multiplier +
            previousOperand * this.multiplier) /
          this.multiplier;

        break;

      case "-":
        calculation =
          (previousOperand * this.multiplier -
            currentOperand * this.multiplier) /
          this.multiplier;
        break;

      case "*":
        calculation =
          (currentOperand *
            this.multiplier *
            previousOperand *
            this.multiplier) /
          Math.pow(this.multiplier, 2);
        break;

      case "÷":
        if (currentOperand === 0) {
          this.currInput = "Error!";
          this.prevInput = "";
          return;
        }

        calculation =
          (this.multiplier * previousOperand) /
          (this.multiplier * currentOperand);
        break;
      case "^":
        calculation = previousOperand ** currentOperand;
        break;
    }
    if (calculation > 0 && calculation.toString().includes(".")) {
      calculation = calculation.toString().slice(0, 11);
    }
    if (calculation < 0 && calculation.toString().includes(".")) {
      calculation = calculation.toString().slice(0, 12);
    }
    if (calculation > 0 && !calculation.toString().includes(".")) {
      calculation = calculation.toString().slice(0, 10);
    }
    if (calculation < 0 && !calculation.toString().includes(".")) {
      calculation = calculation.toString().slice(0, 11);
    }

    this.currInput = calculation.toString();
    this.prevInput = "";
    this.operation = undefined;
  }
  sqrt() {
    if (this.currInput === "Error!" || this.currInput === "Infinity") return;
    if (parseFloat(this.currInput) < 0) {
      this.currInput = "Error!";
      this.prevInput = "";
      return;
    }
    this.currInput = Math.sqrt(parseFloat(this.currInput)).toString();
    if (this.currInput.replace(/[\W_]/g, "").length > 9) {
      this.currInput = parseFloat(this.currInput).toPrecision(10);
    }
  }

  appendNumber(number) {
    if (this.currInput === "0" && number !== ".") {
      this.currInput = "";
    }
    if (this.currInput === "Error!" || this.currInput === "Infinity") return;
    if (this.currInput.includes(".") && number === ".") return;
    if (this.currInput.replace(/[\W_]/g, "").length > 9) return;
    this.currInput += number.toString();
  }

  updateDisplay() {
    this.currCountText.textContent = this.currInput;
    this.prevCountText.textContent = this.prevInput;
  }
}

const prevCountText = document.querySelector(".prev-count");
const currCountText = document.querySelector(".curr-count");
const clearButton = document.querySelector(".clear");
const delButton = document.querySelector(".delete");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
const negateButton = document.querySelector(".negate");
const equalsButton = document.querySelector(".equals");
const sqrtButton = document.querySelector(".sqrt");

const calculator = new Calculator(prevCountText, currCountText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendOperation(button.textContent);
    calculator.updateDisplay();
  });
});

negateButton.addEventListener("click", () => {
  calculator.negate();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", (button) => {
  calculator.calculate();
  calculator.updateDisplay();
});

delButton.addEventListener("click", () => {
  calculator.deleteLastChar();
  calculator.updateDisplay();
});

sqrtButton.addEventListener("click", () => {
  calculator.sqrt();
  calculator.updateDisplay();
});
