	/*----- constants -----*/
// const colors = {
//     'null' : 'white',
//     '1' : 'red',
//     '2' :  'black',
//     '3' : 'gold',
// };

const colors = ['white', 'red', 'black', 'gold'];


	/*----- state variables -----*/
let board;
let winner;


	/*----- cached elements  -----*/
const divs = [...document.querySelectorAll('div')];
const h2 = document.querySelector('h2');

	/*----- event listeners -----*/
document.getElementById('Enter').addEventListener('click', colorSelect(), false);

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

function render() {
    renderBoard();
    }
    
    function renderBoard() {
        board.forEach(function(pegVal, idx) {
          const pegEl = document.getElementById(`sq-${idx}`);
          pegEl.style.backgroundColor = colors[idx]; // <- update here!
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

// const setColor = n => {
//     const pegEl = document.getElementById(`sq-${idx}`);
//     pegEl.style.backgroundColor = colors[n];
// }

// function* getColor() {
//     for (let i = 0; i < colors.length; i ++) {
//       yield i;
//     }
// }


// function colorSelect(evt) {
// //    const num = parseInt(evt.target.id.replace('sq-', '')); 
//    const color = colors[getColor()];
//    console.log(color);
//    evt.target.style.backgroundColor = colors[color];
 
// }

// let currentColorIndex = -1;

// function colorSelect(evt) {
//     const nextColorIndex = ++currentColorIndex % colors.length;
//     console.log(nextColorIndex)
//     evt.target.backgroundColor = colors[nextColorIndex];
// }



function colorSelect(count = 0) {
    return function () {
        if (count < colors.length) {
        h2.style.color = colors[count];
        console.log(count);
        ++count;
      }
    }
  }