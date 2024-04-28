class Board {
  // Static variables to help represent game state
  // Allow for easy padding offsets
  static Naughts = 10;
  static Crosses = 1;
  
  // Bitwise masks for game state checking
  static TurnMask = 0b00000000000000000001;
  static WinMask = 0b10000000000000000000;
  static CrossesMask = 0b00000000001111111110;
  static NaughtsMask = 0b01111111110000000000;
  static WinConditionMasks = [
    0b100100100,
    0b010010010,
    0b001001001,
    0b111000000,
    0b000111000,
    0b000000111,
    0b100010001,
    0b001010100
  ];

  constructor() {
    // Refer to masks to determine what each bit represents
    this.bitboard = 0b00000000000000000000;

    // The 3 move rule
    this.twist = false;
  }

  // Converts the bitboard to a visual grid (array)
  toGrid() {
    let grid = [];

    // Separates out the player boards from main bitboard
    let crossesBoard = (this.bitboard & Board.CrossesMask) >> Board.Crosses;
    let naughtsBoard = (this.bitboard & Board.NaughtsMask) >> Board.Naughts;

    for (let index = 0; index < BOARD_SIZE; index++) {
      // Checks the bitboards
      if (crossesBoard & (1 << index)) {
        grid.push('X');
        continue;
      }
      if (naughtsBoard & (1 << index)) {
        grid.push('O');
        continue;
      }
      grid.push(' ');
    }

    return grid;
  }

  // Displays the bitboard as a grid
  display() {
    let grid = this.toGrid();
    console.log(` 
       ${grid[0]} | ${grid[1]} | ${grid[2]}
      ---+---+---
       ${grid[3]} | ${grid[4]} | ${grid[5]}
      ---+---+---
       ${grid[6]} | ${grid[7]} | ${grid[8]}
    `);

    for (let i = 0; i < grid.length; i++) {
      let text = document.getElementById(`cellText${i}`);
      text.innerHTML = grid[i];
    }
  }

  // Logs the bitboard in the console as a string to visualise the board
  printBitboard(bitboard) {
    console.log(bitboard.toString(2).padStart(BOARD_SIZE, '0'));
  }

  setCell(index, player) {
    // Prevents cells from being changed if the game has been won
    if (this.bitboard & Board.WinMask) return;

    let binaryRepresentation = 1 << (player + index);
    let oppositionRepresentation = player == Board.Naughts ? 1 << (Board.Crosses + index) : 1 << (Board.Naughts + index);

    // Doesn't allow setting of bitboard if there is a symbol already there
    if (this.bitboard & binaryRepresentation || this.bitboard & oppositionRepresentation) return;

    this.bitboard |= binaryRepresentation;
    this.alternateTurn();
  }

  unsetCell(index, player) {
    this.bitboard &= ~(1 << (player + index));
  }

  alternateTurn() {
    this.bitboard ^= Board.TurnMask;
  }

  makeTurn(index) {
    let player = this.bitboard & Board.TurnMask ? Board.Naughts : Board.Crosses;
    this.setCell(index, player);
    this.display();
    this.checkWinCondition(player)
  }

  // Checks for a win condition 
  // If true, the left most bit will be 1 and the bit next to it will represent who won
  checkWinCondition(player) {
    // Player mask
    let playerMask = player == Board.Naughts ? Board.NaughtsMask : Board.CrossesMask;
    let playerBoard = (this.bitboard & playerMask) >> player;

    for (const mask of Board.WinConditionMasks) {
      if (Math.round(mask & playerBoard) == Math.round(mask)) {
        this.bitboard |= Board.WinMask;
        console.log("You WIN!");
        break;
      };
    }
  }
}