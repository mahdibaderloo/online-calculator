// DOM Elements

let keys = document.querySelectorAll('.key')
let numbers = document.querySelectorAll('.number')
let input = document.querySelector('.calculate-input')
let backBtn = document.querySelector('.back')
let clearBtn = document.querySelector('.clear')
let result = document.querySelector('.result')
let floatSign = document.querySelector('.float')
let equalsBtn = document.querySelector('.equals')



//  Main Array

let numberClicked = [];


// Keys 

keys.forEach( num => {
    num.addEventListener('click', event => {
        calculate(event.target)
    })
})



// Calculate Function

function calculate (key) {

    if (key.dataset.key != '=') {

        if (numberClicked.length == []) {
            if (key.dataset.key == '+' || key.dataset.key == '*' || key.dataset.key == '/') {
                numberClicked = []
                numberClicked.push(0)
                input.value += 0
            }
        }
        // if (key.dataset.key == '0' || key.dataset.key == '00' || key.dataset.key == '000' && numberClicked.length == []) {
        //     numberClicked = []
        //     input.value = ''
        // }
        numberClicked.push(key.dataset.key)
        input.value += key.innerHTML
    }

    console.log(numberClicked)
    changeResult()
}



//  Float Sign

floatSign.addEventListener('click', () => {
    if (numberClicked.length == []) {
        numberClicked.push(0)
        numberClicked.push('.')
    }
    if (!numberClicked.includes('.')) {
        numberClicked.push('.')
    }
    changeResult()
})



//  Back Button

backBtn.addEventListener('click', () => {
    deleteLastNumber()
    changeResult()
})

function deleteLastNumber () {
    numberClicked.pop()
    input.value = numberClicked.join('')
}



//  Clear All Function

clearBtn.addEventListener('click', () => {
    numberClicked = []
    input.value = numberClicked
    changeResult()
    result.style.fontSize = '30px'
    input.style.fontSize = '25px'
})



//  Change Result Function

function changeResult () {
    if (numberClicked.join('')) {
        let resultJoin = numberClicked.join('')
        let resultCalc = eval(resultJoin)
        result.innerHTML = `= ${resultCalc.toLocaleString()}` 
    }
    else {
        result.innerHTML = `= 0`
    }
}



//  Equals Button

equalsBtn.addEventListener('click', () => {
    changeResult()
    result.style.fontSize = '35px'
    input.style.fontSize = '16px'
})