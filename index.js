
fetch(
    "https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData"
).then((response) => {
    response.json().then((data) => {
        console.log(data);
        populatePage(data);
    });
});

function populatePage(data) {
    populateTeams(data);
    populateFeaturedGames(data);
}

function populateTeams(data) {
    // Extract the team names (keys) from the object
    const teamNames = Object.keys(data);
    const randomTeamNames = getRandomElements(teamNames, 3);
    const randomTeams = randomTeamNames.map(teamName => {
        return { [teamName]: data[teamName] };
    });

    console.log(randomTeams); // Output the randomly selected teams with their data

    count = 1;
    randomTeamNames.forEach(element => {
        console.log(data[element]);

        document.getElementById("teamName" + count).innerHTML = element + " - " + data[element]["abbreviation"];
        document.getElementById("teamRecord" + count).innerHTML = data[element]["current_record"];
        document.getElementById("teamLocation" + count).innerHTML = data[element]["location"];
        document.getElementById("moreDetails" + count).innerHTML = `<a type="button" class="btn btn-sm btn-outline-secondary" href="teams.html?name=${element}">More Info</a>`;

        console.log(data[element]["location"])

        count++;
    });
}

function populateFeaturedGames(data) {
    let gameslist = getGames(data);
    let randomGames = getRandomElements(Array.from(gameslist), 3);
    let gamesRow = document.getElementById("gamesRow");
    randomGames.forEach(x => {
        gamesRow.innerHTML += createGameCard(x);
    });
}

function getGames(data){
    let games = new Set();
    const teamsArray = Object.keys(data);
    teamsArray.forEach(element => {
        let gamesArray = Object.keys(data[element]["last_five_games"]);
        gamesArray.forEach(x => {
            games.add(data[element]["last_five_games"][x]);
        });
    });
    console.log(games);
    return games;
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

// Function to select 'num' elements at random from an array
function getRandomElements(array, num) {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, num); // Get the first 'num' elements
}