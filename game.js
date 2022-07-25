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

  for(let i = 0; i < gameBoardSize; ++i)
  {
    for(let k = 0; k < gameBoardSize; ++k)
    {
      tiles[i][k] = Tile(0,none);
      console.log(tiles[i][k]);
    }
  }
  return tiles;
})();

//Game Manager
