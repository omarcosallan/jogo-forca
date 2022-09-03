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