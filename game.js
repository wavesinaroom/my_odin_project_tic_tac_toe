function GameBoard (){
  const tiles = [9];
  return tiles;
}

enum PlayerToken{
  naughts,
  crosses,
}

function Player(name:string, token:PlayerToken, score:int){
  return name, token, score;
}
