import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutSuccess, changeScreen } from '../redux/reduxIndex'
import { 
  LOGIN_COMPONENT,
  ENDPOINT_SOCKET_TEST_COMPONENT,
  UPDATE_PROFILE_COMPONENT,
  CREATE_LOBBY_COMPONENT,
  JOIN_LOBBY_COMPONENT
} from '../redux/componentController/componentControllerTypes'

function MainMenu () {
  const dispatch = useDispatch()

  function logout() {
    // More stuff needed here: Maybe a signal to back?
    dispatch(logoutSuccess('placeholdermsg'))
    dispatch(changeScreen(LOGIN_COMPONENT))
  }

  function data() {
    dispatch(changeScreen(UPDATE_PROFILE_COMPONENT))
  }
  return (
    <div>
      <h1>MAIN MENU</h1>
      <br/><button onClick={() => dispatch(changeScreen(CREATE_LOBBY_COMPONENT))}>Create Lobby</button>
      <br/><button onClick={() => dispatch(changeScreen(JOIN_LOBBY_COMPONENT))}>Join Lobby</button>
      <br/><button onClick={data}>Update User Data</button>
      <br/><button >View History</button>
      <br/><button >Settings</button>
      <br/><button onClick={() => dispatch(changeScreen(ENDPOINT_SOCKET_TEST_COMPONENT))}>Endpoint & Socket Tests</button>
      <br/><button onClick={logout}>Log out</button>
    </div>
  )
}

export default MainMenu