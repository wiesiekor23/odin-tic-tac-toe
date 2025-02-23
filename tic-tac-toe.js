function Players() {


  let players = [{ playerName: "name", mark: "X" }, { playerName: "name", mark: "O" }];

  function getPlayers() {
    return players;
  }

  function swapPlayers() {
    players = [players[1], players[0]];
    return players;
  }

  return { getPlayers, swapPlayers };
};


function GameBoard() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  function getBoard() {
    return board;
  }

  function updateBoardItem(newItem, index) {
    board[index] = newItem;
    return board[index];
  }

  return { getBoard, updateBoardItem };
};


function gameFlow() {
  const players = Players();
  const board = GameBoard();

  function addPlayerOne(playerOne) {
    players.getPlayers()[0].playerName = playerOne;
  }

  function addPlayerTwo(playerTwo) {
    players.getPlayers()[1].playerName = playerTwo;
  }

  function play(index) {
    const activePlayer = players.getPlayers()[0].playerName;
    const playerMark = players.getPlayers()[0].mark;
    board.updateBoardItem(playerMark, index);

    if (checkWinningConditions() == "Win") {
      console.log(`${activePlayer} won`);
      return;
    } else if (checkWinningConditions() == "Draw") {
      console.log("It's a draw");
      return;
    };

    players.swapPlayers();
    console.log(board.getBoard());
  };

  function checkWinningConditions() {
    const boardCheck = board.getBoard();
    let returnedValue = "";

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

  return { play, board, addPlayerOne, addPlayerTwo };
};

function displayController() {
  const game = gameFlow();
  const displayBoard = document.querySelector(".game-container");
  const board = game.board.getBoard();

  function createBoardDisplay(board) {
    displayBoard.innerHTML = "";

    board.forEach((element, index) => {
      const gameButton = document.createElement("button");
      gameButton.classList.add(`cell`, `${index}`);
      displayBoard.appendChild(gameButton);
    });
  };

  function updateDisplay() {
    const cells = document.querySelectorAll(`.cell`);
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        game.play(index);
        cell.textContent = board[index];
      }, { once: true });
    });
  };

  function addNames() {
    document.querySelector(".submit-button-one").addEventListener("click", () => {
      const inputOne = document.querySelector("#input-field-one").value;
      game.addPlayerOne(inputOne);
      playerOneAdded = true;
      displayBoardWhenReady();
    });
    
    document.querySelector(".submit-button-two").addEventListener("click", () => {
      const inputTwo = document.querySelector("#input-field-two").value;
      game.addPlayerTwo(inputTwo);
      playerTwoAdded = true;
      displayBoardWhenReady();
    });
  };

  function displayBoardWhenReady() {
    if (playerOneAdded && playerTwoAdded) {
      createBoardDisplay(board);
      updateDisplay();
    };
  };
  
  addNames();
};

displayController();