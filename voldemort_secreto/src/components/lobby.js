import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { joinGame, leaveLobby } from '../redux/reduxIndex'

function Lobby () {
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()

  const startGameButton = () => <button className="button" onClick={() => console.log("Doing nothing!")}>Start Game</button>

  const formatedPlayer = nick => <li key={nick}> {nick} ({game.player_array.[nick].connected ? "connected" : "disconnected"})</li>

  const getPlayerLists = () => {
    let players = []
    for (let nick in game.player_array) {
      players.push(formatedPlayer(nick))
    }
    return <ul>{players}</ul>
  }
  
  return (
    <div>
      <h2>Lobby: {game.lobby_name}</h2>
      <p>Currently on this lobby:</p>
      {getPlayerLists()}
      <button className="button" onClick={() => dispatch(leaveLobby(game.lobby_id))}>Leave Lobby</button>
      {game.is_owner ? startGameButton() : null}
    </div>
  )
}

export default Lobby