let words = ['JAVA', 'PHP', 'PYTHON', 'JAVASCRIPT'];
let wrongLetters = [];
let rightLetters = [];
let attempts;

const start = document.getElementById('iniciar-jogo');
let word = '';

const canvas = document.querySelector('canvas');
const brush = canvas.getContext('2d');
brush.strokeStyle = '#0A3871';
brush.lineWidth = 2;

const boardEl = document.getElementById('palavra');
const wrongLettersEl = document.getElementById('letras-erradas');

function clearArray(array) {
    while (array.length) {
        array.pop();
    }
    wrongLettersEl.innerHTML = '<span></span>';
}


function board(word) {
    boardEl.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        boardEl.innerHTML += '<span></span>';
    }
}

function secretWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function isLetter(code) {
    return code >= 97 && code <= 122;
}

function checkLetter(letter, word, spans) {
    if (word.includes(letter) && !rightLetters.includes(letter)) {
        checkRightLetters(rightLetters, word, letter, spans)
    } else if (!word.includes(letter) && !wrongLetters.includes(letter)) {
        checkWrongLetters(wrongLetters, wrongLettersEl, letter);
        return true;
    }
}

function checkRightLetters(arrayLetters, word, letter, spans) {
    arrayLetters.push(letter);
    for (let i = 0; i < word.length; i++) {
        if (word[i] == letter) {
            spans[i].textContent = letter;
        }
    }
}

function checkWrongLetters(arrayLetters, wrongLettersEl, letter) {
    arrayLetters.push(letter);
    wrongLettersEl.innerHTML = '';
    for (let i = 0; i < arrayLetters.length; i++) {
        wrongLettersEl.innerHTML += '<span>' + arrayLetters[i] + '</span>';
    }
}

function clearCanvas() {
    brush.clearRect(0, 0, 600, 300);
}

function drawGallows() {
    clearCanvas();

    brush.beginPath();
    brush.moveTo(200, 290);
    brush.lineTo(400, 290);
    brush.stroke();

    brush.beginPath();
    brush.moveTo(250, 290);
    brush.lineTo(250, 70);
    brush.lineTo(380, 70);
    brush.lineTo(380, 115);
    brush.stroke();
}

function drawHead() { 
    brush.beginPath();
    brush.arc(380, 135, 20, 0, Math.PI * 2);
    brush.stroke();
}

function drawLine(xStar, yStart, xFinal, yFinal) {
    brush.beginPath();
    brush.moveTo(xStar, yStart);
    brush.lineTo(xFinal, yFinal);
    brush.stroke();
}

function gallowsTest(attempts) {
    switch (attempts) {
        case 0:
            drawGallows();
            break;
        case 1:
            drawHead();
            break;
        case 2:
            drawLine(380, 155, 380, 210);
            break;
        case 3:
            drawLine(380, 155, 350, 175);
            break;
        case 4:
            drawLine(380, 155, 410, 175);
            break;
        case 5:
            drawLine(380, 210, 350, 230);
            break;
        case 6:
            drawLine(380, 210, 410, 230);
            break;
    }
}

start.addEventListener('click', function () {
    newGame();
    const spans = document.querySelectorAll('span');
    addEventListener('keypress', function (e) {
        if (isLetter(e.keyCode)) {
            const isWrong = checkLetter(e.key.toUpperCase(), word, spans);
            if (isWrong) {
                attempts++;
                gallowsTest(attempts);
            }
        }
    })
    start.addEventListener('click', function () {
        location.reload()
    })
})

function newGame() {
    start.innerText = 'Novo jogo';
    word = secretWord();
    board(word);
    drawGallows();
    attempts = 0;
}