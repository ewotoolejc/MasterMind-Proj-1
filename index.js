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
h2.innerHTML = 'Can you win and become...the MasterMind???'
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

const compChoice = getCompAnswer();
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

const equalsCheck = (pg, ca) =>
    pg.every((v, i) => v === ca[i]);

function checkColorInc(pg, ca) {
const numMatch = [];
pg.forEach(num => {
    if (ca.includes(num)) {
        numMatch.push(num);
        } else return;
    });
    console.log(numMatch);    
    board.forEach(function(pegVal, idx) {
        const pegEl = document.getElementById(`sq-${idx}`);
        console.log(pegVal);
        if (numMatch.includes(pegVal)) {
            pegEl.style.borderColor = "green";
        } else return;
    });
};

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

function getWinner() {
    const plyrGuess = chkGuess();
    equalsCheck(plyrGuess.value, compChoice);
    if (equalsCheck(plyrGuess.value, compChoice) === true) {
        h2.innerHTML = 'You win!!!'
    } else if (equalsCheck(plyrGuess.value, compChoice) === false && countButtonEnterClicks === 6) {
        h2.innerHTML = '<img src="https://www.mustang6g.com/forums/attachments/you-lose-good-day-sir-gif-7-gif.461102/"></img>';
    } else {
        checkColorInc(plyrGuess.value, compChoice);
        h2.innerHTML = 'Nah, try again';  
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

//semi working below minus last in array:
// function equalsCheck(pg, ca) {
//     console.log(pg);
//     console.log(ca);
//     let result = null;
//     for (let i = 0; i < pg.length; i++)
//         if (pg[i] !== ca[i]) {
//         result = false;
//         } else {
//         result = true;
//         }
//     console.log(result)
//     return result;
// };
//works for all but first in array
  // function equalsCheck(a, b) {
    //     console.log(a);
    //     console.log(b);
    //     for (let i = 0; i < a.length; i++) {
    //         if (a[i] !== b[i]) {
    //         return false;
    //         } else {
    //         return true;
    //         }
    //     }
    // }
