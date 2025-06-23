let displayTop = document.getElementById("display_screen_top")
let displayBottom = document.getElementById("display_screen_bottom")
let equal_pushed = false

function AC() {
    displayTop.innerText = ''
    displayBottom.innerText = ''
}

function addElement(element) {
    // Verification du dernier element pour éviter doublon de .
    let dernierCaractere = displayTop.innerText.slice(-1);
    // console.log(`dernier caractere avant insertion ${dernierCaractere}`)
    if (element == '.' && dernierCaractere == '.') {
        return
    }
    // Verification du dernier element et ajout d'un zero devant le . si l'utilisateur entre un .
    if (element == '.' && dernierCaractere == ('' || '+' || '-' || 'x' || '^')) {
        element = '0.'
    }
    if (element === 'del') {
        displayTop.innerText = displayTop.innerText.slice(0, -1);
        displayBottom.innerText = ''
        return
    }
    // Supprimer displayTop et redemarrer a zero si equal a été activé
    if (equal_pushed == true) {
        displayTop.innerText = ''
        equal_pushed = false
    }
    // Pour faire clignoter l'ecran quand j'atteint la limite de 24 caracteres dans displayTop
    if (displayTop.innerText.length >= 24) {
        // console.log("Trop de caractères !");
        const container = document.getElementById("display_screen_container");
        container.classList.add("ring-4", "ring-red-500");
        setTimeout(() => {
            container.classList.remove("ring-4", "ring-red-500");
        }, 300);
        return;
    }
    // if (displayTop.innerText.length >= 30) {
    //     console.log("Trop de caractères !");
    //     return;
    // }
    let numberOperators = (displayTop.innerText.match(/[+\-x/^]/g) || []).length;
    displayTop.innerText += element
    if (numberOperators >= 1) {
        let expression = displayTop.innerText.replace(/x/g, '*').replace(/\^/g, '**').replace(/%/g, '/100');
        try {
            let result_in_addElement = eval(expression);
            result_in_addElement = Number(result_in_addElement).toPrecision(8)
            // result_in_addElement = parseFloat(result_in_addElement.toFixed(8))
            displayBottom.innerText = result_in_addElement;
            // En cas d'erreur
            archiveLastWorkingElement = result_in_addElement;
        } catch (e) {
            console.log("Erreur en cours")
            displayBottom.innerText = archiveLastWorkingElement;
            // displayBottom.innerText = 'Erreur';
        }
    }
}

function addOperator(operator) {
    // Verification du dernier element pour ne pas ajouter plusieurs opérateurs en même temps.
    let dernierCaractere = displayTop.innerText.slice(-1);
    // console.log(`dernier caractere avant insertion ${dernierCaractere}`)
    if (operator != '-' && ['', '+', '-', 'x', '^'].includes(dernierCaractere)) {
        // if (dernierCaractere == ('' || '+' || '-' || 'x' || '^')) {
        return
    }
    if (operator == '-' && ['-'].includes(dernierCaractere)) {
        // if (dernierCaractere == ('' || '+' || '-' || 'x' || '^')) {
        return
    }
    // annuler le redemarrage a zero si on appuie sur un operateur apres avoir appuyé sur zero
    if (equal_pushed == true) {
        equal_pushed = false
    }
    displayTop.innerText += operator
}

function equal() {
    if (displayBottom.innerText !== '') {
        displayTop.innerText = displayBottom.innerText;
        displayBottom.innerText = '';
        // Pour redemarrer un nouveau calcul si le prochain bouton pressé est un element
        // Et continuer si le prochain bouton est un opérateur
        equal_pushed = true
    }
}
