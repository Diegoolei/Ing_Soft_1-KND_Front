import React from 'react'
import { useDispatch } from 'react-redux'
import { joinGame } from '../redux/reduxIndex'

function Game () {
  const dispatch = useDispatch()
  
  return (
    <div>
      <h1>GAME</h1>
    </div>
  )
}

export default Game