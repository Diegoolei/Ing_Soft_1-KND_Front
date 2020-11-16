import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess, changeScreen, renderLobbyPage } from '../redux/reduxIndex'
import hp_logo from '../metaMedia/hp_logo.svg'
import { 
  LOGIN_COMPONENT,
  ENDPOINT_SOCKET_TEST_COMPONENT,
  UPDATE_PROFILE_COMPONENT,
  CREATE_LOBBY_COMPONENT,
  JOIN_LOBBY_COMPONENT,
  CHANGE_NICK_ON_LOBBY,
  SHOW_VOTATION_RESULTS_COMPONENT,
  GAME_COMPONENT
} from '../redux/componentController/componentControllerTypes'

console.log(hp_logo);

function Header() {
  // Import result is the URL of your image
  return <img src={hp_logo} alt="Logo" height="192" width="192"/>;
}

function Background(){
  return 
}

function MainMenu () {
  const lists = useSelector(state => state.joinlists)
  const dispatch = useDispatch()

  function logout() {
    // More stuff needed here: Maybe a signal to back?
    dispatch(logoutSuccess('placeholdermsg'))
    dispatch(changeScreen(LOGIN_COMPONENT))
  }

  function data() {
    dispatch(changeScreen(UPDATE_PROFILE_COMPONENT))
  }

  function joinlobby() {
    dispatch(renderLobbyPage(0))
    dispatch(changeScreen(JOIN_LOBBY_COMPONENT))
  }

  function show_votation_results() {
    dispatch(changeScreen(SHOW_VOTATION_RESULTS_COMPONENT))
  }

  function game() {
    dispatch(changeScreen(GAME_COMPONENT))
  }

  return (
    <header className="App-header-test">
      <div className="App-div"> 
        {Header()}
        {Background()}
        <h2>Main Menu</h2>
        <button className="button" onClick={() => dispatch(changeScreen(CREATE_LOBBY_COMPONENT))}>Create Lobby</button>
        <br/><button className="button" onClick={show_votation_results}>Show Votation Results</button>
        <br/><button className="button" onClick={joinlobby}>Join Lobby</button>
        <br/><button className="button" onClick={data}>Update User Data</button>
        <br/><button className="button">View History</button>
        <br/><button className="button" onClick={game}>Game</button>
        <br/><button className="button">Settings</button>
        <br/><button className="button" onClick={() => dispatch(changeScreen(ENDPOINT_SOCKET_TEST_COMPONENT))}>Endpoint & Socket Tests</button>
        <br/><button className="button" onClick={() => dispatch(changeScreen(CHANGE_NICK_ON_LOBBY))}>Change Nick on Lobby</button>
        <br/><button className="button" onClick={logout}>Log out</button>
      </div>
    </header>
  )
}

export default MainMenu