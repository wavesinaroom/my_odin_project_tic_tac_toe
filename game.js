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

const CPU = (()=>{
  const IsMoveLeft = (board) => {
    for(row = 0; row < board.length; ++row)
      for(column = 0; column < board.length; ++column)
        if (board[row][column].tileToken==undefined)
          return true;
    return false;
  }

  const Evaluate = (board) => {
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
          if(GameManager.playerInTurn.token == PlayerToken.even)
            return 1;
          else if(GameManager.playerInTurn.token == PlayerToken.false)
            return -1;
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
        if(GameManager.playerInTurn.token == PlayerToken.even)
          return 1;
        else if(GameManager.playerInTurn.token == PlayerToken.false)
          return -1;
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
      if(GameManager.playerInTurn.token == PlayerToken.even)
        return 1;
      else if(GameManager.playerInTurn.token == PlayerToken.false)
        return -1;
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
      if(GameManager.playerInTurn.token == PlayerToken.even)
        return 1;
      else if(GameManager.playerInTurn.token == PlayerToken.false)
        return -1;
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
      if(GameManager.playerInTurn.token == PlayerToken.even)
        return 1;
      else if(GameManager.playerInTurn.token == PlayerToken.false)
        return -1;
    }

    // TODO: Write code for tie game
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
      return 0;
    }
  }

  const Minimax = (board, depth, isMax) => {
    let score = Evaluate(board);

    if(score==10)
      return score;

    if(score==-10)
      return score;

    if(IsMoveLeft(board == false))
      return 0;


    if(isMax)
    {
      let best = -1000;
      for(row=0; row<board.length; ++row)
      {
        for(column=0; column<board.length; ++column){
          if(board [row][column].tileToken == undefined)
          {
            board[row][column].tileToken = PlayerToken.even;
            best = Math.max(best, Minimax(board, depth+1, !isMax));
            board[row][column].tileToken = undefined;
          }
        }
      }
      return best;
    }else{
      let best = 1000;
      for(row=0; row<board.length; ++row)
      {
        for(column=0; column<board.length; ++column){
          if(board [row][column].tileToken == undefined)
          {
            board[row][column].tileToken = PlayerToken.odd;
            best = Math.min(best, Minimax(board, depth+1, !isMax));
            board[row][column].tileToken = undefined;
          }
        }
      }
      return best;
    }
  }

  const FindBestMove = (board) =>{
    let bestVal = -1000;
    let bestMove = new Move();
    bestMove.row =  -1;
    bestMove.column = -1;
    for(row=0; row<board.length; ++row)
    {
      for(column=0; column<board.length; ++column){
        if(board [row][column].tileToken == undefined)
        {
          board[row][column].tileToken = PlayerToken.even;
          let moveVal = Minimax(board, 0, false);
          board[row][column].tileToken = undefined;

          if(moveVal>bestVal)
          {
            bestMove.row = row;
            bestMove.column = column;
            bestVal = moveVal;
          }
        }
      }
    }
    return bestMove;
  }
})();



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

    // TODO: Write code for tie game
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
    //Winner
    alert(GameManager.playerInTurn.name);
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

      let welcomeMessageHTML = document.createElement('p');
      welcomeMessageHTML.id = "welcomeMessageHTML";
      welcomeMessageHTML.textContent = "Choose your game mode";
      welcomePanelDiv.appendChild(welcomeMessageHTML);

      let pvpHTMLButton = document.createElement('button');
      pvpHTMLButton.id = "pvpHTMLButton";
      pvpHTMLButton.textContent = "Player vs Player";
      pvpHTMLButton.addEventListener('click',()=>{
        ShowSetUpPanel(GameMode.PvP);
        GameManager.gameMode = GameMode.PvP;
      });
      welcomePanelDiv.appendChild(pvpHTMLButton);

      let pvcpuHTMLButton = document.createElement('button');
      pvcpuHTMLButton.id = "pvcpuHTMLButton";
      pvcpuHTMLButton.textContent = "Player vs CPU";
      pvcpuHTMLButton.addEventListener('click',()=>{
        ShowSetUpPanel(GameMode.PvCPU);
        GameManager.gameMode = GameMode.PvCPU;
      });
      welcomePanelDiv.appendChild(pvcpuHTMLButton);
    }

    const ShowSetUpPanel = (gameMode)=>{
      documentBody.removeChild(welcomePanelDiv);

      let setUpPanelDiv = document.createElement('div');
      setUpPanelDiv.className = "setUpPanelDiv";
      documentBody.appendChild(setUpPanelDiv);

      let playerOneNameInput;
      let playerTwoNameInput;

      if(gameMode == GameMode.PvP)
      {

        let playerOneDiv =  document.createElement('div');
        playerOneDiv.className = "playerOne";
        documentBody.appendChild(playerOneDiv);

        let playerOneNameInputLabel = document.createElement('p');
        playerOneNameInputLabel.innerHTML =  "Player one name: ";
        playerOneDiv.appendChild(playerOneNameInputLabel);

        playerOneNameInput = document.createElement('input');
        playerOneNameInput.type = 'text';
        playerOneDiv.appendChild(playerOneNameInput);

        let playerTwoDiv =  document.createElement('div');
        playerTwoDiv.className = "playerTwo";
        documentBody.appendChild(playerTwoDiv);

        let playerTwoNameInputLabel = document.createElement('p');
        playerTwoNameInputLabel.innerHTML =  "Player two name: ";
        playerTwoDiv.appendChild(playerTwoNameInputLabel);

        playerTwoNameInput = document.createElement('input');
        playerTwoNameInput.type = 'text';
        playerTwoNameInput.label = 'Player Two Name:';
        playerTwoDiv.appendChild(playerTwoNameInput);

        setUpPanelDiv.appendChild(playerOneDiv);
        setUpPanelDiv.appendChild(playerTwoDiv);

      }else{
        let playerOneDiv =  document.createElement('div');
        playerOneDiv.className = "playerOne";
        documentBody.appendChild(playerOneDiv);

        let playerOneNameInputLabel = document.createElement('p');
        playerOneNameInputLabel.innerHTML =  "Player's name: ";
        playerOneDiv.appendChild(playerOneNameInputLabel);

        let playerOneNameInput = document.createElement('input');
        playerOneNameInput.type = 'text';
        playerOneDiv.appendChild(playerOneNameInput);
      }

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
