// Initialising variables and constants
const BOARD_SIZE = 9;
const AI_FLAG = "AINoughtsAndCrosses";
let aiStatus = localStorage.getItem(AI_FLAG);
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
      board.makeMove(i);
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

  // testEquals(9, Robot.Perft, 2);
  let result = Robot.Perft(2);
  console.log(result);
}

function testEquals(expectedOutput, functionToTest, argument) {
  let result = functionToTest(argument);
  console.log(`
    Expected to return ${expectedOutput}. Returned ${result}
  `);

  return result == expectedOutput;
}