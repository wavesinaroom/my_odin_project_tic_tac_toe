const GameMode={
  PvP: Symbol("PvP"),
  PvCPU: Symbol("PvCPU")
}

  let players = [];
  players[0] = Player("Player 1", PlayerToken.even);
  players[1] = Player("Player 2", PlayerToken.odd);

  let playerInTurn = players[0];

  this.ManageGameTurn = () => {

    if(this.playerInTurn==players[0])
    {
      this.playerInTurn=players[1];
    }else if(this.playerInTurn==players[1])
    {
      this.playerInTurn=players[0];
    }else{
      throw "invalid value for player turn";
    }
  }

  export /*StartGame, ResetGame, SetUpGameMode, SetUpPlayers,*/ {players, playerInTurn, ManageGameTurn};
