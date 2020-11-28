import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import nimbus from '../metaMedia/nimbus.svg'
import { LOGIN_COMPONENT, REGISTER_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { resetResponse, changeScreen } from '../redux/reduxIndex'
// import music from '../metaMedia/hp-lofi.mp3'
import approve from '../metaMedia/interface/approve.svg'
import { Icon } from '@material-ui/core'

function FirstScreenPage () {
  const sessionState = useSelector(state => state.session)
  const dispatch = useDispatch()

  const switchLoginForm = () => {
    dispatch(changeScreen(LOGIN_COMPONENT))
  }

  const switchToRegister = () => {
    dispatch(changeScreen(REGISTER_COMPONENT))
  }

  // function skipToGame() {
  //   dispatch(login("user1@mail.com", "12345678"))
  //   setTimeout(() => dispatch(joinGame(1)), 1000)
  // }


function AppFirstScreen(){
  return (
    <header>
      <div className="App-div-first-screen">
        {/* <img src={nimbus} className="App-logo" alt="logo" /> */}
        <div>
          <h1 className="title-first-screen">Secret Voldemort</h1>
        </div>
      </div>
      <div className="icon-bar-first">
        {/* ICON BAR */}
        {/* <Icon></Icon> */}
        <button className="icon-approve-svg">
          <img src={approve} className="icon-approve" alt="logo" />
        </button>
        <button className="button_nav_bar" onClick={switchToRegister}>
          <img src={approve} className="icon-approve" alt="logo" /><br/>
          <h7 className="white">Register</h7>
        </button>
        {/* <a><i className="icon-appove"></i></a> 
        <a><i className="icon-appove"></i></a> 
        <a><i className="icon-appove"></i></a>
        <a><i className="icon-appove"></i></a>
        <a class="active"><i className="icon-appove"></i></a> */}
        {/* <a href="icon-appove"><i className="icon-appove"></i></a> 
        <a href="icon-appove"><i class="icon-appove"></i></a> 
        <a href="icon-appove"><i class="icon-appove"></i></a>
        <a href="icon-appove"><i class="icon-appove"></i></a>
        <a class="active" href="icon-appove"><i class="icon-appove"></i></a> */}
      </div>
      <div className="App-div-first-screen">
        <body className="body-first-screen">
          <div className="App-div-lightsteelblue">
            <h6>Developer: Group KND</h6>
          </div>
          <br></br>
          <button className="button" onClick={switchLoginForm}>Login</button>
          <button className="button" onClick={switchToRegister}>Register</button> 
          {/* <button className="button" onClick={skipToGame}>Skip to Game</button> */}
          {/* <button className="button" onClick={PlayMusic} >Play</button>
          <button className="button" onClick={PauseMusic}>Pause</button> */}
        </body>
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