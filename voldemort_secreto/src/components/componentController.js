import React from 'react'
import { useSelector } from 'react-redux'
import {
  LOGIN_COMPONENT, REGISTER_COMPONENT, MAIN_MENU_COMPONENT, CREATE_LOBBY_COMPONENT,
  JOIN_LOBBY_COMPONENT, END_GAME_MSG_COMPONENT, ENDPOINT_SOCKET_TEST_COMPONENT, UPDATE_PROFILE_COMPONENT
} from '../redux/componentController/componentControllerTypes'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import MainMenu from './mainMenu'
import EndGameMsg from './endGameMsg'
import EndpointSocketTest from './endpointSocketTest'
import UpdateUserProfile from './updateProfile'
import NewLobby from './newLobby'

function ComponentController() {
  const currentScreen = useSelector(state => state.controller.screen)

  const getComponent = () => {
    switch (currentScreen) {
      case LOGIN_COMPONENT: return <LoginForm/>
      case REGISTER_COMPONENT: return <RegisterForm/>
      case MAIN_MENU_COMPONENT: return <MainMenu/>
      case CREATE_LOBBY_COMPONENT: return <NewLobby/>
      case JOIN_LOBBY_COMPONENT: return <div>Join Lobby Component not made yet</div>
      case END_GAME_MSG_COMPONENT: return <EndGameMsg/>
      case ENDPOINT_SOCKET_TEST_COMPONENT: return <EndpointSocketTest/>
      case UPDATE_PROFILE_COMPONENT: return <UpdateUserProfile/>
      default: return (
        <div>
          ERROR DEFAULT CASE COMPONENT LOADED
        </div>
      )
    }
  }

  return (
    <div>
      Current Component Loaded: {currentScreen}
      {getComponent()}
    </div>
  )
}

export default ComponentController