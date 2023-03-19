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
let currentColorIndex = -1;
let countButtonEnterClicks = 0;


	/*----- cached elements  -----*/
const divs = [...document.querySelectorAll('div')];
const h2 = document.querySelector('h2');


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
       // console.log(col);
    board[idx] = colors.indexOf(col);
    });
    getWinner();
});


	/*----- functions -----*/
init();

function init() {
board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ;
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

function chkGuess() {
    if (countButtonEnterClicks === 0) {
    rowMv = boardMvGen(board, 4);
   let guess = rowMv.next();
   countButtonEnterClicks += 1;
   console.log(guess);
   return guess;
   // rowMv.next());
    // return rowMv.next();
    } 
    else if (countButtonEnterClicks >= 1){
    let guess = rowMv.next();
    countButtonEnterClicks += 1;
    console.log(guess);
    return guess;
                // rowMv.next());
    // // return rowMv.next() ;
    }
};

function equalsCheck(pg, ca) {
    let result = null;
    for (let i = 0; i < ca.length; i++)
    if (pg[i] !== ca[i]) {
    return false;
    } else {
    return true;
    }
    return result;
};

function getWinner() {
    let plyrGuess = chkGuess();
    let winner = equalsCheck(plyrGuess.value, compChoice);
    console.log(winner);
    if (winner === true) {
        h2.innerHTML = 'You win!!!'
    // } if (cGuess[0] === compChoice[0]) {
    //     h2.innerHTML = 'You got postiion 1 right but try again!';  
    // }
    //  if (chkGuess[1] === compChoice[1]) {
    //     h2.innerHTML = 'You got postiion 2 right but try again!'
    // } if (chkGuess[2] === compChoice[2]) {
    //     h2.innerHTML = 'You got postiion 3 right but try again!'
    // } if (chkGuess[3] === compChoice[3]) {
    //     h2.innerHTML = 'You got postiion 2 right but try again!'
    // }
    } else {
        h2.innerHTML = 'Nah'
    }
}


// recursion study for comparing all values
// const c = [1, 2, 3]
// const d = [2, 2, 3]

// const equalsCheck = (a, b) => {
//     const keys = Object.keys(a);
//     return keys.every(k => equalsCheck(a[k], b[k]));
// };

// if (equalsCheck(c, d))
//     console.log("The arrays have the same elements.");
// else
//     console.log("The arrays have different elements.");

// const equalsCheck = (a, b) => {
//     const keys = Object.keys(a);
//     return keys.every(k => equalsCheck(a[k], b[k]));
// };
// let winner = equalsCheck(plyrGuess.value, compChoice);

// function equalsCheck(a, b) {
//     // check the length
//     if (a.length != b.length) {
//         return false;
//     } else {
//         let result = false;

//     //     // comparing each element of array 
//         for (let i = 0; i < a.length; i++) {

//             if (a[i] !== b[i]) {
//                 return false;
//             } else {
//                 result = true;
//             }
//         }
//         return result;
//     }
// }

// // Declaring arrays
// const a = [1, 2, 3];
// const b = [2, 2, 3];

// // Comparing both the arrays
// const result = equalsCheck(a, b);

// // If the result is true
// if (result)
//     console.log("The arrays have the same elements.");
// else
//     console.log("The arrays have different elements.");