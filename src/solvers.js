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
  var placePieces = function() {
    var pieces = 0;
    _.each(board.rows(), function(row, r) {
      _.each(row, function(col, c) {
        if (!col) {
          board.togglePiece(r, c);
          pieces++;
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(r, c);
            pieces--;
          }
        }
      });
      solution = board.rows();
    });
    return pieces;
  };
  if (args.length > 0) {
    board.togglePiece(args[0], args[1]);    
  }
  
  placePieces();

  return solution;
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var pieceCount = 0;

  for(var i = 0; i < n; i++) {
    pieceCount = _.reduce(findNRooksSolution(n, 0, i), function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);
    if (pieceCount === n) {
      solutionCount++;
    }
  }

  // for(var i = n-1; i >= 0; i--) {
  //   pieceCount = _.reduce(findNRooksSolution(n, i, n-1), function(memo, row) {
  //     return memo + _.reduce(row, function(memo, col) {
  //       return memo + col;
  //     }, 0);
  //   }, 0);
  //   if (pieceCount === n) {
  //     solutionCount++;
  //   }
  // }
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);


  // var factorial = function(n) {
  //   if (n == 0 || n == 1) {
  //     return 1;
  //   }
  //   if (n > 0){
  //     return factorial(n-1) * n;
  //   }
  // };

  //solutionCount = factorial(n);
    return solutionCount;
};

var placePieces = function(n) {
  var board = new Board({n: n});
  var pieces = 0;
  _.each(board.rows(), function(row, r) {
    _.each(row, function(col, c) {
      if (!col) {
        board.togglePiece(r, c);
        pieces++;
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(r, c);
          pieces--;
        }
      }
    });
    solution = board.rows();
  });
  return pieces;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var args = Array.prototype.slice.call(arguments, 1);
  var solution = [];
  var board = new Board({n: n});
  var placePieces = function() {
    var pieces = 0;
    _.each(board.rows(), function(row, r) {
      _.each(row, function(col, c) {
        if (!col) {
          board.togglePiece(r, c);
          pieces++;
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(r, c);
            pieces--;
          }
        }
      });
      solution = board.rows();
    });
    return pieces;
  };
  if (args.length > 0) {
    board.togglePiece(args[0], args[1]);    
  }
  
  for(var i = 0; i < n; i++) {
    pieceCount = _.reduce(findNQueensSolution(n, 0, i), function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);
    if (pieceCount === n) {
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      solution = findNQueensSolution(n, 0, i);
      return solution; 
    }
  }

  
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
