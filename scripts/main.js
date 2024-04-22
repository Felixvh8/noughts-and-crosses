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

  main();
}

function main() {
  const newIndex = prompt("Where to place your turn?");
  if (board.bitboard & Board.TurnMask) {
    board.setCell(parseInt(newIndex), Board.Naughts);
  } else {
    board.setCell(parseInt(newIndex), Board.Crosses);
  }

  board.alternateTurn();
  board.display();
  if (board.bitboard & Board.WinMask) return;
  main();
}