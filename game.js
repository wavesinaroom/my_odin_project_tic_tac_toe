documentBody = document.body;
const PlayerToken={
  even: Symbol("even"),
  odd: Symbol("odd"),
};

const GameMode={
  PvP: Symbol("PvP"),
  PvCPU: Symbol("PvCPU")
}

const Move={
  row:  0,
  col: 0
}

const Tile = (tileValue, tileToken, htmlTile) =>{
  return {tileValue, tileToken, htmlTile};
}

const Player=(name, token)=>{

  let numbers = [];
  let number;

  if(token==PlayerToken.odd)
  {
    number = 1;
    for(let i = 0; i<5; ++i)
    {
      numbers.push(number);
      number+=2;
    }
  }else if(token==PlayerToken.even)
  {
    number = 2;
    for(let i = 0; i<5; ++i)
    {
      numbers.push(number);
      number+=2;
    }
  }else{
    throw 'Can\'t create player';
  }

  return {name, token, numbers};
}



//Game Manager
const GameManager = (()=>{

  let players = [];
  players[0] = Player("Player 1", PlayerToken.even);
  players[1] = Player("Player 2", PlayerToken.odd);

  let playerInTurn = players[0];

  let row, column;

  const CreatePlayers = (playerNumber, playerName) => {
    players[playerNumber].name = playerName;
  }

  const ManageGameTurn = (board) => {

    let sum = 0;
    let tileCount = 0;

    for(row = 0; row < board.length; ++row)
    {
      for(column = 0; column < board.length; ++column)
      {
        sum+=board[row][column].tileValue;
        if(board[row][column].tileToken == GameManager.playerInTurn.token)
          ++tileCount;
      }
      if(tileCount>1&&sum===15)
      {
          GameBoard.DeleteBoard();
          return;
      }
      sum=0;
      tileCount=0;
    }

    for(column = 0; column < board.length; ++column)
    {
      for(row = 0; row < board.length; ++row)
      {
        sum+=board[row][column].tileValue;
        if(board[row][column].tileToken == GameManager.playerInTurn.token)
          ++tileCount;
      }
      if(tileCount>1&&sum===15)
      {
          GameBoard.DeleteBoard();
          return;
      }
      sum = 0;
      tileCount = 0;
    }

    for(let diagonal = 0; diagonal<board.length; ++diagonal)
    {
      sum+=board[diagonal][diagonal].tileValue;
      if(board[diagonal][diagonal].tileToken == GameManager.playerInTurn.token)
        ++tileCount;
    }

    if(tileCount>1&&sum===15)
    {
        GameBoard.DeleteBoard();
        return;
    }

    sum = 0;
    tileCount = 0;

    for(let diagonal = 0; diagonal<board.length; ++diagonal)
    {
      sum+=board[diagonal][(board.length-1)-diagonal].tileValue;
      if(board[diagonal][(board.length-1)-diagonal].tileToken == GameManager.playerInTurn.token)
        ++tileCount;
    }

    if(tileCount>1&&sum===15)
    {
        GameBoard.DeleteBoard();
        return;
    }

    tileCount=0;

    for(row=0; row<board.length; ++row)
    {
      for(column=0; column<board.length; ++column)
      {
        if(board[row][column].tileValue>=1&&board[row][column].tileValue<=10)
        {
          ++tileCount;
        }
      }
    }

    if(tileCount==Math.pow(board.length, 2))
    {
      GameBoard.DeleteBoard();
      return;
    }

    tileCount=0;

    for(row=0; row<board.length; ++row)
    {
      for(column=0; column<board.length; ++column)
      {
        if(board[row][column].tileValue>=1&&board[row][column].tileValue<=10)
        {
          ++tileCount;
        }
      }
    }

    if(tileCount==Math.pow(board.length, 2))
    {
      alert('tie');
      return;
    }

    if(GameManager.playerInTurn==players[0])
    {
      GameManager.playerInTurn=players[1];
    }else if(GameManager.playerInTurn==players[1])
    {
      GameManager.playerInTurn=players[0];
    }else{
      throw "invalid value for player turn";
    }
  }

  return {players,playerInTurn, ManageGameTurn, CreatePlayers};

})();

