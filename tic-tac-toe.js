function Players() {

  let players = [{ playerName: "name", mark: "X" }, { playerName: "name", mark: "O" }];

  function getPlayers() {
    return players;
  }

  function swapPlayers() {
    players = [players[1], players[0]];
    return players;
  }

  function getActivePlayer() {
    return players[0].playerName;
  }

  function getNextPlayer() {
    return players[1].playerName;
  }

  function getActivePlayerMark() {
    return players[0].mark;
  }

  return { getPlayers, swapPlayers, getActivePlayer, getNextPlayer, getActivePlayerMark };
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

const displayMessage = (function () {
  return function (message) {
    const messageDiv = document.querySelector(".message-container");
    messageDiv.textContent = message;
  };
})();

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
    const activePlayerMark = players.getActivePlayerMark();
    const activePlayer = players.getActivePlayer();
    const nextPlayer = players.getNextPlayer();
    board.updateBoardItem(activePlayerMark, index);

    if (checkWinningConditions() == "Win") {
      displayMessage(`${activePlayer} won the game!`);
      return;
    } else if (checkWinningConditions() == "Draw") {
      displayMessage("It's a draw");
      return;
    } else {
      console.log(nextPlayer);
      console.log(activePlayer);
      players.swapPlayers();
      console.log(board.getBoard());
      displayMessage(`${nextPlayer}'s turn!`);
    };

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

  return { play, board, addPlayerOne, addPlayerTwo, players, checkWinningConditions };
};

function displayController() {
  const game = gameFlow();
  const players = game.players;
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
    const cells = document.querySelectorAll(".cell");
    const activePlayer = players.getActivePlayer();
    displayMessage(`${activePlayer}'s turn!`);

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handleClick(index, cell), { once: true });
    });

    function handleClick(index, cell) {
      console.log(index);
      game.play(index);
      cell.textContent = board[index];
      if (game.checkWinningConditions() === "Win") {
        cells.forEach(cell => {
          cell.replaceWith(cell.cloneNode(true));
        });
      }
    };
  }

  function addNames() {
    displayMessage("Add Player Names");
    let inputOne = "";
    let inputTwo = "";

    document.querySelector(".submit-button").addEventListener("click", () => {
      inputOne = document.querySelector("#input-field-one").value;
      inputTwo = document.querySelector("#input-field-two").value;
      game.addPlayerOne(inputOne);
      game.addPlayerTwo(inputTwo);
      displayBoardWhenReady(inputOne, inputTwo);
    });
  };

  function displayBoardWhenReady(inputOne, inputTwo) {
    const activePlayer = players.getActivePlayer();

    if (inputOne === "" || inputTwo === "") {
      displayMessage("Please add both names to proceed with the game");
    } else {
      displayMessage(`${activePlayer}'s turn!`);
      console.log(players.getPlayers());
      createBoardDisplay(board);
      updateDisplay();
    }
  };

  addNames();
};

displayController();