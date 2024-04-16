// Get the URL of the current page
const url = new URL(window.location.href);

// Get the search parameters from the URL
const searchParams = url.searchParams;

// Get a specific query parameter value by name
const parameterValue = searchParams.get('parameterName');

// Example: Get the value of a query parameter named 'id'
const teamName = searchParams.get('name');
console.log(teamName); // Output the value of the 'id' parameter

fetch("https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData").then((response) => {
    response.json().then((data) => {
        console.log(data);
        populatePage(teamName, data);
    });
});

function populatePage(teamName, data) {
    if (teamName) {
        populateTeamPage(teamName, data);
    } else {
        populateTeams(data);
    }
}

function populateTeamPage(teamName, data) {
    const teamData = data[teamName];
    console.log(teamData);
    document.getElementById("pageTitle").innerHTML = `${teamName} - ${teamData["abbreviation"]}`;
    document.getElementById("teams").innerHTML += createTeamInfoPage(teamData);
    document.getElementById("teamInfo").innerHTML += teamInfoHtml(teamData);
    document.getElementById("lastFiveGames").innerHTML += lastFiveGamesHtml(teamData["last_five_games"]);
    document.getElementById("teamRoster").innerHTML += rosterHtml(teamData["roster"]);

}
function lastFiveGamesHtml(lastFiveGames){
  let output = `<h4>Last Five Games</h4>
  <div class="row">`;
  Object.keys(lastFiveGames).forEach(game => {
    output+=createGameCard(lastFiveGames[game]);
  });
  return output += `</div>`;
}

function createGameCard(gameData){
  return `
          <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
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
  `
}

function createTeamInfoPage(){
  return `
  <div class="col-12 card mb-3" id="teamInfo">
  </div>
  <div class="col-12 card mb-3" id="lastFiveGames">
  </div>
  <div class="col-12 card card-body mb-3" id="teamRoster">
  </div>
  `;
}

function teamInfoHtml(teamData){
  return `
  <h4 class="card-title">Team Statistics</h4>
  <div class="row">
  <div class="col-12 col-md-3">
    <img src="${teamData["logo_light"]}" class="img-fluid" alt="${teamData["team_name"]} Logo">
  </div>
  <div class="col-12 col-md-3 card-body">
    <p class="card-text">Location: <span class="text-muted">${teamData["location"]}</span></p>
    <p class="card-text">Record: <span class="text-muted">${teamData["current_record"]}</span></p>
    <p class="card-text">Rebounds Per Game: <span class="text-muted">${teamData["statistics"]["avgRebounds"]["value"].toFixed(2)}</span></p>
    <p class="card-text">Assist To Turnover Ratio: <span class="text-muted">${teamData["statistics"]["assistTurnoverRatio"]["value"].toFixed(2)}</span></p>
    <p class="card-text">Assists Per Game: <span class="text-muted">${teamData["statistics"]["avgAssists"]["value"].toFixed(2)}</span></p>
  </div>
  <div class="col-12 col-md-3 card-body">
    <p class="card-text">Fouls Per Game: <span class="text-muted">${teamData["statistics"]["avgFouls"]["value"].toFixed(2)}</span></p>
    <p class="card-text">Free Throw Percentage: <span class="text-muted">${teamData["statistics"]["freeThrowPct"]["value"].toFixed(2)}</span></p>
    <p class="card-text">3-Point Field Goal Percentage: <span class="text-muted">${teamData["statistics"]["threePointPct"]["value"].toFixed(2)}</span></p>
    <p class="card-text">Points Per Game: <span class="text-muted">${teamData["statistics"]["avgPoints"]["value"].toFixed(2)}</span></p>
  </div>
  <div class="col-12 col-md-3 card-body">
  <p class="card-text">Turnovers Per Game: <span class="text-muted">${teamData["statistics"]["avgTurnovers"]["value"].toFixed(2)}</span></p>
  <p class="card-text">Field Goal Percentage: <span class="text-muted">${teamData["statistics"]["fieldGoalPct"]["value"].toFixed(2)}</span></p>
  <p class="card-text">Blocks Per Game: <span class="text-muted">${teamData["statistics"]["avgBlocks"]["value"].toFixed(2)}</span></p>
  <p class="card-text">Steals Per Game: <span class="text-muted">${teamData["statistics"]["avgSteals"]["value"].toFixed(2)}</span></p>
</div>
  </div>
  `;
}

function rosterHtml(playerData){
  console.log(playerData);
  let output = `              <h4 class="card-title">Team Roster</h4>
  <div class="table-responsive">
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Weight</th>
      <th scope="col">Height</th>
      <th scope="col">Age</th>
      <th scope="col">Birthplace</th>
      <th scope="col">Number</th>
      <th scope="col">Position</th>
    </tr>
  </thead>
  <tbody>`;
  console.log(Object.keys(playerData));
  Object.keys(playerData).forEach(player => {
    console.log(playerData[player]);
    output+=`
  <tr>
    <th scope="row">${playerData[player]["name"]}</th>
    <td>${playerData[player]["weight"]}</td>
    <td>${playerData[player]["height"]}</td>
    <td>${playerData[player]["age"]}</td>
    <td>${playerData[player]["birthplace"]}</td>
    <td>${playerData[player]["jersey"]}</td>
    <td>${playerData[player]["position_full"]}</td>
  </tr>
    `;});
  return output+=`</tbody>
  </table>
  </div>`;
}

function populateTeams(data) {

    document.getElementById("pageTitle").innerHTML = "Teams";
    // Extract the team names (keys) from the object
    const teamNames = Object.keys(data);

    count = 1;
    teamNames.forEach(element => {
        console.log(data[element]);
        document.getElementById("teams").innerHTML += createTeamCard(element, data[element]["current_record"], data[element]["location"], data[element]["abbreviation"]);
        count++;
    });
}

// Function to create a team card element
function createTeamCard(teamName, teamRecord, teamLocation, teamAbbreviation) {
    return `
      <div class="col-md-4">
        <div class="card mb-4 shadow">
          <div class="card-body">
            <h5 class="card-title">${teamName} - ${teamAbbreviation}</h5>
            <p class="card-text">Season Record: <span class="text-muted">${teamRecord}</span></p>
            <p class="card-text">Location: <span class="text-muted">${teamLocation}</span></p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a type="button" class="btn btn-sm btn-outline-secondary" href="/teams.html?name=${teamName}">More Info</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }