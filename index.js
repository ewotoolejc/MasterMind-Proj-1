	/*----- constants -----*/
// const colors = {
//     '0' : 'white',
//     '1' : 'red',
//     '2' :  'black',
//     '3' : 'gold',
// };

const colors = ['white', 'rgb(154, 27, 47)', 'black', 'rgb(168, 146, 98)'];


	/*----- state variables -----*/
let board;
let winner;
let currentColorIndex = -1;
let countButtonEnterClicks = 0;
let chkGuess;

	/*----- cached elements  -----*/
const divs = [...document.querySelectorAll('div')];
// const h2 = document.querySelector('h2');


	/*----- event listeners -----*/
const plyAgn = document.getElementById('Reset').addEventListener('click', init);
document.querySelector('board').addEventListener('click', (evt) => {
    const idx = divs.indexOf(evt.target);
    if (idx === -1) return;
    const nextColorIndex = ++currentColorIndex % colors.length;
     evt.target.style.backgroundColor = colors[nextColorIndex];
});

const enter = document.getElementById('Enter').addEventListener('click', () => {
    board.forEach(function(pegVal, idx) {
        const pegEl = document.getElementById(`sq-${idx}`);
        let col = pegEl.style.backgroundColor;
        console.log(col);
        board[idx] = colors.indexOf(col);
    });
    if (countButtonEnterClicks === 0) {
    rowMv = boardMvGen(board, 4);
   let chkGuess = rowMv.next();
   countButtonEnterClicks += 1;
   console.log(chkGuess);
   return chkGuess;
            // rowMv.next());
    // return rowMv.next();
    } 
    else if (countButtonEnterClicks >= 1){
    let chkGuess = rowMv.next();
    countButtonEnterClicks += 1;
    console.log(chkGuess);
    return chkGuess;
            // rowMv.next());
    // // return rowMv.next() ;
    }
});

	/*----- functions -----*/
init();

function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ;
// [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    // [null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],
    // [[0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
// ]
winner = null;
render();
};

function render() {
    renderBoard();
}
    
function renderBoard() {
    board.forEach(function(pegVal, idx) {
    const pegEl = document.getElementById(`sq-${idx}`);
    pegEl.style.backgroundColor = colors[pegVal]; 
    });
}


const getCompAnswer = () => {
    const choices = [];
    for (let i = 0; i < 4; i++) {
    choices.push(Math.floor(Math.random() * 3 + 1));
    }
    return choices;
};

let compChoice = getCompAnswer();
console.log(compChoice);

function* boardMvGen(board, rowSize) {
    for (let index = 0; index < board.length; index += rowSize) {
    yield board.slice(index, index + rowSize);
    }
}

let rowMv = boardMvGen;