const GameBoard = (()=>{

  let boardDiv, playersAreaDiv;

  const SetUpBoard = () =>{
    boardDiv = document.createElement('div');
    boardDiv.className = "boardDiv";
    documentBody.appendChild(boardDiv);


    let instructions = document.createElement('div');
    boardDiv.appendChild(instructions);

    let instructionsOne = document.createElement('h3');
    instructionsOne.textContent = 'Pick a number from the digits below your name and click on a cell to put your number into.';
    instructions.appendChild(instructionsOne);


    let instructionsTwo = document.createElement('h3');
    instructionsTwo.textContent = 'A Row, a column or a diagonal must sum up to 15 to win.';
    instructions.appendChild(instructionsTwo);


    let notificationsHTML = document.createElement('h3');
    boardDiv.appendChild(notificationsHTML);

    playersAreaDiv = document.createElement('div');
    playersAreaDiv.className = "playersArea";
    documentBody.appendChild(playersAreaDiv);

    const gameBoardSize = 3;
    let board = [[gameBoardSize],[gameBoardSize],[gameBoardSize]];

    let onClickNumber;
    let numbersOnBoard=[];
    //Tiles
    for(let row = 0; row < gameBoardSize; ++row)
    {
      let boardRow = document.createElement('td');
      boardRow.className = "boardRow";
      for(let col = 0; col < gameBoardSize; ++col)
      {
        board[row][col] = Tile(0, PlayerToken.none, document.createElement('td'));
        board[row][col].htmlTile.className = "boardTile";
        board[row][col].htmlTile.textContent = "Yo";
        board[row][col].htmlTile.addEventListener('click', ()=>{

          if(board[row][col].tileToken!=undefined)
            notificationsHTML.textContent = 'Tile\'s already been taken';

          for(let numberPos = 0; numberPos<numbersOnBoard.length; ++numberPos)
          {
            if(onClickNumber==numbersOnBoard[numberPos])
            {
              notificationsHTML.textContent = "Number\'s already on the board";
              return;
            }
          }

          if(onClickNumber!=undefined)
          {
            board[row][col].htmlTile.textContent = onClickNumber;
            board[row][col].tileValue = onClickNumber;
            board[row][col].tileToken = GameManager.playerInTurn.token;
            GameManager.ManageGameTurn(board);
            turnDisplayHTML.textContent = GameManager.playerInTurn.name;
            numbersOnBoard.push(onClickNumber);
          }
        });
        boardRow.appendChild(board[row][col].htmlTile);
      }
      boardDiv.appendChild(boardRow);
    }

    //Turn Display
    let turnDisplayHTML = document.createElement('h3');
    turnDisplayHTML.className = "turnDisplay";
    turnDisplayHTML.textContent = GameManager.playerInTurn.name;
    documentBody.appendChild(playersAreaDiv);

    //Players

    GameManager.players.forEach(player  => {
      let playerHTML = document.createElement('div');
      playerHTML.className = "player"
      playersAreaDiv.appendChild(playerHTML);

      let playerNameHTML = document.createElement('h1');
      playerNameHTML.textContent = player.name;
      playerHTML.appendChild(playerNameHTML);

      let playerTokenHTML = document.createElement('h3');
      if(player.token==PlayerToken.even)
      {
        playerTokenHTML.textContent = "Even";
      }else{
        playerTokenHTML.textContent = "Odd";
      }
      playerHTML.appendChild(playerTokenHTML);

      let playerNumbersArrayHTML = document.createElement('div');
      playerNumbersArrayHTML.className = "playerNumbers";
      playerHTML.appendChild(playerNumbersArrayHTML);

      for(let i = 0; i<player.numbers.length; ++i)
      {
        let playerNumberHTML = document.createElement('h3');
        playerNumberHTML.textContent = player.numbers[i];
        playerNumberHTML.addEventListener("click", () =>{
          if(player!=GameManager.playerInTurn)
          {
            notificationsHTML.textContent =  'Not your turn yet';
            onClickNumber = undefined;
            return;
          }else{
            notificationsHTML.textContent = " ";
          }
          onClickNumber = player.numbers[i];
        });
        playerNumbersArrayHTML.appendChild(playerNumberHTML);
      }
    });
  }

  const DeleteBoard = () =>{
    documentBody.removeChild(boardDiv);
    documentBody.removeChild(playersAreaDiv);

    let winnerDiv = document.createElement('div');
    winnerDiv.className = "winnerDiv";
    documentBody.appendChild(winnerDiv);

    let winnerDisplay = document.createElement('p');
    winnerDisplay.className = "winnerDisplay";
    winnerDisplay.textContent = GameManager.playerInTurn.name + " wins";
    winnerDiv.appendChild(winnerDisplay);

    let restartButton = document.createElement('button');
    restartButton.className = "winnerDiv";
    restartButton.textContent = "Play again";
    winnerDiv.appendChild(restartButton);
    restartButton.addEventListener("click", ()=>{
      documentBody.removeChild(winnerDiv);
      MainPanel.ShowWelcomePanel();
    });
  }
  return {SetUpBoard, DeleteBoard};
})();

