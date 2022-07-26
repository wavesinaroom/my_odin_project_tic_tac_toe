const PlayerToken={
  even: Symbol("even"),
  odd: Symbol("odd"),
  none: Symbol("none")
};

const GameMode={
  PvP: Symbol("PvP"),
  PvCPU: Symbol("PvCP")
}

const Player=(name, token, score, winner)=>{
  return name, token, score, winner;
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
  let players = [2];
  let turn = 0;
  let score = [2];

  const StartGame = () => {
    if(gameBoard==null)
    {
      gameBoard = GameBoard();
    }else{
      return;
    }
  }

  return(StartGame);

})();


GameManager.prototype.SetUpGameMode = function(){

}

GameManager.prototype.SetUpPlayers = function (){

}

GameManager.prototype.ManageGameTurn = function(){

}

GameManager.prototype.SetScore = function(){

}

GameManager.prototype.AnnounceWinner = function(){

}

GameManager.prototype.ResetGame = function(){

}
