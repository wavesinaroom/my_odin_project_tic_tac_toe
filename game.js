const PlayerToken={
  even: Symbol("even"),
  odd: Symbol("odd"),
  none: Symbol("none")
};

function Player(name, token, score){
  return name, token, score;
}

function Tile(value, player){
  return value, player;
}

function GameBoard (){

  const gameBoardSize = 3;
  let tiles = [[gameBoardSize],[gameBoardSize],[gameBoardSize]];

  for(let i = 0; i < gameBoardSize; ++i)
  {
    for(let k = 0; k < gameBoardSize; ++k)
    {
      this.tiles[i][k] = new Tile(0,none);
      console.log(this.tiles[i][k]);
    }
  }
  return tiles;
}
