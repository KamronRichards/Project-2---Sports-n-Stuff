
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
}

function populateTeams(data) {
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
                <button type="button" class="btn btn-sm btn-outline-secondary">View Players</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }