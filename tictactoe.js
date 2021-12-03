const readline = require('readline-sync');
const UNMARKED_SPACE = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_SCORE = 5;

function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}.`);

  console.log("");
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
}

function createNewBoard() { //Initializing board to be all blank spaces
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = UNMARKED_SPACE;
  }

  return board;

}

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function joinOr(array, punc = ", ", beforeLastNum = " or ") {
  if (array.length === 0) return '';
  if (array.length === 1) return array;

  return array.slice(0, array.length - 1).join(punc) +
                                       beforeLastNum +
                                       array[array.length - 1];

}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === UNMARKED_SPACE);
   //returns an array based off keys that = ' ' in createNewBoard ([1,3,4...])
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square: ${joinOr(emptySquares(board))}`);
    square = readline.question().trim();

    if (emptySquares(board).includes(square)) break;

    prompt('Invalid choice');

  }
  board[square] = HUMAN_MARKER; //return not needed due to pass by reference distructive change
}

function computerChoosesSquare(board) {
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  let square = emptySquares(board)[randomIndex];

  board[square] = COMPUTER_MARKER;
}

function boardFull(board) { //if array from emptySquares has no elements
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  let winningLines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], //rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], //columns
    [1, 5, 9], [3, 5, 7]             //diagonals
  ];

  for (let line = 0; line < winningLines.length; line++) {
    let [ sq1, sq2, sq3 ] = winningLines[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }

  return null;
}

function someoneWon(board) {
  return !!detectWinner(board);
}


while (true) { //new game loop
  let board = createNewBoard();

  while (true) { //turn loop
    displayBoard(board);

    playerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;

    computerChoosesSquare(board);
    displayBoard(board);

    if (someoneWon(board) || boardFull(board)) break;
  }

    displayBoard(board);

  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
  } else {
    prompt('TIE GAME');
  }

  prompt('Would you like to play again? (y/n)');
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y') break;
}

prompt('Thanks for playing Tic-Tac-Toe!');