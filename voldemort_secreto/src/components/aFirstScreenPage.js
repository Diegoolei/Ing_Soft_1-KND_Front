import React from 'react'
// import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useSelector, useDispatch } from 'react-redux'
import hp_logo from '../metaMedia/hp_logo.svg'
import { LOGIN_COMPONENT, REGISTER_COMPONENT, RULES_COMPONENT, ABOUT_COMPONENT } from '../redux/componentController/componentControllerTypes'
// import { FIRST_SCREEN_PAGE_COMPONENT, LOGIN_COMPONENT, REGISTER_COMPONENT, RULES_COMPONENT, ABOUT_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { changeScreen } from '../redux/reduxIndex'
// import { resetResponse, changeScreen, login, joinGame } from '../redux/reduxIndex'
// import music from '../metaMedia/hp-lofi.mp3'
import sing_in from '../metaMedia/interface/sign-in.svg' /*'../metaMedia/interface/sign-in.svg'*/
import doubts_button from '../metaMedia/interface/doubts-button.svg'
import regulation from '../metaMedia/interface/regulation.svg'
import log_in from '../metaMedia/interface/log-in.svg'
// import internet from '../metaMedia/interface/internet.svg'

function FirstScreenPage () {
  // const sessionState = useSelector(state => state.session)
  const dispatch = useDispatch()

  const switchLoginForm = () => {
    dispatch(changeScreen(LOGIN_COMPONENT))
  }

  const switchToRegister = () => {
    dispatch(changeScreen(REGISTER_COMPONENT))
  }

  const switchToRules = () => {
    dispatch(changeScreen(RULES_COMPONENT))
  }

  const switchToAbout = () => {
    dispatch(changeScreen(ABOUT_COMPONENT))
  }

function AppFirstScreen(){
  return (
    <header>
      {/* <div className="App-div-first-screen"> */}
        <div>
          <h1 className="title-first-screen">Secret Voldemort</h1>
        </div>
      <div className="App-div-first-screen">
        <div className="body-first-screen">
          <div className="icon-bar-first">
            <img src={hp_logo} className="Logo-hp" alt="logo" />
            {/* <button className="button_nav_bar" onClick={switchToHome}>
              <img src={internet} className="icon-2" alt="logo" /><br/>
              <h5 className="white">Home</h5>
            </button> */}
            <button className="button_nav_bar" onClick={switchToRegister}>
              <img src={sing_in} className="icon-approve" alt="logo" /><br/>
              <h5 className="white">Register</h5>
            </button>
            <button className="button_nav_bar" onClick={switchLoginForm}>
              <img src={log_in} className="icon-2" alt="logo" /><br/>
              <h5 className="white">Login</h5>
            </button>
            <button className="button_nav_bar" onClick={switchToRules}>
              <img src={regulation} className="icon-approve" alt="logo" /><br/>
              <h5 className="white">Rules</h5>
            </button>
            <button className="button_nav_bar" onClick={switchToAbout}>
              <img src={doubts_button} className="icon-2" alt="logo" /><br/>
              <h5 className="white">About</h5>
            </button>
            <img src={hp_logo} className="Logo-hp" alt="logo" />
          </div>
          <div className="App-div-lightsteelblue2">
            <h6 className="font-initial">Secret Voldemort is played by rounds. Each round has an election to form a government, <br></br>a legislative session to post a new proclamation and an executive action to <br></br>exercise the government power.</h6>
          </div>
          {/* <button className="button" onClick={skipToGame}>Skip to Game</button> */}
          {/* <button className="button" onClick={PlayMusic} >Play</button>
          <button className="button" onClick={PauseMusic}>Pause</button> */}
        </div>
        {/*<button className="button" onClick={() => skipToGame(1)}>Skip to Game 1</button>
        <button className="button" onClick={() => skipToGame(2)}>Skip to Game 2</button>
        <button className="button" onClick={() => skipToGame(3)}>Skip to Game 3</button>
        <button className="button" onClick={() => skipToGame(4)}>Skip to Game 4</button>
        <button className="button" onClick={() => skipToGame(5)}>Skip to Game 5</button> */}
      </div>
      <footer>
        <div className="App-div-footer">
          <h6 className="footer-font-white" >2020 Secret Voldemort | Creative Commons Attribution – No Comercial- ShareAlike 4.0 International</h6>
        </div>
      </footer>
    </header>
    
  )
}

  return(
    <header className="header-first-screen">
      <div>
        {AppFirstScreen()}
      </div>
    </header>
  ) 

}

export default FirstScreenPage