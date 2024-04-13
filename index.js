
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

        console.log(data[element]["location"])

        count++;
    });
}

function populateFeaturedGames(data) {

}

// Function to select 'num' elements at random from an array
function getRandomElements(array, num) {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, num); // Get the first 'num' elements
}