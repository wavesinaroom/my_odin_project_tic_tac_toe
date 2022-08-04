documentBody = document.body;

const Tile = (tileValue, tileToken, htmlTile) =>{
  return {tileValue, tileToken, htmlTile};
}

const GameBoard = (()=>{

  const gameBoardSize = 3;

  let board = [[gameBoardSize],[gameBoardSize],[gameBoardSize]];
  let boardDiv = document.createElement('div');
  boardDiv.className = "boardDiv";
  documentBody.appendChild(boardDiv);


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
  turnDisplayHTML.textContent = GameManager.playerInTurn.name;
  documentBody.appendChild(turnDisplayHTML);

  //Players
  let playersAreaHTML = document.createElement('div');
  playersAreaHTML.className = "playersArea";
  documentBody.appendChild(playersAreaHTML);

  let onClickNumber;

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
        /*if(player!=GameManager.playerInTurn)
        {
          alert('Not your turn yet');
          return;
        }*/
        onClickNumber = player.numbers[i];
      });
      playerNumbersArrayHTML.appendChild(playerNumberHTML);
    }
  });
})();
