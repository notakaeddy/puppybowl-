import { renderNewPlayerForm, } from "./renderHelpers";

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-ET-WEB-PT-D";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

export const fetchAllPlayers = async () => {
  try {
    let response = await fetch(`${APIURL}/players`);
    let result = await response.json();
    if (result.error) throw result.error;
    return result.data.players;
  } catch (error) {
    console.log("There was an error:", error);
  }
};

export const fetchSinglePlayer = async (playerId) => {
  try {
    let response = await fetch(`${APIURL}/players/${playerId}`);
    let result = await response.json();
    return result.data.player;
  } catch (error) {
    console.log("There was an error:", error);
  }
};

export const addNewPlayer = async (playerObj) => {
  try {
    let response = await fetch(`${APIURL}/players`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: playerObj.name,
          breed: playerObj.breed,
      }),
    });
    let result = await response.json();
    return result.data.players;
  } catch (error) {
    console.log("There was an error:", error);
  }
};

export const removePlayer = async (playerId) => {
  
    await fetch(`${APIURL}/players`, {
        method: 'DELETE'
    });
    let response = await fetch(`${APIURL}/players/${playerId}`, {
        method: "DELETE",
    })
    const result = await response.json();
    console.log(result)
};