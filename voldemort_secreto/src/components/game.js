import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { joinGame, voteInGame } from '../redux/reduxIndex'
import MainMenu from './mainMenu'
import processSocketMessage from '../redux/game/socketMsgProcessor'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { changeScreen } from '../redux/reduxIndex'


function Game () {
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)
  const vote = useSelector(state => state.voteInGame)
  const [active, setActive] = useState(false)

  function Vote () {
    confirmAlert({
      title: 'It is time to Vote',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Lumos',
          onClick: voteInGame(1, game.game_id)
        },
        {
          label: 'Nox',
        }
      ]
    });
  }
  
  function BackToMenu() {
    dispatch(changeScreen(MAIN_MENU_COMPONENT))
  }

  return (
    <div>
      <h1>GAME</h1>
      <button onClick={() => setActive(!active)}>It's time to Vote!</button>
      <br/>{active ? 
        <div>
          <br/><button className="button" onClick={Vote}>It's time to Vote!</button>
          <br/><button className="button" onClick={BackToMenu}>Back to Main Menu</button>
        </div> : null}
      {active ? <MainMenu/> : null}
    </div>
  )
}

export default Game
