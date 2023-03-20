	/*----- constants -----*/
    const colors = ['white', 'rgb(154, 27, 47)', 'black', 'rgb(168, 146, 98)', 'rgb(246, 196, 146)'];

	/*----- state variables -----*/
let board;
let currentColorIndex = -1;
let countButtonEnterClicks;
let compChoice;

	/*----- cached elements  -----*/
const divs = [...document.querySelectorAll('div')];
const h1 = document.querySelector('h1');
const gif = document.querySelector('gif');
const brd = document.querySelector('main');


	/*----- event listeners -----*/
const plyAgn = document.getElementById('Reset').addEventListener('click', init);

brd.addEventListener('click', (evt) => {
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
board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
compChoice = getCompAnswer();
render();
};

function render() {
    renderBoard();
    h1.innerHTML = 'Can you win and become...the MasterMind???';
    gif.innerHTML = '';
    brd.classList.remove("blink-bg-win");
    countButtonEnterClicks = 0;
}
    
function renderBoard() {
    board.forEach(function(pegVal, idx) {
    const pegEl = document.getElementById(`sq-${idx}`);
    pegEl.style.backgroundColor = colors[pegVal];
    pegEl.style.borderColor = "black";
    });
}

console.log(compChoice);

function getCompAnswer() {
    const choices = [];
    for (let i = 0; i < 4; i++) {
    choices.push(Math.floor(Math.random() * 4 + 1));
    }
    return choices;
};

// const compChoice = getCompAnswer();

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
            pegEl.style.borderColor = "yellow";
        } else return;
    });
};


function getWinner() {
    const plyrGuess = chkGuess();
    equalsCheck(plyrGuess.value, compChoice);
    if (equalsCheck(plyrGuess.value, compChoice) === true) {
        h1.innerText = 'You Win!!!'
        gif.innerHTML = '<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI2YzNjYTFhMjhlMzRhNmQwYmVlZGQ1OTEzOTJiNzg5ZjMxY2M2NiZjdD1n/5z9NwuPkZnvvm42Md0/giphy.gif"></img>';
        brd.classList.add("blink-bg-win");
    } else if (equalsCheck(plyrGuess.value, compChoice) === false && countButtonEnterClicks === 6) {
        h1.innerText = 'You LOSE!!';
        gif.innerHTML = '<img src="https://www.mustang6g.com/forums/attachments/you-lose-good-day-sir-gif-7-gif.461102/"></img>';
    } else {
        checkColorInc(plyrGuess.value, compChoice);
        h1.innerText = "Miles says: Nah";
        gif.innerHTML = '<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzhlYWYzNWVjYTAwNzgzMTUzNjQ2OGJjYTVjZTBlYmY2ZGMzOWJjOCZjdD1n/snRsotHB9HZVUyRYfT/giphy.gif"></img>';
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
