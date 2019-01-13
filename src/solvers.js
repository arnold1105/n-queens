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
  var solution = new Board ({n: n});
  
  var findBoard = function(board, pieces) {
    if (pieces === 0) {
      return board;
    } else {
      var row = n - pieces;
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (!board.hasAnyRooksConflictsOn(row, i)) {
          return findBoard(board, pieces - 1);
        } else {
          board.togglePiece(row, i);
        }
      }
    }
  };
  
  solution = findBoard(solution, n);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var matrixCounter = function(board, pieces) {
    if (pieces === 0) {
      solutionCount++;
    } else {
      var row = n - pieces;
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (!board.hasAnyRooksConflictsOn(row, i)) {
          matrixCounter(board, pieces - 1);
        }
        board.togglePiece(row, i);
      }
    }
  };
  
  /* var factorial = function(num) {
    if (num === 1) {
      return 1;
    } else {
      return num * factorial(num - 1);
    }
  }; */
  
  
  var matrix = new Board({n: n});
  matrixCounter(matrix, n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board ({n: n});
  var counter = 0;
  var findBoard = function(board, pieces) {
    if (pieces === 0) {
      return board;
    } else {
      var row = n - pieces;
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (!board.hasAnyQueenConflictsOn(row, i)) {
          counter++;
          findBoard(board, pieces - 1);
          if (counter !== n) {
            board.togglePiece(row, i);
          }
        } else {
          board.togglePiece(row, i);
        }
      }
      if (counter === n) {
        return board;
      } else {
        counter--;
        return board;
      }
    }
  };
  solution = findBoard(solution, n);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var matrix = new Board({n: n});
  var countQueens = function(board, pieces) {
    if (pieces === 0) {
      solutionCount++;
    } else {
      var row = n - pieces;
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (!board.hasAnyQueenConflictsOn(row, i)) {
          countQueens(board, pieces - 1);
        }
        board.togglePiece(row, i);
      }
    }
  };
  countQueens(matrix, n, 'queen');
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
