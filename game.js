documentBody = document.body;

const PlayerToken={
  even: Symbol("even"),
  odd: Symbol("odd"),
  none: Symbol("none")
};

const GameMode={
  PvP: Symbol("PvP"),
  PvCPU: Symbol("PvCPU")
}

const Player=(name, token)=>{
  return name, token, score, isWinner, turn;
}

const Tile = (tileValue, playerToken, htmlTile) =>{
  return {tileValue, playerToken, htmlTile};
}

const GameBoard = (()=>{

  const gameBoardSize = 3;

  let board = [[gameBoardSize],[gameBoardSize],[gameBoardSize]];
  let boardDiv = document.createElement('div');
  boardDiv.className = "boardDiv";
  documentBody.appendChild(boardDiv);

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
        let inputNumber = prompt("Enter your number");
        board[row][col].htmlTile.textContent = inputNumber;
        board[row][col].tileValue = inputNumber;
        //playerToken = GameManager.player playing
        alert('yo');
      });
      boardRow.appendChild(board[row][col].htmlTile);
    }
    boardDiv.appendChild(boardRow);
  }
})();



/*
//Game Manager
const GameManager = (()=>{
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

  const ManageGameTurn = () => {
    if(turn==numberGameTurn)
    {
      if(players[0].score>players[1].score)
      {
        console.log("Winner: " + players[0].name);
      }else if(players[1].score>players[0].score)
      {
        console.log("Winner: " + players[1].name);
      }
    }

    //Check sum in cols
    for(let i = 0 ; i < gameBoardSize; ++i)
    {
      if(board[i][0]+board[i][1]+board[i][2]==scorePointSum)
      {
        //score a point to a player
      }else if(board[i][0]+board[1][i]+board[i][2]==scorePointSum)
      {
        //score a point to a player
      }

    }

    if(players[0].turn == true && players[1]. turn == true)
    {
      ++turn;
    }else
    {
      return;
    }
  }

  return StartGame, ResetGame, SetUpGameMode, SetUpPlayers, ManageGameTurn;

})();
*/
