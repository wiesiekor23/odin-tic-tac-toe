function Players() {
  const players = [{playerOne: "X"}, {playerTwo: "O"}];

  function getPlayers() {
    return players;
  }
  return {getPlayers};
}



function GameBoard() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  function getBoard() {
    return board;
  }
  
  function changeBoardItem(newItem, index) {
    return board.splice(index, 1, newItem);
  }

  return {getBoard, changeBoardItem};
};

const board = GameBoard();
const players = Players();
board.changeBoardItem(players.getPlayers()[1].playerTwo, 2);

console.log(board.getBoard()[2]);
/* function checkWinningCondition(array) {
  if()
} */

