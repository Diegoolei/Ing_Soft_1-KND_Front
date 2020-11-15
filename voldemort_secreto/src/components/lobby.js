import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { leaveLobby, startGame, joinGame } from '../redux/reduxIndex'
import processSocketMessage from '../redux/game/socketMsgProcessor'

function Lobby () {
  const game = useSelector(state => state.game)
  const unprocessed_socket_messages = useSelector(state => state.socket.messages)
  const dispatch = useDispatch()


  const startGameButton = () => <button className="button" onClick={() => dispatch(startGame(game.lobby_id))}>Start Game</button>

  const formatedPlayer = nick => <li key={nick}> {nick} ({game.player_array.[nick].connected ? "connected" : "disconnected"})</li>

  const getPlayerLists = () => {
    let players = []
    for (let nick in game.player_array) {
      players.push(formatedPlayer(nick))
    }
    return <ul>{players}</ul>
  }

  if (unprocessed_socket_messages.length !== 0) {
    dispatch(processSocketMessage(unprocessed_socket_messages[0]))
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