const PlayerToken={
  even: Symbol("even"),
  odd: Symbol("odd"),
  none: Symbol("none")
};

const GameMode={
  PvP: Symbol("PvP"),
  PvCPU: Symbol("PvCP")
}

const Player=(name, token)=>{
  return name, token, score, isWinner, turn;
}

const Tile = (value, player) =>{
  return value, player;
}

const GameBoard = (()=>{

  const gameBoardSize = 3;
  let board = [[gameBoardSize],[gameBoardSize],[gameBoardSize]];
  for(let i = 0; i < gameBoardSize; ++i)
  {
    for(let k = 0; k < gameBoardSize; ++k)
    {
      board[i][k] = Tile(0,PlayerToken.none);
    }
  }

  return board;
})();



//Game Manager
const GameManager = (()=>{
  let gameBoard;
  let gameMode;
  let players=[2];
  let turn = 0;
  let score = [2];

  const StartGame = () => {
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

  return StartGame, ResetGame, SetUpGameMode, SetUpPlayers;

})();





GameManager.prototype.ManageGameTurn = function(){

}

GameManager.prototype.SetScore = function(){

}

GameManager.prototype.AnnounceWinner = function(){

}

GameManager.prototype.ResetGame = function(){

}
