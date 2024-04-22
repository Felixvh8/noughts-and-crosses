// Initialising variables and constants
const BOARD_SIZE = 9;
let board;

// Calls the main function when the window loads
window.onload = function() {
  initialise();
  main();
}


function initialise() {
  board = new Board();
  board.display();
}

function main() {
  
}