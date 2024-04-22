class Board {
  // static variables to help represent game state
  // Allow for easy padding offsets
  static Naughts = 10;
  static Crosses = 1;
  
  // Bitwise masks
  static TurnMask = 0b000000000000000000001;
  static WinMask = 0b110000000000000000000;
  static CrossesMask = 0b000000000001111111110;
  static NaughtsMask = 0b001111111110000000000;

  constructor() {
    // Refer to masks to determine what each bit represents
    this.bitboard = 0b000000000000000000000;
  }

  // Converts the bitboard to a visual grid (array)
  toGrid() {
    let grid = [];

    // Separates out the the boards from main bitboard
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

  // Displays the bitboard as a grid (ugly code for now)
  display() {
    let grid = this.toGrid();
    console.log(` 
       ${grid[0]} | ${grid[1]} | ${grid[2]}
      ---+---+---
       ${grid[3]} | ${grid[4]} | ${grid[5]}
      ---+---+---
       ${grid[6]} | ${grid[7]} | ${grid[8]}
    `);
  }

  printBitboard() {
    console.log(this.bitboard.toString(2).padStart(BOARD_SIZE, '0'));
  }

  setCell(index, player) {
    this.bitboard |= 1 << (player + index);
  }

  unsetCell(index, player) {
    this.bitboard &= ~(1 << (player + index));
  }

  alternateTurn() {
    this.bitboard ^= 1;
  }
}