let gridArray = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let currentTurn = -1; // - 1 = X's turn
const turnIndicator = document.getElementById("turn-indicator");
const winnerBanner = document.getElementById("winner-banner");
const boxes = document.getElementsByClassName("box");
turnIndicator.style.color = "red";
winnerBanner.style.marginBottom = "10px";
let numberOfRounds = 0;

function play(row, column) {
  numberOfRounds++;
  if (currentTurn === 1 && gridArray[row][column] === 0) {
    gridArray[row][column] = 1;
    renderBoard();
    currentTurn = -1;
    turnIndicator.textContent = "X's Turn";
    turnIndicator.style.color = "red";
  } else if(currentTurn === -1 && gridArray[row][column] === 0){
    gridArray[row][column] = -1;
    renderBoard();
    currentTurn = 1;
    turnIndicator.textContent = "O's Turn";
    turnIndicator.style.color = "blue";
  }

  let gameStatus = checkWinning();
  
  if (gameStatus === "X") {
    winnerBanner.textContent = "Hooray!, X won";
    winnerBanner.style.color = "red";
  } else if (gameStatus === "O") {
    winnerBanner.textContent = "Hooray!, O won";
    winnerBanner.style.color = "blue";
  }
  if (numberOfRounds === 9 && gameStatus !== "X" && gameStatus !== "O") {
    winnerBanner.textContent = "Game over";
    winnerBanner.style.color = "gray";
  }
}

function renderBoard() {
  let index = 0;
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (gridArray[i][j] === 1) {
        boxes[index].textContent = "O";
        boxes[index].style.color = "blue";
      } else if(gridArray[i][j] === -1){
        boxes[index].textContent = "X";
        boxes[index].style.color = "red";
      }
      index++;
    }
  }
}

function checkWinning() {
  //check for row
  for (let i = 0; i < 3; i++){
    let isWin = true;
    for (let j = 1; j < 3; j++){
      if (gridArray[i][j] != gridArray[i][j - 1]) {
        isWin = false;
        break;
      }
    }

    if (isWin && gridArray[i][0] == -1) {
      return "X";
    } else if (isWin && gridArray[i][0] == 1) {
      return "O";
    }
  }

  //check for column winning
  for (let i = 0; i < 3; i++){
    let isWin = true;
    for (let j = 1; j < 3; j++){
      if (gridArray[j][i] != gridArray[j - 1][i]) {
        isWin = false;
        break;
      }
    }

    if (isWin && gridArray[0][i] === -1) {
      return "X";
    } else if (isWin && gridArray[0][i] === 1) {
      return "O";
    }
  }

  //check for diagonal
  if (gridArray[0][0] == gridArray[1][1] && gridArray[2][2] == gridArray[1][1] && gridArray[0][0] !== 0) {
    if (gridArray[0][0] === -1) {
      return "X";
    } else if (gridArray[0][0] === 1) {
      return "O";
    }
  }

  //check for anti-diagonal
  if (
    gridArray[0][2] == gridArray[1][1] &&
    gridArray[2][0] == gridArray[1][1] &&
    gridArray[2][0] !== 0
  ) {
    if (gridArray[2][0] === -1) {
      return "X";
    } else if (gridArray[2][0] === 1) {
      return "O";
    }
  }
}

// function xCheckRowWinning(){
//   //check for X(-1)
//   let xWinning = true;
//   for (let i = 0; i < 3; i++){
//     for (let j = 0; j < 3; j++){
//       if (gridArray[i][j] === 1 || gridArray[i][j] === 0) {
//         return false;
//       }
//     }
//   }

//   if (xWinning) {
//     return true;
//   } else {
//     return false;
//   }
// }

function restartGame() {
  location.reload(true);
}
