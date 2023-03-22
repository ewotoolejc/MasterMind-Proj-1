	/*----- constants -----*/
const colors = ['white', 'rgb(154, 27, 47)', 'black', 'rgb(168, 146, 98)', 'rgb(246, 196, 146)', 'rgb(93, 20, 34)', 'rgb(148, 227, 208)'];
const colorNames = [null, 'Red', 'Black', 'Gold', 'Peach', 'Maroon', 'Mint Green'];

	/*----- state variables -----*/
let board;
let currentColorIndex = -1;
let countButtonEnterClicks;
let compChoice;
let brdRowOpn = boardOpenGen;
let rowDivsForChk;
let rowMv = boardMvGen;


	/*----- cached elements  -----*/
const divs = [...document.querySelectorAll('div')];
const h1 = document.querySelector('h1');
const gif = document.querySelector('gif');
const brd = document.querySelector('main');
const clse = document.getElementById('close');
const howto = document.getElementById('howto');
const howToOpen = document.getElementById("howtodisplay");
const solution = document.getElementById("winningcombo");

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
    board[idx] = colors.indexOf(col);
    });
    getWinner();
});

howToOpen.addEventListener("click", () => {
    howToOpen.style.visibility = "hidden";
    howto.style.visibility = "visible";
    clse.style.visibility = "visible";
});

clse.addEventListener("click", () => {
    howto.style.visibility = "hidden";
    clse.style.visibility = "hidden";
    howToOpen.style.visibility = "visible";
});

	/*----- functions -----*/
init();

function init() {
board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
brdRowOpn = boardOpenGen(divs, 4);
compChoice = getCompAnswer();
renderBoard();
h1.innerHTML = 'Can you win and become...the AUFC MasterMind???';
gif.innerHTML = '<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmEzYzdiMWI0ZWZjYzRjNDcyZmQ5MTJjODA2ZDdiZWI4MWQwYjQ4ZSZjdD1z/mnuJDb8D1EiMVHff7k/giphy.gif"></img>';
brd.classList.remove("blink-bg-win");
countButtonEnterClicks = 0;
openNextRow();
};
    
function renderBoard() {
    board.forEach(function(pegVal, idx) {
    const pegEl = document.getElementById(`sq-${idx}`);
    pegEl.style.backgroundColor = colors[pegVal];
    pegEl.style.borderColor = "black";
    });
}

function* boardOpenGen(divs, rowSize) {
    for (let index = 0; index < divs.length; index += rowSize) {
    yield divs.slice(index, index + rowSize);}
}

function openNextRow() {
    let row = brdRowOpn.next();
    row.value.forEach(div => {
        div.style.pointerEvents = "auto";
    });
    rowDivsForChk = row;
}

console.log(compChoice);

function getCompAnswer() {
    const choices = [];
    for (let i = 0; i < 4; i++) {
    choices.push(Math.floor(Math.random() * 6 + 1));
    }
    return choices;
};

function* boardMvGen(board, rowSize) {
    for (let index = 0; index < board.length; index += rowSize) {
    yield board.slice(index, index + rowSize);}
}

function chkGuess() {
    if (countButtonEnterClicks === 0) {
    rowMv = boardMvGen(board, 4);
   let guess = rowMv.next();
   countButtonEnterClicks += 1;
   console.log(guess);
   return guess;
    } else if (countButtonEnterClicks >= 1){
    let guess = rowMv.next();
    countButtonEnterClicks += 1;
    console.log(guess);
    return guess;};
};

const equalsCheck = (pg, ca) =>
    pg.every((num, i) => num === ca[i]);

function checkColorIncSeq(pg, ca) {
    const numMatch = [];
    const idxColMatch = [];
    pg.forEach((num, i) => {
        if (num === ca[i]) {
        idxColMatch.push(i);
        } else if (ca.includes(num)) {
        numMatch.push(num);
        } else return;
        }); 
        const pegElsForChk = [...rowDivsForChk.value];
        pegElsForChk.forEach((div, idx) => {
            if (idxColMatch.includes(idx)) {
                div.style.borderColor = "green";
            } else if (numMatch.includes(colors.indexOf(div.style.backgroundColor))) {
                div.style.borderColor = "yellow";};
    });
};

const colNameArr = compChoice.map(num => colorNames[num]);

function getWinner() {
    const plyrGuess = chkGuess();
    equalsCheck(plyrGuess.value, compChoice);
    if (equalsCheck(plyrGuess.value, compChoice) === true) {
        checkColorIncSeq(plyrGuess.value, compChoice);
        h1.innerText = 'Tito loved that, You Win!!!'
        gif.innerHTML = '<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI2YzNjYTFhMjhlMzRhNmQwYmVlZGQ1OTEzOTJiNzg5ZjMxY2M2NiZjdD1n/5z9NwuPkZnvvm42Md0/giphy.gif"></img>';
        brd.classList.add("blink-bg-win");
    } else if (equalsCheck(plyrGuess.value, compChoice) === false && countButtonEnterClicks === 6) {
        h1.innerText = 'You LOSE!!';
        solution.innerHTML = `The solution was <span id=${colNameArr[0]}>${colNameArr[0]}</span>`;
        gif.innerHTML = '<img src="https://media2.giphy.com/media/10h8CdMQUWoZ8Y/giphy.gif?cid=ecf05e4797e9jcwd53tgxv550qd6ni1tiwelxj0yhxekpbyc&rid=giphy.gif&ct=g/"></img>';
    } else {
        checkColorIncSeq(plyrGuess.value, compChoice);
        h1.innerText = "Miles says: Not this time! Try Again!";
        gif.innerHTML = '<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzhlYWYzNWVjYTAwNzgzMTUzNjQ2OGJjYTVjZTBlYmY2ZGMzOWJjOCZjdD1n/snRsotHB9HZVUyRYfT/giphy.gif"></img>';
        openNextRow();
    }
};
