import React from 'react';

const NewLobby = () => {
  return (
    <header className="App-header" >
      <h2>
        Bienvenido al creador de salas
      </h2>

      <label>
        Rellena estos datos para crear tu sala
      </label>

      <form>
        <label>
          Nombre de la sala:
          <input type="text" name="name" />
        </label>
      </form>

      <label>
        Número de jugadores:
        <select>
          <option selected value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </label>

      <label>
        Nombre en partida:
          <input type="text" name="name" />
      </label>

    </header>
  )
}

export default NewLobby
