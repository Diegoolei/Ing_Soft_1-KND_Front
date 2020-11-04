import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutSuccess, changeScreen } from '../redux/reduxIndex'
import { LOGIN_COMPONENT } from '../redux/componentController/componentControllerTypes'

function MainMenu () {
  const dispatch = useDispatch()

  function logout() {
    // More stuff needed here: Maybe a signal to back?
    dispatch(logoutSuccess('placeholdermsg'))
    dispatch(changeScreen(LOGIN_COMPONENT))
  }

  return (
    <div>
      <h1>MAIN MENU</h1>
      <br/><button >Create Lobby</button>
      <br/><button >Join Lobby</button>
      <br/><button >View History</button>
      <br/><button >Settings</button>
      <br/><button onClick={logout}>Log out</button>
    </div>
  )
}

export default MainMenu