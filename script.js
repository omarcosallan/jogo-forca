let words = ['JAVA', 'PHP', 'PYTHON', 'JAVASCRIPT'];
let wrongLetters = [];
let rightLetters = [];

const boardEl = document.getElementById('palavra');
const wrongLettersEl = document.getElementById('letras-erradas');

function board(word) {
    boardEl.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        boardEl.innerHTML += '<span></span>';
    }
}

function secretWord() {
    return words[Math.floor(Math.random() * words.length)]; // retorna palavra secreta
}

function isLetter(code) {
    return code >= 97 && code <= 122;
}

function checkLetter(letter, word, spans) {
    if (word.includes(letter) && !rightLetters.includes(letter)) {
        rightLetters.push(letter);
        for (let i = 0; i < word.length; i++) {
            if (word[i] == letter) {
                spans[i].textContent = letter;
            }
        }
    }
}

document.getElementById('iniciar-jogo').addEventListener('click', function () {
    const word = secretWord();
    board(word);
    wrongLetters.innerHTML = '';
    const spans = document.querySelectorAll('span');
    addEventListener('keypress', function (e) {
        if (isLetter(e.keyCode)) {
            checkLetter(e.key.toUpperCase(), word, spans);
        }
    })
})