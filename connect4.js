/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// set "board" to empty HEIGHT x WIDTH matrix array

function makeBoard() {
  // for (let i = 0;  i < HEIGHT; i++){
  //   let eachRow = [];
  //   for (let j = 0; j < WIDTH; j++){
  //     eachRow.push(null);
  //   }
  //   board.push(eachRow);
  // }
  for(let i = 0; i < HEIGHT; i++){
    board.push(new Array(WIDTH).fill(null));
  }
}   // compact it even more!! TODO

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // Get "htmlBoard" variable from the item in HTML w/ID of "board"

  let htmlBoard = document.getElementById("board");

  // Add comment for this code
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // Creates a table of  HEIGHT rows and  WIDTH colums; appends the table to the website

  for (let y = 0; y < HEIGHT; y++) {

    let row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);

    }

    htmlBoard.append(row);

  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (y = HEIGHT-1; y >= 0 ; y--){
    if (board [y][x] === null){
      return y;
    }
  }
  // return null if column full
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // Make a div and insert into correct table cell
  let playCell = document.getElementById(`${y}-${x}`);
  let chip = document.createElement("div");

  chip.setAttribute('class', `piece p${currPlayer}`);

  playCell.append(chip);
}

/** endGame: announce game end */

function endGame(msg) {
  //  pop up alert message
  alert(`OH SNAP WINNER WINNER CHICKEN DINNER! Player ${currPlayer} won! `);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  //  add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // Check if all cells in board are filled; if so call, call endGame
  if (board.every( 
    row => row.every(
      cell => cell!==null
      )
    )
  ){
    endGame('Tie Game!');
  }

  // switch players
  // Switch currPlayer 1 <-> 2
  // currPlayer = 3 - currPlayer;  // play with ternary;
  // TODO
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  //  TODO
  // Check for 4 in a row win in
  // horizontal, vertical, diagonal (DOWN RIGHT), diagonal (DOWN LEFT).
  // Returns true if any win conditions hold.
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
