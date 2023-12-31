import {
  addNewPlayer,
  fetchAllPlayers,
  fetchSinglePlayer,
  removePlayer,
} from "./ajaxHelpers";

const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

export const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if (!playerList || !playerList.length) {
    playerContainer.innerHTML = "<h3>No players to display!</h3>";
    return;
  }

  // loop and place html for each 
  let playerContainerHTML = "";
  for (let i = 0; i < playerList.length; i++) {
    const pup = playerList[i];
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="delete-button" data-id=${pup.id}>Remove from roster</button>
      </div>
    `;
    playerContainerHTML += pupHTML;
  }

  // fill the `playerContainer` div with HTML we constructed 
  playerContainer.innerHTML = playerContainerHTML;
  
  let deleteButtons = [...document.getElementsByClassName('delete-button')];
  for (let i = 0; i < deleteButtons.length; i++)
  {
    let button = deleteButtons[i]
    button.addEventListener('click', async () =>
      {
        await removePlayer(button.dataset.id)
        let players = await fetchAllPlayers()
        renderAllPlayers(players)
      }
      );
  }

  let detailButtons = [...document.getElementsByClassName("detail-button")];

  for (let i = 0; i < detailButtons.length; i++)
  {
    const button = detailButtons[i];
    button.addEventListener("click", async () =>
      {
        let playerStats = await fetchSinglePlayer(button.dataset.id);
        renderSinglePlayer(playerStats);
      }
      );
  }
};

export const renderSinglePlayer = (playerObj) => {
  if (!playerObj || !playerObj.id) {
    playerContainer.innerHTML = "<h3>Player was not found!</h3>";
    return;
  }

  let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : "Unassigned"}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${
    playerObj.name
  } the puppy">
      <button id="see-all">Back to all players</button>
    </div>
  `;
  playerContainer.innerHTML = pupHTML;

  let backButton = document.getElementById("see-all");
  backButton.addEventListener("click", async () => {
    let players = await fetchAllPlayers();
    return renderAllPlayers(players);
  });
};

export const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;

  let form = document.querySelector("#new-player-form > form");
  form.addEventListener("submit", async (event) =>
  {
    event.preventDefault();
    let playerData = {
      name: form.elements.name.value,
      breed: form.elements.breed.value,
    };
    await addNewPlayer(playerData);

    let newPlayers = await fetchAllPlayers();

    renderAllPlayers(newPlayers);

    return playerData =
    {
      name: form.elements.name.value = '',
      breed: form.elements.breed.value = '',
    };
  });
};