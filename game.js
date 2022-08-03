documentBody = document.body;

const PlayerToken={
  even: Symbol("even"),
  odd: Symbol("odd"),
};

const GameMode={
  PvP: Symbol("PvP"),
  PvCPU: Symbol("PvCPU")
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

const Tile = (tileValue, tileToken, htmlTile) =>{
  return {tileValue, tileToken, htmlTile};
}


//Game Manager
const GameManager = (()=>{
  let turnCount = 0;
  const turnNumber = 3;
  let players = [];


  players[0] = Player("1", PlayerToken.even);
  players[1] = Player("2", PlayerToken.odd);

  let playerInTurn = players[0].token;


  const ManageGameTurn = () => {

    if(playerInTurn==PlayerToken.even)
    {
      playerInTurn=PlayerToken.odd;
    }else if(playerInTurn==PlayerToken.odd)
    {
      playerInTurn=PlayerToken.even;
    }else{
      throw "invalid value for player turn";
    }

    ++turnCount;

    if(turnCount==turnNumber)
    {
      //EndGame;
    }
  }
  return /*StartGame, ResetGame, SetUpGameMode, SetUpPlayers,*/ {players,playerInTurn,ManageGameTurn};

/*
  const numberGameTurn = 5;
  const scorePointSum = 15;

  let gameBoard;
  let gameMode;
  let players=[2];
  let turn = 0;
  let score = [2];

  const StartGame = () => {
    console.log("I'm working");
    if(gameBoard == undefined)
    {
      gameBoard = GameBoard();
    }else{
      return;
    }
  }

  const ResetGame = () =>{
    if(gameBoard != undefined)
    {
      gameBoard = undefined;
      gameBoard = GameBoard();
    }else{
      gameBoard = GameBoard();
    }
  }

  const SetUpGameMode = (chosenGameMode) => {
    gameMode = chosenGameMode;
    return gameMode;
  }

  const SetUpPlayers = (playerOneName, playerOneToken, playerTwoName, playerTwoToken) => {
    players[0] = Player(playerOneName, playerOneToken);
    players[1] = Player(playerTwoName, playerTwoToken);

    if(playerTwoName==undefined&&playerTwoToken==undefined)
    {
      if(playerOneToken==PlayerToken.even)
      {
        players[1] = Player("CPU", PlayerToken.odd);
      }else if(playerOneToken==PlayerToken.odd)
      {
        players[1] = Player("CPU", PlayerToken.even);
      }else{
        return;
      }
    }

    if(playerOneName==undefined||playerOneToken==undefined||playerTwoName==undefined||playerTwoToken==undefined)
    {
      return;
    }
    return players;
  }


*/
})();

const GameBoard = (()=>{

  const gameBoardSize = 3;

  let board = [[gameBoardSize],[gameBoardSize],[gameBoardSize]];
  let boardDiv = document.createElement('div');
  boardDiv.className = "boardDiv";
  documentBody.appendChild(boardDiv);

  let onClickPlayerValues = Player("init", PlayerToken.odd);
  let onClickNumber;
  //Tiles
  for(let row = 0; row < gameBoardSize; ++row)
  {
    let boardRow = document.createElement('td');
    boardRow.className = "boardRow";
    for(let col = 0; col < gameBoardSize; ++col)
    {
      board[row][col] = Tile(1, PlayerToken.none, document.createElement('td'));
      board[row][col].htmlTile.className = "boardTile";
      board[row][col].htmlTile.textContent = "Yo";
      board[row][col].htmlTile.addEventListener('click', ()=>{

        if(board[row][col].tileToken!=undefined)
          throw 'Tile\'s already been taken';

        board[row][col].htmlTile.textContent = onClickNumber;
        board[row][col].tileValue = onClickNumber;
        board[row][col].tileToken = GameManager.playerInTurn;
        turnDisplayHTML.textContent = GameManager.playerInTurn.toString();
        GameManager.ManageGameTurn();
      });
      boardRow.appendChild(board[row][col].htmlTile);
    }
    boardDiv.appendChild(boardRow);
  }

  //Turn Display
  let turnDisplayHTML = document.createElement('p');
  turnDisplayHTML.className = "turnDisplay";
  turnDisplayHTML.textContent = "No one's turn";
  documentBody.appendChild(turnDisplayHTML);

  //Players
  let playersAreaHTML = document.createElement('div');
  playersAreaHTML.className = "playersArea";
  documentBody.appendChild(playersAreaHTML);

  GameManager.players.forEach(player  => {
    let playerHTML = document.createElement('div');
    playerHTML.className = "player"
    playersAreaHTML.appendChild(playerHTML);

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
        onClickPlayerValues.name = player.name;
        GameManager.playerInTurn = player.token;
        onClickNumber = player.numbers[i];
      });
      playerNumbersArrayHTML.appendChild(playerNumberHTML);
    }

  });









})();
