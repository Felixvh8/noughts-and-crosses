let iterationNum = 0;
class Robot {
  static GenerateMoves() {
    // Prevents moves from being generated if the game has been won
    if (board.bitboard & Board.WinMask) return;

    let legalMoves = [];
    let player = board.bitboard & Board.TurnMask ? Board.Noughts : Board.Crosses;

    for (let index = 0; index < BOARD_SIZE; index++) {
      let binaryRepresentation = 1 << (player + index);
      let oppositionRepresentation = player == Board.Noughts ? 1 << (Board.Crosses + index) : 1 << (Board.Noughts + index);

      // Doesn't allow setting of bitboard if there is a symbol already there
      if (board.bitboard & binaryRepresentation || board.bitboard & oppositionRepresentation) continue;

      legalMoves.push(index);
    }

    return legalMoves;
  }

  static Perft(depth = 0) {
    let moves = this.GenerateMoves();

    if (depth == 1) {
      return moves ? moves.length : 1;
    }

    if (board.bitboard & Board.WinMask) return 1;

    let numberOfPositions = 0;

    for (const move of moves) {
      board.makeMove(move);
      numberOfPositions += this.Perft(depth - 1);
      board.unmakeMove();
    }

    return numberOfPositions;
  }

  static Evaluate() {
    
  }
}