// DOM Elements

let keys = document.querySelectorAll(".key");
let zeroNumbers = document.querySelectorAll(".zero");
let input = document.querySelector(".calculate-input");
let backBtn = document.querySelector(".back");
let clearBtn = document.querySelector(".clear");
let result = document.querySelector(".result");
let floatSign = document.querySelector(".float");
let operators = document.querySelectorAll(".operator");
let equalsBtn = document.querySelector(".equals");
let powBtn = document.querySelector(".pow");
let factorialBtn = document.querySelector(".factorial");
let radicalBtn = document.querySelector(".radical");

//  Main Array

let numberClicked = [];

// Keys

keys.forEach((num) => {
  num.addEventListener("click", (event) => {
    if (input.value.length <= 28) {
      if (
        !numberClicked[numberClicked.length - 1] == "0" ||
        numberClicked[numberClicked.length - 1] == undefined
      ) {
        calculate(event.target);
      }
    }
  });
});

// Calculate Function

function calculate(key) {
  if (key.dataset.key != "=") {
    numberClicked.push(key.dataset.key);
    input.value += key.innerHTML;
  }
  ChangeInputSize();
  changeResult();
}

//  Float Sign

floatSign.addEventListener("click", (event) => {
  if (numberClicked.length == []) {
    numberClicked.push(0);
    numberClicked.push(".");
    input.value += event.target.dataset.key;
  } else if (!numberClicked.includes(".")) {
    numberClicked.push(".");
    input.value += event.target.dataset.key;
  } else if (numberClicked[numberClicked.length - 1] != ".") {
    numberClicked.push(".");
    input.value += event.target.dataset.key;
  }
  ChangeInputSize();
  changeResult();
});

//  Zero Numbers

zeroNumbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (input.value.length <= 28) {
      if (numberClicked.length == []) {
        numberClicked.push(0);
        input.value += 0;
      } else if (
        event.target.dataset.key == "00" &&
        numberClicked.length != 0
      ) {
        for (let i = 0; i <= 1; i++) {
          numberClicked.push("0");
          input.value += "0";
        }
      } else if (
        event.target.dataset.key == "000" &&
        numberClicked.length != 0
      ) {
        for (let i = 0; i <= 2; i++) {
          numberClicked.push("0");
          input.value += "0";
        }
      } else {
        numberClicked.push(event.target.dataset.key);
        input.value = "";
        input.value += numberClicked.join("");
      }
    }
    ChangeInputSize();
    changeResult();
  });
});

//  Operators

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    if (numberClicked.length == []) {
      if (
        operator.dataset.key == "+" ||
        operator.dataset.key == "*" ||
        operator.dataset.key == "/" ||
        operator.dataset.key == "-"
      ) {
        numberClicked = [];
        numberClicked.push(0);
        numberClicked.push(operator.dataset.key);
        input.value += 0;
        input.value += event.target.innerHTML;
      }
    } else if (
      numberClicked[numberClicked.length - 1] != event.target.dataset.key &&
      numberClicked.length <= 28
    ) {
      numberClicked.push(event.target.dataset.key);
      input.value += event.target.innerHTML;
    }
    ChangeInputSize();
    changeResult();
  });
});

// Pow Button

powBtn.addEventListener("click", (e) => {
  if (numberClicked.length == []) {
    numberClicked.push(0);
    input.value += 0;
  }
  numberClicked.push(e.target.dataset.key);
  input.value += "^";
});

// Factorial

function factorial(number) {
  if (number === 1) return 1;

  return number * factorial(number - 1);
}

// Factorial Button

factorialBtn.addEventListener("click", () => {
  let factorialResult = factorial(Number(input.value));

  input.value += "!";
  numberClicked = [];
  numberClicked.push(factorialResult);
  changeResult();
});

// Radical Button

radicalBtn.addEventListener("click", () => {
  input.value += "√";
});

//  Back Button

backBtn.addEventListener("click", () => {
  deleteLastNumber();
  ChangeInputSize();
  changeResult();
});

function deleteLastNumber() {
  numberClicked.pop();
  input.value = numberClicked.join("");
}

//  Clear All Function

clearBtn.addEventListener("click", () => {
  clearAll();
});

function clearAll() {
  numberClicked = [];
  input.value = numberClicked;
  changeResult();
  result.style.fontSize = "30px";
  input.style.fontSize = "25px";
}

//  Change Result Function

function changeResult() {
  if (numberClicked.join("")) {
    let resultJoin = numberClicked.join("");
    let resultCalc = eval(resultJoin);

    if (resultJoin.length > 30) {
      let bigNumber = resultCalc.toExponential();
      result.innerHTML = `= ${bigNumber.toLocaleString()}`;
    } else {
      result.innerHTML = `= ${resultCalc.toLocaleString()}`;
    }
  } else {
    result.innerHTML = `= 0`;
  }
  ChangeInputSize();
  ChangeResultSize();
  //   console.log(numberClicked);
}

//  Equals Button

equalsBtn.addEventListener("click", () => {
  result.style.fontSize = "35px";
  input.style.fontSize = "16px";
  changeResult();
  numberClicked = [];

  let resultValue = result.textContent;
  for (let i = 0; i < resultValue.length; i++) {
    if (
      resultValue[i] !== " " &&
      resultValue[i] !== "=" &&
      resultValue[i] !== ","
    ) {
      numberClicked.push(resultValue[i]);
    }
    console.log(numberClicked);
  }

  input.value = numberClicked.join("");
  changeResult();
  ChangeResultSize();
});

//  Input FontSize

function ChangeInputSize() {
  if (input.value.length >= 13) {
    input.style.fontSize = "16px";
  } else {
    input.style.fontSize = "35px";
  }
}

//  Result FontSize

function ChangeResultSize() {
  if (result.textContent.length >= 15) {
    console.log(result.textContent.length);
    result.style.fontSize = "20px";
  } else {
    result.style.fontSize = "30px";
  }
}
