import React from 'react'
import { useSelector } from 'react-redux'

import {
  FIRST_SCREEN_PAGE_COMPONENT,
  RULES_COMPONENT,
  ABOUT_COMPONENT,
  LOGIN_COMPONENT,
  REGISTER_COMPONENT,
  MAIN_MENU_COMPONENT,
  CREATE_LOBBY_COMPONENT,
  JOIN_LOBBY_COMPONENT,
  END_GAME_MSG_COMPONENT,
  ENDPOINT_SOCKET_TEST_COMPONENT,
  UPDATE_PROFILE_COMPONENT,
  CHANGE_NICK_ON_LOBBY,
  LOBBY_COMPONENT,
  GAME_COMPONENT,
  SHOW_VOTATION_RESULTS_COMPONENT,
  JOIN_GAME_COMPONENT
} from '../redux/componentController/componentControllerTypes'

import FirstScreenPage from './aFirstScreenPage'
import Rules from './gameRules'
import About from './about'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import MainMenu from './mainMenu'
import EndGameMsg from './endGameMsg'
import EndpointSocketTest from './endpointSocketTest'
import UpdateUserProfile from './updateProfile'
import NewLobby from './newLobby'
import JoinLobby from './joinLobby'
import JoinGame from './joinGame'
import ChangeNickOnLobby from './changeNickLobby'
import Lobby from './lobby'
import Game from './game'
import ShowVotationResults from './showVotationResults'

function ComponentController() {
  const currentScreen = useSelector(state => state.controller.screen)

  const getComponent = () => {
    switch (currentScreen) {
      case FIRST_SCREEN_PAGE_COMPONENT: return <FirstScreenPage/>
      case RULES_COMPONENT: return <Rules/>
      case ABOUT_COMPONENT: return <About/>
      case LOGIN_COMPONENT: return <LoginForm/>
      case REGISTER_COMPONENT: return <RegisterForm/>
      case MAIN_MENU_COMPONENT: return <MainMenu/>
      case CREATE_LOBBY_COMPONENT: return <NewLobby/>
      case JOIN_LOBBY_COMPONENT: return <JoinLobby/>
      case JOIN_GAME_COMPONENT: return <JoinGame/>
      case END_GAME_MSG_COMPONENT: return <EndGameMsg/>
      case ENDPOINT_SOCKET_TEST_COMPONENT: return <EndpointSocketTest/>
      case UPDATE_PROFILE_COMPONENT: return <UpdateUserProfile/>
      case CHANGE_NICK_ON_LOBBY: return <ChangeNickOnLobby/>
      case LOBBY_COMPONENT: return <Lobby/>
      case GAME_COMPONENT: return <Game/>
      case SHOW_VOTATION_RESULTS_COMPONENT: return <ShowVotationResults/>
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