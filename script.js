function boom() {
    alert("BOOM")
}

let list_for_calculation = []
let display_screen = document.getElementById("display_screen")

function display(number) {
    display_screen.innerText += number
}


function delete_number() {
    display_screen.innerText = display_screen.innerText.slice(0, -1)
}



function push_operator(operator) {
    temp1 = display_screen.innerText
    operator = operator
    list_for_calculation = [temp1, operator]
    // console.log(list_for_calculation)
    display_screen.innerText = ''
    // return list_for_calculation
}



function verifier() {
    console.log(list_for_calculation)
}


function AC() {
    display_screen.innerText = ''
    list_for_calculation = []
}




console.log('\n\n')
let add = (a, b) => a + b
let substract = (a, b) => a - b
let multiply = (a, b) => a * b
let divide = (a, b) => a / b
let power = (a, b) => a ** b
function calculate() {
    // function calculate(fonctionOperation, nombre1, nombre2) {


    // si rien dans list for calculation
    if (list_for_calculation[0] == '' && (list_for_calculation[1] != '+' && list_for_calculation[1] != '-' && list_for_calculation[1] != '*' && list_for_calculation[1] != '/')) {
        result = ''
        return result
    }

    // si aucun chiffre et on commence direct avec un operateur, genre pour faire le moins
    if (list_for_calculation[0] == '') {
        list_for_calculation[0] = 0
    }




    fonctionOperation = list_for_calculation[1]
    nombre1 = list_for_calculation[0]
    nombre1 = parseFloat(nombre1)
    nombre2 = display_screen.innerText
    nombre2 = parseFloat(nombre2)
    display_screen.innerText = ''


    if (fonctionOperation == '+') {
        fonctionOperation = add
    }
    if (fonctionOperation == '-') {
        fonctionOperation = substract
    }
    if (fonctionOperation == '*') {
        fonctionOperation = multiply
    }
    if (fonctionOperation == '/') {
        fonctionOperation = divide
    }
    if (fonctionOperation == '^') {
        fonctionOperation = power
    }

    switch (fonctionOperation) {
        case add:
            result = add(nombre1, nombre2)
            break;
        case substract:
            result = substract(nombre1, nombre2)
            break;
        case multiply:
            result = multiply(nombre1, nombre2)
            break;
        case divide:
            (nombre2 != 0 ? result = divide(nombre1, nombre2) : result = "Division par zero impossible")
            // if (nombre2 == 0) result = "Division par zero impossible"
            // result =  divide(nombre1, nombre2)
            break;
        case power:
            result = power(nombre1, nombre2)
            break;
        default:
            result = "Nom d'opération invalide"
            break;
    }
    display_screen.innerText = result

    console.log(result)
    console.log(list_for_calculation)
    list_for_calculation[0] = ''
    list_for_calculation[1] = ''
    return result
}
