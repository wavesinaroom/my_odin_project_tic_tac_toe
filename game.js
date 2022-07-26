const PlayerToken={
  even: Symbol("even"),
  odd: Symbol("odd"),
  none: Symbol("none")
};

const Player=(name, token, score)=>{
  return name, token, score;
}

const Tile = (value, player) =>{
  return value, player;
}

const GameBoard = (()=>{

  const gameBoardSize = 3;
  let tiles = [[gameBoardSize],[gameBoardSize],[gameBoardSize]];

})();

GameBoard.prototype.SetsBoard = function () {
  for(let i = 0; i < gameBoardSize; ++i)
  {
    for(let k = 0; k < gameBoardSize; ++k)
    {
      this.tiles[i][k] = Tile(0,PlayerToken.none);
    }
  }
  return this.tiles;
};


//Game Manager
const GameManager = (()=>{
  //Starts game
  //Sets up game mode P vs P or P vs CPU
  //Sets up players
  //Manages turns
  //Assigns scores
  //Announces winner
  //Resets game
})();

GameManager.prototype.StartGame = function(){

}

GameManager.SetupGameMode
