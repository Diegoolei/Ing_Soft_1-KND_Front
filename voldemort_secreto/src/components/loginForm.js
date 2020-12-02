import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import nimbus from '../metaMedia/nimbus.svg'
import { FIRST_SCREEN_PAGE_COMPONENT, REGISTER_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { setEmail, login, resetResponse, changeScreen } from '../redux/reduxIndex'
import music from '../metaMedia/hp-lofi.mp3'

function LoginForm () {
  const sessionState = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [privEmail, setPrivEmail] = useState(sessionState.email)
  const [privPassword, setPrivPassword] = useState('')
  const [validEmail, setValidEmail] = useState(sessionState.isvalidEmail)
  const [validityMsg, setValidityMsg] = useState('')

  function handleButton () {
    dispatch(resetResponse())
    if (!validEmail) {
      setValidityMsg('Invalid email address')
    } else if (privPassword.length === 0){
      setValidityMsg('Input Password')
    } else {
      setValidityMsg('')
      dispatch(setEmail({email: privEmail, validity: true}))
      dispatch(login(privEmail, privPassword))
    }    
  }

  function takeInput(inp) {
    const { name, value, validity } = inp.target;
    switch (name) {
      case "email":
        setPrivEmail(value)
        setValidEmail(validity.valid)
        break;

      case "password":
        setPrivPassword(value)
        
        break;
    
      default:
        break;
    }
  }
  
  const switchToRegister = () => {
    dispatch(resetResponse())
    dispatch(setEmail({email: privEmail, validity: validEmail}))
    dispatch(changeScreen(REGISTER_COMPONENT))
  }  

  function loginForm() {
    return (
      <div>
        <label>email: </label>
        <input placeholder='email' name='email' type='email' defaultValue={sessionState.email} onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        
        <br/><label>Password: </label>
        <input name='password' type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input><br/>
        
        <br/><button className="button-shadow-red" onClick={handleButton}>Login</button>
        <button className="button-shadow-red" onClick={switchToRegister}>Register Instead</button>
        <br/><label>{sessionState.response + " " + sessionState.error + " " + validityMsg}</label>
      </div>
    )
  }

//======================================================================
var soundEmbed = null;
var isChrome = !!window.chrome;

function soundPlayChrome(which)
{
  if (soundEmbed)
    document.body.removeChild(soundEmbed);
  soundEmbed = document.createElement("embed");
  soundEmbed.setAttribute("src", which);
  soundEmbed.setAttribute("hidden", true);
  soundEmbed.setAttribute("autostart", true);
  soundEmbed.setAttribute("loop", true);
  document.body.appendChild(soundEmbed);
}

function soundPlay(which)
{
  if (soundEmbed)
    document.head.removeChild(soundEmbed);
  soundEmbed = document.createElement("embed");
  soundEmbed.setAttribute("src", which);
  soundEmbed.setAttribute("hidden", true);
  soundEmbed.setAttribute("autostart", true);
  soundEmbed.setAttribute("loop", true);
  document.head.appendChild(soundEmbed);
}

function PlayMusic(){
  if (isChrome)
    {soundPlayChrome(music)}
  else
    {soundPlay(music)}
}

function PauseMusic(){
  if (isChrome)
    {soundPlayChrome("null")}
  else
    {soundPlay("null")}
}
//======================================================================

  return (
    <header className="App-header">
      <div className="App-div-login">
        {/* <img src={nimbus} className="App-logo" alt="logo" /> */}
        <h1 className="title-first-screen">Login</h1>
        {loginForm()}
        <button className="button" onClick={PlayMusic} >Play</button>
        <button className="button" onClick={PauseMusic}>Pause</button><br/>
        <button className="button" onClick={() => dispatch(changeScreen(FIRST_SCREEN_PAGE_COMPONENT))}>Back</button>
      </div>
    </header>
  )
}

export default LoginForm
