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
  SELECT_DIRECTOR
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

  return (
    <header className="App-header-test">
      <div className="App-div"> 
        {Header()}
        {Background()}
        <h2>Main Menu</h2>
        <button className="button" onClick={() => dispatch(changeScreen(CREATE_LOBBY_COMPONENT))}>Create Lobby</button>
        <br/><button className="button" onClick={joinlobby}>Join Lobby</button>
        <br/><button className="button" onClick={data}>Setting</button>
        <br/><button className="button">In construction... View History</button>
        <br/><button className="button" onClick={() => dispatch(changeScreen(ENDPOINT_SOCKET_TEST_COMPONENT))}>Endpoint & Socket Tests</button>
        {/*<br/><button className="button" onClick={() => dispatch(changeScreen(SELECT_DIRECTOR))}>Select Director</button>*/}
        <br/><button className="button" onClick={logout}>Log out</button>
      </div>
    </header>
  )
}

export default MainMenu