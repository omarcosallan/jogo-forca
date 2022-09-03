const words = ['JAVA', 'PHP', 'PHYTON', 'JAVASCRIPT'];
const wrongLetters = [];
const rightLetters = [];

function board(word) {
    let board = document.getElementById('palavra');
    board.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        board.innerHTML += '<span></span>';
    }
}

function secretWord() {
    return words[Math.floor(Math.random() * words.length)]; // retorna palavra secreta
}

function isLetter(code) {
    return code >= 97 && code <= 122 ? true : false;
}

document.getElementById('iniciar-jogo').addEventListener('click', function() {
    board(secretWord());
    addEventListener('keypress', function(e) {
        console.log(e.keyCode);
        console.log(isLetter(e.keyCode));
    })
})