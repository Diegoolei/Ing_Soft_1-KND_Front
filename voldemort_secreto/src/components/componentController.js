import React from 'react'
import { useSelector } from 'react-redux'
import {
  LOGIN_REGISTER_COMPONENT, MAIN_MENU_COMPONENT, CREATE_LOBBY_COMPONENT,
  JOIN_LOBBY_COMPONENT
} from '../redux/componentController/componentControllerTypes'
import LoginRegisterForm from './loginRegisterForm'
import MainMenu from './mainMenu'

function ComponentController() {
  const currentScreen = useSelector(state => state.controller.screen)

  const getComponent = () => {
    switch (currentScreen) {
      case LOGIN_REGISTER_COMPONENT: return <LoginRegisterForm/>
      case MAIN_MENU_COMPONENT: return <MainMenu/>
    
      default: return (
        <div>
          EMPTY COMPONENT LOADED
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