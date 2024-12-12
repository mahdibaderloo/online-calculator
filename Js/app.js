// DOM Elements

let keys = document.querySelectorAll('.key')
let zeroNumbers = document.querySelectorAll('.zero')
let input = document.querySelector('.calculate-input')
let backBtn = document.querySelector('.back')
let clearBtn = document.querySelector('.clear')
let result = document.querySelector('.result')
let floatSign = document.querySelector('.float')
let operators = document.querySelectorAll('.operator')
let equalsBtn = document.querySelector('.equals')



//  Main Array

let numberClicked = [];


// Keys 

keys.forEach( num => {
    num.addEventListener('click', event => {
        if (input.value.length <= 28) {
            
            if (!numberClicked[numberClicked.length - 1] == '0' || numberClicked[numberClicked.length - 1] == undefined) {
                calculate(event.target)
            }
        }
    })
})



// Calculate Function

function calculate (key) {

    if (key.dataset.key != '=') {
        numberClicked.push(key.dataset.key)
        input.value += key.innerHTML
    }
    ChangeInputValue()
    changeResult()
}



//  Float Sign

floatSign.addEventListener('click', event => {
    if (numberClicked.length == []) {
        numberClicked.push(0)
        numberClicked.push('.')
        input.value += event.target.dataset.key
    }
    else if (!numberClicked.includes('.')) {
        numberClicked.push('.')
        input.value += event.target.dataset.key
    }
    else if (numberClicked[numberClicked.length - 1] != '.') {
        numberClicked.push('.')
        input.value += event.target.dataset.key
    }
    ChangeInputValue()
    changeResult()
})



//  Zero Numbers

zeroNumbers.forEach (number => {

    number.addEventListener('click', event => {

        if (input.value.length <= 28) {
            
            if (numberClicked.length == []) {
                numberClicked.push(0)
                input.value += 0
            }
            else if (event.target.dataset.key == '00' && numberClicked.length != 0) {
                for (let i = 0; i <= 1; i++) {
                    numberClicked.push('0')
                    input.value += '0'
                }
            }
            else if (event.target.dataset.key == '000' && numberClicked.length != 0) {
                for (let i = 0; i <= 2; i++) {
                    numberClicked.push('0')
                    input.value += '0'
                }
            }
            else {
                numberClicked.push(event.target.dataset.key)
                input.value = ''
                input.value += numberClicked.join('')
            }
        }
        ChangeInputValue()
        changeResult()
    })
})



//  Operators

operators.forEach( operator => {

    operator.addEventListener('click', event => {
        if (numberClicked.length == []) {
            if (operator.dataset.key == '+' || operator.dataset.key == '*' || operator.dataset.key == '/' || operator.dataset.key == '-') {
                
                numberClicked = []
                numberClicked.push(0)
                numberClicked.push(operator.dataset.key)
                input.value += 0
                input.value += event.target.innerHTML
            }
        }
        else if (numberClicked[numberClicked.length - 1] != event.target.dataset.key && numberClicked.length <= 28) {
            numberClicked.push(event.target.dataset.key)
            input.value += event.target.innerHTML
        }
        ChangeInputValue()
        changeResult()
    })
})




//  Back Button

backBtn.addEventListener('click', () => {
    deleteLastNumber()
    ChangeInputValue()
    changeResult()
})

function deleteLastNumber () {
    numberClicked.pop()
    input.value = numberClicked.join('')
}



//  Clear All Function


clearBtn.addEventListener('click', () => {
    clearAll()
})

function clearAll () {
    numberClicked = []
    input.value = numberClicked
    changeResult()
    result.style.fontSize = '30px'
    input.style.fontSize = '25px'
}



//  Change Result Function

function changeResult () {

    if (numberClicked.join('')) {
        let resultJoin = numberClicked.join('')
        let resultCalc = eval(resultJoin)

        if (resultJoin.length > 9) {
            let bigNumber = resultCalc.toExponential()
            result.innerHTML = `= ${bigNumber.toLocaleString()}` 
        }
        else {
            result.innerHTML = `= ${resultCalc.toLocaleString()}` 
        }
    }
    else {
        result.innerHTML = `= 0`
    }
    console.log(numberClicked)
}



//  Equals Button

equalsBtn.addEventListener('click', () => {
    result.style.fontSize = '35px'
    input.style.fontSize = '16px'
    changeResult()
    numberClicked = []
    numberClicked.push(Number(result.textContent.slice(1).split(',').join('')))
    input.value = numberClicked
})



//  Input

function ChangeInputValue () {

    if (input.value.length >= 13) {
        input.style.fontSize = '16px'
    }
    else {
        input.style.fontSize = '35px'    
    }
}
