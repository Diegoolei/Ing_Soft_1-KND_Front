import React from 'react'
import { useDispatch } from 'react-redux'
import { joinGame, leaveLobby } from '../redux/reduxIndex'

function Lobby () {
  const dispatch = useDispatch()
  
  return (
    <div>
      <h1>MAIN LOBBY</h1>
      <button onClick={() => dispatch(leaveLobby())}>Leave Lobby</button>
    </div>
  )
}

export default Lobby