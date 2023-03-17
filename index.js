	/*----- constants -----*/
const colors = {
    'null' : 'white',
    '1' : 'red',
    '2' :  'black',
    '3' : 'gold',
};


	/*----- state variables -----*/
let board;
let winner;


	/*----- cached elements  -----*/


	/*----- event listeners -----*/


	/*----- functions -----*/
init();

function init() {
board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    // [null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],
    // [null, null, null, null],

winner = null;
render();
};

const getCompAnswer = () => {
    const choices = [];
    for (let i = 0; i < 4; i++) {
    choices.push(Math.floor(Math.random() * 3 + 1));
    }
    return choices;
};

let compChoice = getCompAnswer();
console.log(compChoice);

let colorSelect(evt) {
    
}


function render() {
renderBoard();
}

function renderBoard() {
    board.forEach(function(pegVal, idx) {
      const pegEl = document.getElementById(`sq-${idx}`);
      pegEl.style.backgroundColor = colors[pegVal];
    });
}



