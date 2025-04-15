function Players() {

  let players = [{ playerName: "", mark: "X" }, { playerName: "", mark: "O" }];

  function getPlayers() {
    return players;
  }

  function swapPlayers() {
    players = [players[1], players[0]];
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
  }

  return { getBoard, updateBoardItem };
};

const displayMessage = (function () {
  return function (message) {
    const messageDiv = document.querySelector(".message-container");
    messageDiv.textContent = message;

    /* Reapplies message fadeIn animation - CSS */
    messageDiv.style.animation = "none";
    messageDiv.offsetWidth;
    messageDiv.style.animation = ""; 
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
      players.swapPlayers();
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
  const board = game.board.getBoard();

  const submitBtn = document.querySelector(".submit-button");
  const displayBoard = document.querySelector(".game-container");
  const restartBtn = document.querySelector(".restart-button");
  
  
  function createBoardDisplay(board) {
    displayBoard.innerHTML = "";
    
    board.forEach((element, index) => {
      const gameButton = document.createElement("button");
      gameButton.classList.add(`cell`, `${index}`);
      displayBoard.appendChild(gameButton);
    });
  };
  
  function restartButton() {
    restartBtn.addEventListener("click", handleRestart);
    
    function handleRestart() {
      submitBtn.removeEventListener("click", addPlayerNames);
      restartBtn.removeEventListener("click", handleRestart);
      
      createBoardDisplay(board);
      displayController();
      removePlayerNamesDisplay();
    }
  }
  
  function removePlayerNamesDisplay() {
    document.querySelector("#input-field-one").value = "";
    document.querySelector("#input-field-two").value = "";
  }
  
  function updateDisplay() {
    const cells = document.querySelectorAll(".cell");
    
    function handleClick(index, cell) {
      game.play(index);
      cell.textContent = board[index];
      if (game.checkWinningConditions() === "Win") {
        cells.forEach(cell => {
          cell.replaceWith(cell.cloneNode(true));
        });
      }
    };
    
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handleClick(index, cell), { once: true });
    });
  }
  
  function addNames() {
    displayMessage("Add Player Names");
    
    submitBtn.addEventListener("click", addPlayerNames);
  };
  
  function addPlayerNames() {
    let inputOne = "";
    let inputTwo = "";

    inputOne = document.querySelector("#input-field-one").value;
    inputTwo = document.querySelector("#input-field-two").value;
    
    game.addPlayerOne(inputOne);
    game.addPlayerTwo(inputTwo);
    displayBoardWhenReady(inputOne, inputTwo);
    if (inputOne !=="" && inputTwo !=="") {
      submitBtn.removeEventListener("click", addPlayerNames);
      removePlayerNamesDisplay();
    }
  }
  
  function displayBoardWhenReady(inputOne, inputTwo) {
    const activePlayer = players.getActivePlayer();
    
    if (inputOne === "" || inputTwo === "") {
      displayMessage("Please add both names to proceed with the game");
    } else {
      displayMessage(`${activePlayer}'s turn!`);
      createBoardDisplay(board);
      updateDisplay();
    }
  };
  
  restartButton();
  addNames();
};

displayController();