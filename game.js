function GameBoard (){
  const tiles = [9];
  return tiles;
}

enum PlayerToken{
  even,
  odd,
}

function Player(name:string, token:PlayerToken, score:int){
  return name, token, score;
}
