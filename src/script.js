(async function () {
    await getGameData().then((data) => displayInformation(data));
})();

async function getGameData() {
    const response = await fetch(`https://api.diegog.io/game-today`);
    let { game } = await response.json();
    
    if (!game) {
      return false;
    }

    const homeGame = game.homeTeam.teamTricode === 'MIA';

    return {
      homeGame,
      city: game.homeTeam.teamCity,
      opponent: homeGame
        ? game.awayTeam.teamName 
        : game.homeTeam.teamName
    }
}

function displayInformation(gameData) {
  const gameElement = document.getElementById('game');
  const statementElement = document.getElementById('statement');

  const { statement, gameToday } = gameData
    ? 
      {
        statement: gameData.homeGame
          ? `and it's a fucking home game, against the ${gameData.opponent}`
          : `it's in ${gameData.city} against the fucking ${gameData.opponent}`,
        gameToday: 'YES'
      }
    : 
      {
        statement: 'there is no fucking game today',
        gameToday: 'NO'
      }

    gameElement.innerHTML = gameToday;
    statementElement.innerHTML = statement;
}
