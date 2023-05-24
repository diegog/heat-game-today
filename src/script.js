(async function () {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let date = new Date(new Date().toLocaleDateString("en-US", { timeZone: tz })).toISOString().split('T')[0];;
    const response = await fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${date}&team_ids[]=16`);
    const games = await response.json()
    let game = false;
    if (games.data[0]){
        game = games.data[0]
    }
    let display = {};
    if (game) {
        statement = game.home_team.city === 'Miami'
            ? `and it's a fucking home game, against the ${game.visitor_team.name}`
            : `it's in ${game.home_team.city} against the fucking ${game.home_team.name}`
  
      display = {
        game: 'YES',
        statement
      }
    }
    else {
      display = {
        game: 'NO',
        statement: 'there is no fucking game today'
      }
    }
    
    document.getElementById('game').innerHTML = display.game;
    document.getElementById('statement').innerHTML = display.statement;
})();
