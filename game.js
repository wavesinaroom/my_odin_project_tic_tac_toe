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


  players[0] = Player("Player 1", PlayerToken.even);
  players[1] = Player("Player 2", PlayerToken.odd);

  let playerInTurn = players[0];

  const ManageGameTurn = () => {

    if(playerInTurn==players[0])
    {
      playerInTurn=players[1];
    }else if(playerInTurn==players[1])
    {
      playerInTurn=players[0];
    }else{
      throw "invalid value for player turn";
    }

    ++turnCount;

    if(turnCount==turnNumber)
    {
      //EndGame;
    }
  }
  return /*StartGame, ResetGame, SetUpGameMode, SetUpPlayers,*/ {players,playerInTurn, ManageGameTurn};

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
        board[row][col].tileToken = GameManager.playerInTurn.token;
        GameManager.ManageGameTurn();
        alert(GameManager.playerInTurn.name);
        turnDisplayHTML.textContent = GameManager.playerInTurn.name;
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
        GameManager.playerInTurn = player;
        onClickNumber = player.numbers[i];
      });
      playerNumbersArrayHTML.appendChild(playerNumberHTML);
    }

  });









})();
