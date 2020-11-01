import React from 'react'
import { useSelector } from 'react-redux'
import {
  LOGIN_COMPONENT, REGISTER_COMPONENT, MAIN_MENU_COMPONENT, CREATE_LOBBY_COMPONENT,
  JOIN_LOBBY_COMPONENT,
} from '../redux/componentController/componentControllerTypes'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import MainMenu from './mainMenu'

function ComponentController() {
  const currentScreen = useSelector(state => state.controller.screen)

  const getComponent = () => {
    switch (currentScreen) {
      case LOGIN_COMPONENT: return <LoginForm/>
      case REGISTER_COMPONENT: return <RegisterForm/>
      case MAIN_MENU_COMPONENT: return <MainMenu/>
      case CREATE_LOBBY_COMPONENT: return <div>Create Lobby Component not made yet</div>
      case JOIN_LOBBY_COMPONENT: return <div>Join Lobby Component not made yet</div>
    
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