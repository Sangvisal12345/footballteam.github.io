document.addEventListener('DOMContentLoaded', () => {
  const playerForm = document.getElementById('player-form');
  const playerTableBody = document.querySelector('#player-table tbody');
  let players = [];
  let editMode = false;
  let editId = null;

  playerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('player-name').value;
      const position = document.getElementById('player-position').value;
      const age = document.getElementById('player-age').value;
      const nationality = document.getElementById('player-nationality').value;

      if (editMode) {
          players = players.map(player => player.id === editId ? { id: player.id, name, position, age, nationality } : player);
          editMode = false;
          editId = null;
      } else {
          const id = new Date().getTime().toString();
          players.push({ id, name, position, age, nationality });
      }

      playerForm.reset();
      renderPlayers();
  });

  playerTableBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit')) {
          const playerId = e.target.dataset.id;
          const player = players.find(p => p.id === playerId);
          document.getElementById('player-id').value = player.id;
          document.getElementById('player-name').value = player.name;
          document.getElementById('player-position').value = player.position;
          document.getElementById('player-age').value = player.age;
          document.getElementById('player-nationality').value = player.nationality;
          editMode = true;
          editId = playerId;
      } else if (e.target.classList.contains('delete')) {
          const playerId = e.target.dataset.id;
          players = players.filter(player => player.id !== playerId);
          renderPlayers();
      }
  });

  function renderPlayers() {
      playerTableBody.innerHTML = '';
      players.forEach(player => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${player.id}</td>
              <td>${player.name}</td>
              <td>${player.position}</td>
              <td>${player.age}</td>
              <td>${player.nationality}</td>
              <td>
                  <button class="edit" data-id="${player.id}">Edit</button>
                  <button class="delete" data-id="${player.id}">Delete</button>
              </td>
          `;
          playerTableBody.appendChild(row);
      });
  }
});
