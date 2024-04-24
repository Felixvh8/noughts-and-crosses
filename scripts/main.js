// Initialising variables and constants
const BOARD_SIZE = 9;
let board;

// Calls the main function when the window loads
window.onload = function() {
  initialise();
}

function initialise() {
  // Sets up the divs and appends them with a class name 'cell' and unique id
  for (let i = 0; i < BOARD_SIZE; i++) {
    // Div element (cell)
    let div = document.createElement('div');
    div.addEventListener('click', () => {
      board.makeTurn(i);
    });
    div.id = `cell${i}`;
    div.classList.add('cell');

    // Text element within the div
    let p = document.createElement('p');
    p.id = `cellText${i}`;
    p.classList.add("cellText");

    // Appends the elements to eachother
    div.appendChild(p);
    document.getElementById("gameDiv").appendChild(div);
  }

  board = new Board();
  board.display();

  //main();
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