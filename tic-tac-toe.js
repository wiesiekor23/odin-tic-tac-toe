function Players() {
  
  
  let players = [{playerName: "name", mark: "X"}, {playerName: "name", mark: "O"}];
  players[0].name = "Mark";

  function getPlayers() {
    return players;
  }

  function changePlayers() {
    players = [players[1], players[0]];
    return players;
  }
  changePlayers();
  console.log(players);
  return {getPlayers};
}

Players();



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
board.changeBoardItem(players.getPlayers()[1].playerName, 2);

console.log(board.getBoard()[2]);
/* function checkWinningCondition(array) {
  if()
} */

