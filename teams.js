
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
    document.getElementById("pageTitle").innerHTML = teamName;
    document.getElementById("teamName").innerHTML = teamName + " - " + teamData["abbreviation"];
    document.getElementById("teamRecord").innerHTML = teamData["current_record"];
    document.getElementById("teamLocation").innerHTML = teamData["location"];
    document.getElementById("teamDescription").innerHTML = teamData["description"];
    document.getElementById("teamLogo").src = teamData["logo"];
    document.getElementById("teamLogo").alt = teamName + " Logo";
    document.getElementById("teamPlayers").innerHTML = createPlayerList(teamData["players"]);
}

function createTeamInfoPage(teamData){
    return `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <div class="card-body">
          <h5 class="card-title></h5>
        </div>
    `;
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
        <div class="card mb-4 shadow-sm">
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