documentBody = document.body;

const PlayerToken={
  even: Symbol("even"),
  odd: Symbol("odd"),
};

const GameMode={
  PvP: Symbol("PvP"),
  PvCPU: Symbol("PvCPU")
}

const Player=(name, token, winner=false)=>{

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

  return {name, token, numbers, winner};
}

const Tile = (tileValue, tileToken, htmlTile) =>{
  return {tileValue, tileToken, htmlTile};
}


//Game Manager
const GameManager = (()=>{

  let gameMode = GameMode.PvP;

  let players = [];
  players[0] = Player("Player 1", PlayerToken.even, false);
  players[1] = Player("Player 2", PlayerToken.odd, false);

  let playerInTurn = players[0];


  const ManageGameTurn = (board) => {

    let sum = 0;
    let tileCount = 0;

    for(let row = 0; row < board.length; ++row)
    {
      for(let column = 0; column < board.length; ++column)
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

    for(let column = 0; column < board.length; ++column)
    {
      for(let row = 0; row < board.length; ++row)
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

  return /*SetUpGame*/ {players,playerInTurn, ManageGameTurn};

})();

const GameBoard = (()=>{

  let boardDiv, playersAreaDiv;

  const SetUpBoard = () =>{
    boardDiv = document.createElement('div');
    boardDiv.className = "boardDiv";
    documentBody.appendChild(boardDiv);

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
            throw 'Tile\'s already been taken';

          for(let numberPos = 0; numberPos<numbersOnBoard.length; ++numberPos)
          {
            if(onClickNumber==numbersOnBoard[numberPos])
            {
              alert("Number\'s already on the board");
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
    let turnDisplayHTML = document.createElement('p');
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

      let playerTokenHTML = document.createElement('p');
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
        let playerNumberHTML = document.createElement('p');
        playerNumberHTML.textContent = player.numbers[i];
        playerNumberHTML.addEventListener("click", () =>{
          if(player!=GameManager.playerInTurn)
          {
            alert('Not your turn yet');
            onClickNumber = undefined;
            return;
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
    alert(GameManager.playerInTurn.name);
  }
  return {SetUpBoard, DeleteBoard};
})();

const MainPanel = (() => {
    //Welcome Message

    const ShowWelcomePanel = () =>{
      let welcomePanelDiv = document.createElement('div');
      welcomePanelDiv.className = "welcomePanel";
      documentBody.appendChild(welcomePanelDiv);

      let welcomeTitleHTML = document.createElement('h1');
      welcomeTitleHTML.id = "welcomeTitleHTML";
      welcomeTitleHTML.textContent = "Hey! Ready to play tic-tac-toe?";
      welcomePanelDiv.appendChild(welcomeTitleHTML);

      let welcomeMessageHTML = document.createElement('p');
      welcomeMessageHTML.id = "welcomeMessageHTML";
      welcomeMessageHTML.textContent = "Choose your game mode";
      welcomePanelDiv.appendChild(welcomeMessageHTML);

      let pvpHTMLButton = document.createElement('button');
      pvpHTMLButton.id = "pvpHTMLButton";
      pvpHTMLButton.textContent = "Player vs Player";
      welcomePanelDiv.appendChild(pvpHTMLButton);

      let pvcpuHTMLButton = document.createElement('button');
      pvcpuHTMLButton.id = "pvcpuHTMLButton";
      pvcpuHTMLButton.textContent = "Player vs CPU";
      welcomePanelDiv.appendChild(pvcpuHTMLButton);
    }

    const ShowSetUpPanel = ()=>{
      let setUpPanelDiv = document.createElement('div');
      setUpPanelDiv.className = "setUpPanelDiv";
      documentBody.appendChild(setUpPanelDiv);

      if(GameManager.gameMode == GameMode.PvP)
      {
        //TODO: Create two input fields for Players' name
        //TODO: Create token selection buttons
      }else{
        //TODO: Create one input for a single player's name
        //TODO: Create token selection butoo
      }

    }

    //Game Mode    //Players' name input
    //Start Game button
    return {ShowWelcomePanel,ShowSetUpPanel};
})();
