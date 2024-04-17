fetch(
    "https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData"
).then((response) => {
    response.json().then((data) => {
        populatePage(data);
    });
});

let games = new Set();

function populatePage(data) {
    let gameslist = getGames(data)
    let gamesRow = document.getElementById("gamesRow");
    gamesRow.innerHTML = "";
    gameslist.forEach(x => {
        gamesRow.innerHTML += createGameCard(JSON.parse(x));
    });
}

function createGameCard(gameData){
    return `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${gameData["game_title"]}</h5>
                        <p class="card-text">Date: <span class="text-muted">${gameData["game_date"]}</span></p>
                        <p class="card-text">${gameData["home_team"]["team_name_abbreviation"]} - ${gameData["home_team"]["score"]}</p>
                        <p class="card-text">${gameData["away_team"]["team_name_abbreviation"]} - ${gameData["away_team"]["score"]}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a type="button" class="btn btn-sm btn-outline-secondary" href="${gameData["game_cast"]}">Watch Gamecast</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
}

function getGames(data){
    const teamsArray = Object.keys(data);
    teamsArray.forEach(element => {
        let gamesArray = Object.keys(data[element]["last_five_games"]);
        gamesArray.forEach(x => {
            addToSet(data[element]["last_five_games"][x]);
        });
    });
    console.log(games);
    return games;
}

function addToSet(obj) {
    const serialized = JSON.stringify(obj);
    games.add(serialized);
  }
  