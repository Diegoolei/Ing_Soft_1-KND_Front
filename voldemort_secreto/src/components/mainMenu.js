import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logoutSuccess, changeScreen, renderLobbyPage, renderGamePage } from '../redux/reduxIndex'
import hp_logo from '../metaMedia/hp_logo.svg'
import { 
  LOGIN_COMPONENT,
  ENDPOINT_SOCKET_TEST_COMPONENT,
  UPDATE_PROFILE_COMPONENT,
  CREATE_LOBBY_COMPONENT,
  JOIN_LOBBY_COMPONENT,
  JOIN_GAME_COMPONENT
} from '../redux/componentController/componentControllerTypes'
import AvadaKedavra from './avadaKedavra'
import { setVictimCandidatesToAvadaKedavra } from '../redux/game/avadaKedavra/avadaKedavraActions'

function MainMenu () {
  const dispatch = useDispatch()
  const [active, setactive] = useState(false)

  function logout() {
    dispatch(logoutSuccess('placeholdermsg'))
    dispatch(changeScreen(LOGIN_COMPONENT))
  }

  function joinlobby() {
    dispatch(renderLobbyPage(0))
    dispatch(changeScreen(JOIN_LOBBY_COMPONENT))
  }

  function joinGame() {
    dispatch(renderGamePage(0))
    dispatch(changeScreen(JOIN_GAME_COMPONENT))

  }

  return (
    <header className="App-header-test">
      <div className="App-div"> 
        <img src={hp_logo} alt="Logo" height="192" width="192"/>
        <h2>Main Menu</h2>
        <button className="button" onClick={() => dispatch(changeScreen(CREATE_LOBBY_COMPONENT))}>Create Lobby</button>
        <br/><button className="button" onClick={joinlobby}>Join Lobby</button>
        <br/><button className="button" onClick={joinGame}>Rejoin Game</button>
        <br/><button className="button" onClick={() => dispatch(changeScreen(UPDATE_PROFILE_COMPONENT))}>Profile & Settings</button>
        {/* <br/><button className="button">View History (not available)</button> */}
        {/* <br/><button className="button" onClick={() => dispatch(changeScreen(ENDPOINT_SOCKET_TEST_COMPONENT))}>Endpoint & Socket Tests</button> */}

        {/* <br/><button className="buttom" onClick={() => dispatch(setVictimCandidatesToAvadaKedavra(["diego", "shiro", "cande", "agus", "sofi"]))}>Set Vitctim Candidates to AK</button>
        <br/><button className="button" onClick={() => setactive(!active)}>Switch AvadaKedavra</button>
        {active ? <AvadaKedavra/> : null} */}

        <br/><button className="button" onClick={logout}>Log out</button>
      </div>
    </header>
  )
}

export default MainMenu
