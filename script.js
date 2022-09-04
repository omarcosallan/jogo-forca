let words = ['JAVA', 'PHP', 'PYTHON', 'JAVASCRIPT']; // palavras
let wrongLetters = [];
let rightLetters = [];

const canvas = document.querySelector('canvas'); // canvas
const brush = canvas.getContext('2d');
brush.strokeStyle = '#0A3871';
brush.lineWidth = 2;

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
        checkRightLetters(rightLetters, word, letter, spans)
    } else if (!word.includes(letter) && !wrongLetters.includes(letter)) {
        checkWrongLetters(wrongLetters, wrongLettersEl, letter);
        return true;
    }
}

function checkRightLetters(arrayLetters, word, letter, spans) { // checa letras corretas
    arrayLetters.push(letter);
    for (let i = 0; i < word.length; i++) {
        if (word[i] == letter) {
            spans[i].textContent = letter;
        }
    }
}

function checkWrongLetters(arrayLetters, wrongLettersEl, letter) { // checa letras errdas
    arrayLetters.push(letter);
    wrongLettersEl.innerHTML = '';
    for (let i = 0; i < arrayLetters.length; i++) {
        wrongLettersEl.innerHTML += '<span>' + arrayLetters[i] + '</span>';
    }
}

function clearCanvas() {
    brush.clearRect(0, 0, 600, 300);
}

//function desenha froca
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

function drawLine(xStar, yStart, xFinal, yFinal) { // desenhas braços, pernas e corpo
    brush.beginPath();
    brush.moveTo(xStar, yStart);
    brush.lineTo(xFinal, yFinal);
    brush.stroke();
}

function gallowsTest(attempts) { // testa quantidade de erros e desenha elemento da forca
    switch (attempts) {
        case 0:
            drawGallows();
            break;
        case 1:
            drawHead(); // cabeça
            break;
        case 2:
            drawLine(380, 155, 380, 210);   // corpo
            break;
        case 3:
            drawLine(380, 155, 350, 175);   // braço esquerdo
            break;
        case 4:
            drawLine(380, 155, 410, 175);   // braço direito
            break;
        case 5:
            drawLine(380, 210, 350, 230);   // perna esquerda
            break;
        case 6:
            drawLine(380, 210, 410, 230);   // perna direita
            break;
    }
}

document.getElementById('iniciar-jogo').addEventListener('click', function () {
    const word = secretWord();
    board(word);
    drawGallows();
    wrongLetters.innerHTML = '';
    const spans = document.querySelectorAll('span');
    let attempts = 0; // chances
    addEventListener('keypress', function (e) {
        if (isLetter(e.keyCode)) {
            const isWrong = checkLetter(e.key.toUpperCase(), word, spans);
            if (isWrong) {
                attempts++;
                gallowsTest(attempts);
            }
        }
    })
})