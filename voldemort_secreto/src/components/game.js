import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteInGame } from '../redux/reduxIndex'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'


function Game() {
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)
  const [active, setActive] = useState(false)

  function Vote() {
    confirmAlert({
      title: 'It is time to Vote!',
      message: 'Vote Lumos to accept government or Nox to reject it',
      buttons: [{
        label: 'Lumos',
        onClick: () => dispatch(voteInGame(true, game.game_id))
      },
      {
        label: 'Nox',
        onClick: () => dispatch(voteInGame(false, game.game_id))
      }
      ]
    })
  }

  return (
    <div>
      <h1>GAME</h1>
      <div class="custom-ui">
        <br/><button className="button" onClick={Vote}>Vote</button>
      </div>
    </div>
  )
}

export default Game
