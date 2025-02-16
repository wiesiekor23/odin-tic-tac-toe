function Players() {


  let players = [{ playerName: "name", mark: "X" }, { playerName: "name", mark: "O" }];

  function getPlayers() {
    return players;
  }

  function changePlayers() {
    players = [players[1], players[0]];
    return players;
  }

  return { getPlayers, changePlayers };
};


function GameBoard() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  function getBoard() {
    return board;
  }
  
  function changeBoardItem(newItem, index) {
    return board[index] = newItem;
  }
  
  return { getBoard, changeBoardItem };
};


function gameFlow() {
  const players = Players();
  const board = GameBoard();
  
players.getPlayers()[0].playerName = "Steve";
players.getPlayers()[1].playerName = "Stacey"; 
  
  function play() {
    const activePlayer = players.getPlayers()[0].playerName;
    const playerMark = players.getPlayers()[0].mark;
    let indexInput = prompt(`${activePlayer}'s turn!`);
    board.changeBoardItem(playerMark, indexInput);
    
    if (checkWinningConditions() == "Win") {
      console.log(`${activePlayer} won`);
    } else if (checkWinningConditions() == "Draw") {
      console.log("It's a draw");
    } else {
      players.changePlayers();
      play();
    }
  }
  
  function checkWinningConditions() {
    const boardCheck = board.getBoard();
    let returnedValue;
    const winningConditions = [
      [boardCheck[0], boardCheck[1], boardCheck[2]],
      [boardCheck[3], boardCheck[4], boardCheck[5]],
      [boardCheck[6], boardCheck[7], boardCheck[8]],
      [boardCheck[0], boardCheck[3], boardCheck[6]],
      [boardCheck[1], boardCheck[4], boardCheck[7]],
      [boardCheck[2], boardCheck[5], boardCheck[8]],
      [boardCheck[0], boardCheck[4], boardCheck[8]],
      [boardCheck[2], boardCheck[4], boardCheck[6]],
    ];
    
    for (let condition of winningConditions) {
      if (condition.every(cell => cell === "X") || condition.every(cell => cell === "O")) {

        returnedValue = "Win";
        return returnedValue;
      };
    };
    
    if (boardCheck.every(cell => cell !== "")) {
      returnedValue = "Draw";
    }
    
    return returnedValue;
  };
  
  play();
};

gameFlow();