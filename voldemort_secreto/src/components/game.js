import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { joinGame, voteInGame } from '../redux/reduxIndex'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { changeScreen } from '../redux/reduxIndex'


function Game () {
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)
  const [active, setActive] = useState(false)

  function Vote () {
    confirmAlert({
      title: 'It is time to Vote!',
      message: 'Vote Lumos to accept government or Nox to reject it',
      buttons: [
        {
          label: 'Lumos',
          onClick: () => dispatch(voteInGame(true, game.game_id))
        },
        {
          label: 'Nox',
          onClick: () => dispatch(voteInGame(false, game.game_id))
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
      {/*<button onClick={() => setActive(!active)}>Vote</button>*/}
        <div class="custom-ui">
          <br/><button className="button" onClick={Vote}>Vote</button>    
        </div>
      {/*<br/>{active ? 
          </div> : null} */}
      <br/><button className="button" onClick={BackToMenu}>Back to Main Menu</button>
    </div>
  )
}

export default Game
