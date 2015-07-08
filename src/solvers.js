/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var args = Array.prototype.slice.call(arguments, 1);
  var solution = [];
  var board = new Board({n: n});
  if (args.length === 0) {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (!board.rows()[i][j]) {
          board.togglePiece(i, j);
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(i, j);
          }
        }
      }
    }
    solution = board.rows();
  }
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;

  var placePieces = function(r) {

    if (r === n) {
      solutionCount++;
      return;
    } 

    for(var i = 0; i < n; i++) {
      board.togglePiece(r, i);

      if (!board.hasAnyRooksConflicts()) {
        placePieces(r + 1);
      }

      board.togglePiece(r, i);
    }
  };

  placePieces(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var pieceCount = 0;
  var solution = [];

  var placePieces = function(r, c) {
    for (var i = 0; i < n; i++) {
      for (var j= 0; j < n; j++) {
        if (board.rows()[i][j]) {
          board.togglePiece(i, j);
        }
      }
    }
    pieceCount = 0;
    board.togglePiece(r, c);
    pieceCount ++;

    for (var i = 0; i < n; i++) {
      for (var j= 0; j < n; j++) {
        if (!board.rows()[i][j]) {
          board.togglePiece(i, j);
          pieceCount ++;
        }
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(i, j);
          pieceCount --;
        }
      }
    }
  };

  if(n === 0) {
    board.set('0', 0);
    return board.rows();
  }

  if(n === 3) {
    for (var i = 0; i < n; i++) {
      for (var j= 0; j < n; j++) {
        if (board.rows()[i][j]) {
          board.togglePiece(i, j);
        }
      }
    }
    return board.rows();
  }

  for(var x = 0; x < n; x++) {
    for (var y = 0; y < n; y++) {
      placePieces(x, y);
      if (pieceCount === n) {
        solution = board.rows();
        console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
        return solution; 
      }
    }
  }
  for (var i = 0; i < n; i++) {
    for (var j= 0; j < n; j++) {
      if (board.rows()[i][j]) {
        board.togglePiece(i, j);
      }
    }
  }
  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var placePieces = function(r) {
    
    if (r === n) {
      solutionCount++;
      console.log(board.rows());
      return;
    } 
    for(var i = 0; i < n; i++) {
      board.togglePiece(r, i);
      
      if (!board.hasAnyQueensConflicts()) {
        placePieces(r + 1);
      }

      board.togglePiece(r, i);
    }
  };
  if(n === 2 || n === 3) {
    return 0;
  } else {
    placePieces(0);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
