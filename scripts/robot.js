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

  // Evaluates the position and returns the quantative value
  static Evaluate() {
    let player = board.bitboard & Board.TurnMask ? Board.Crosses : Board.Naughts;
    let perspective = player == Board.Crosses ? 1 : -1;

    if (board.bitboard & Board.WinMask) {
      return 9999 * perspective;
    }

    let evaluation = 0;
    let playerBoard = player == Board.Crosses ? (board.bitboard & Board.CrossesMask) >> player : (board.bitboard & Board.NaughtsMask) >> player;
    let opponentBoard = player == Board.Crosses ? (board.bitboard & Board.NaughtsMask) >> Board.Naughts : (board.bitboard & Board.CrossesMask) >> Board.Crosses;

    if (playerBoard & 0b000010000) {
      evaluation -= 20;
    } else if (opponentBoard & 0b000010000) {
      evaluation += 20;
    }

    if (playerBoard & 0b101000101) {
      evaluation -= 5;
    } else if (opponentBoard & 0b101000101) {
      evaluation += 5;
    }

    return evaluation;
  }

  static Search(depth = 0, alpha = Number.NEGATIVE_INFINITY, beta = Number.POSITIVE_INFINITY, bestMove) {
    if (depth == 0) {
      return this.Evaluate();
    }

    let moves = this.GenerateMoves() || [];

    // For draws (normal x and os) or wins (3 move rule)
    if (moves.length == 0) {
      if (board.bitboard & Board.WinMask) return -9999 - depth;

      return 0;
    }
    
    bestMove.best = moves[0];

    for (const move of moves) {
      board.makeMove(move);
      let evaluation = -this.Search(depth - 1, -beta, -alpha, {best: 0});
      board.unmakeMove();
      
      // Move is too good, opponent will avoid this position
      if (evaluation >= beta) {
        return beta;
      }
      if (evaluation > alpha) {
        alpha = evaluation;
        bestMove.best = move;
      }
    }

    return alpha;
  }

  static MakeMove() {
    let bestMove = {
      best: 0
    };
    console.log(Robot.Search(12, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, bestMove));
    board.makeMove(bestMove.best);
  }
}