const MainPanel = (() => {
    //Welcome Message
    let welcomePanelDiv;

    const ShowWelcomePanel = () =>{
      welcomePanelDiv = document.createElement('div');
      welcomePanelDiv.className = "welcomePanel";
      documentBody.appendChild(welcomePanelDiv);

      let welcomeTitleHTML = document.createElement('h1');
      welcomeTitleHTML.id = "welcomeTitleHTML";
      welcomeTitleHTML.textContent = "Hey! Ready to play tic-tac-toe?";
      welcomePanelDiv.appendChild(welcomeTitleHTML);

      let pvpHTMLButton = document.createElement('button');
      pvpHTMLButton.id = "setUpPlayers";
      pvpHTMLButton.textContent = "Set up players";
      pvpHTMLButton.addEventListener('click',()=>{
        ShowSetUpPanel();
      });
      welcomePanelDiv.appendChild(pvpHTMLButton);
    }

    const ShowSetUpPanel = ()=>{
      documentBody.removeChild(welcomePanelDiv);

      let setUpPanelDiv = document.createElement('div');
      setUpPanelDiv.className = "setUpPanel";
      documentBody.appendChild(setUpPanelDiv);

      let playersNameDiv = document.createElement('div');
      setUpPanelDiv.appendChild(playersNameDiv);

      let playerOneNameInput;
      let playerTwoNameInput;

      let playerOneDiv =  document.createElement('div');
      playersNameDiv.appendChild(playerOneDiv);

      let playerOneNameInputLabel = document.createElement('h2');
      playerOneNameInputLabel.innerHTML =  "Player one name: ";
      playerOneDiv.appendChild(playerOneNameInputLabel);

      playerOneNameInput = document.createElement('input');
      playerOneNameInput.type = 'text';
      playerOneDiv.appendChild(playerOneNameInput);

      let playerTwoDiv =  document.createElement('div');
      playersNameDiv.appendChild(playerTwoDiv);

      let playerTwoNameInputLabel = document.createElement('h2');
      playerTwoNameInputLabel.innerHTML =  "Player two name: ";
      playerTwoDiv.appendChild(playerTwoNameInputLabel);

      playerTwoNameInput = document.createElement('input');
      playerTwoNameInput.type = 'text';
      playerTwoNameInput.label = 'Player Two Name:';
      playerTwoDiv.appendChild(playerTwoNameInput);

      playersNameDiv.appendChild(playerOneDiv);
      playersNameDiv.appendChild(playerTwoDiv);

      let createGameButton = document.createElement('button');
      createGameButton.textContent = "Start Game";
      createGameButton.addEventListener('click', () => {
        GameManager.CreatePlayers(0,playerOneNameInput.value);
        GameManager.CreatePlayers(1,playerTwoNameInput.value);
        documentBody.removeChild(setUpPanelDiv);
        GameBoard.SetUpBoard();
      });
      setUpPanelDiv.appendChild(createGameButton);
    }

    return {ShowWelcomePanel, ShowSetUpPanel};
})();

MainPanel.ShowWelcomePanel();
