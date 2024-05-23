// Initialising variables and constants
const BOARD_SIZE = 9;
const AI_FLAG = "AINoughtsAndCrosses";
let aiStatus = localStorage.getItem(AI_FLAG);
let aiStatusBool = aiStatus == "On" ? true : false;
let board;
let timerID;

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
      board.makeMove(i);

      if (!board.aiActive) return;
      if (board.bitboard & Board.TurnMask > 0.5 && board.humanIsCrosses || board.bitboard & Board.TurnMask < 0.5 && !board.humanIsCrosses) {
        setTimeout(Robot.MakeMove, 100);
      }
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

  board = new Board(true, aiStatusBool);
  board.display();
}

function start() {
  startTime = performance.now();
};

function end() {
  endTime = performance.now();
  let timeDiff = endTime - startTime; //in ms
  
  return Math.round(timeDiff) + " milliseconds";
}

function PerformanceSearch(depth = 1) {
  start();
  console.log("Evaluation: " + Robot.Search(depth, Math.NEGATIVE_INFINITY, Math.POSITIVE_INFINITY, {best: 0}));
  return end();
}

function computerVsComputer() {
  timerID = setInterval(Robot.MakeMove, 1000);
}