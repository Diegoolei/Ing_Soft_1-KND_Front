import React from 'react'
import { useSelector } from 'react-redux'
import {
  LOGIN_COMPONENT, REGISTER_COMPONENT, MAIN_MENU_COMPONENT, CREATE_LOBBY_COMPONENT,
  JOIN_LOBBY_COMPONENT, END_GAME_MSG_COMPONENT, ENDPOINT_SOCKET_TEST_COMPONENT, UPDATE_PROFILE_COMPONENT, CHANGE_NICK_ON_LOBBY
} from '../redux/componentController/componentControllerTypes'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import MainMenu from './mainMenu'
import EndGameMsg from './endGameMsg'
import EndpointSocketTest from './endpointSocketTest'
import UpdateUserProfile from './updateProfile'
import NewLobby from './newLobby'
import JoinLobby from './joinLobby'
import ChangeNickOnLobby from './changeNickLobby'

function ComponentController() {
  const currentScreen = useSelector(state => state.controller.screen)

  const getComponent = () => {
    switch (currentScreen) {
      case LOGIN_COMPONENT: return <LoginForm/>
      case REGISTER_COMPONENT: return <RegisterForm/>
      case MAIN_MENU_COMPONENT: return <MainMenu/>
      case CREATE_LOBBY_COMPONENT: return <NewLobby/>
      case JOIN_LOBBY_COMPONENT: return <JoinLobby/>
      case END_GAME_MSG_COMPONENT: return <EndGameMsg/>
      case ENDPOINT_SOCKET_TEST_COMPONENT: return <EndpointSocketTest/>
      case UPDATE_PROFILE_COMPONENT: return <UpdateUserProfile/>
      case CHANGE_NICK_ON_LOBBY: return <ChangeNickOnLobby/>
      default: return (
        <div>
          ERROR DEFAULT CASE COMPONENT LOADED
        </div>
      )
    }
  }

  return (
    <div>
      {getComponent()}
    </div>
  )
}

export default ComponentController