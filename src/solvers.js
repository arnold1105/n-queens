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
  var solution = new Board({n: n}); //fixme
  /*
  
  */
  
  /*
  when n is zero, we return something
  ....other stuff...
  we add a rook
  return this.findNRooksSolution(n - 1);
  */
  
  /*
  start with empty matrix
  
  for i < n*n
    
  put a piece on the first available spot,
  find the next available spot
  find the next available spot
  return the new matrix
  */
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.get(i)[j] = 1;
      if (solution.hasRowConflictAt(i) || solution.hasColConflictAt(j)) {
        solution.get(i)[j] = 0;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  /*
  loop over n times
  add a thing at the top
  add a next thing
  add a next thing
  count
  go up one level to chekc the next things, if i can put somethin, 
  add a next thing
  if not, go up another level and repeat
  repeat
  /*
  we define some function that accepts the matrix as an argument
  define counter = 0
    if n === 0 
      checks the matrix for rook conflicts
        if none, return 1, else return 0
    else
      loop over the n - 'n'th row, adding 1s
      counter += return of this function
      restore 'n' to what it was
      repeat loop
    return counter
    
  
  we make a blank matrix
  loop over the first row,
  reset matrix to blank
  restore 'n' to n
  adding 1 to i col
  subtract one from 'n'
  call the function with each matrix
  */
  var matrixCounter = function(board) {
    var counter = 0;
    
    console.log(board.hasAnyRooksConflicts());
    if (board.attributes.n === 0) {
      if (!board.hasAnyRooksConflicts()) {
        return 1;
      } else {
        return 0;
      }
    } else {
      var row = n - board.attributes.n;
      var oldN = board.attributes.n;
      for (var i = 0; i < n; i++) {
        
        board.attributes.n = oldN;
        board.get(row)[i] = 1;
        board.attributes.n = oldN - 1;
        counter += matrixCounter(board);
        board.get(row)[i] = 0;
      } 
      return counter;
    }
  };
  
  var matrix = new Board({n: n});
  solutionCount = matrixCounter(matrix);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board ({n: n}); //fixme
  
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.get(i)[j] = 1;
      if (solution.hasAnyQueenConflictsOn(i, j)) {
        solution.get(i)[j] = 0;
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
