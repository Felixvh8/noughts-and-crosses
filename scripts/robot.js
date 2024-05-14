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

  // Performance test for move generation
  static Perft(depth = 0) {
    let moves = this.GenerateMoves();

    // Move generation shortcut to increase depth with less processing
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
    let player = board.bitboard & Board.TurnMask ? Board.Crosses : Board.Naughts;
    let perspective = player == Board.Crosses ? 1 : -1;

    if (this.bitboard & Board.WinMask) {
      return 10000 * perspective;
    }

    return 0;
  }

  static Search(depth = 0) {
    let tempBitboard = board.bitboard;
    if (depth == 0) {
      return this.Evaluate();
    }

    let moves = this.GenerateMoves() || [];

    // For draws (normal x and os) or wins (3 move rule)
    if (moves.length == 0) {
      return -10000;
    }

    let bestEvaluation = -100000;

    for (const move of moves) {
      board.makeMove(move);
      let evaluation = -this.Search(depth - 1);
      bestEvaluation = Math.max(bestEvaluation, evaluation);
      board.unmakeMove();
      //board.bitboard = tempBitboard;
    }

    return bestEvaluation;
  }

  static MakeMove() {
    let moves = Robot.GenerateMoves() || [];
    let index = Math.floor(moves.length * Math.random());
    board.makeMove(moves[index]);
  }
}