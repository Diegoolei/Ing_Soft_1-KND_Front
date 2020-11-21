import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import nimbus from '../metaMedia/nimbus.svg'
import { REGISTER_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { setEmail, login, resetResponse, changeScreen } from '../redux/reduxIndex'

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

  // function skipToGame() {
  //   dispatch(login("user1@mail.com", "12345678"))
  //   setTimeout(() => dispatch(joinGame(1)), 1000)
  // }

  function loginForm() {
    return (
      <div>
        <h3>Login:</h3>
        <br/><label>email: </label>
        <input placeholder='email' name='email' type='email' defaultValue={sessionState.email} onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        
        <br/><label>Password: </label>
        <input name='password' type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input><br/>
        
        <br/><button className="button-shadow-red" onClick={handleButton}>Login</button>
        <button className="button-shadow-red" onClick={switchToRegister}>Register Instead</button>
        <br/><label>{sessionState.response + " " + sessionState.error + " " + validityMsg}</label>
      </div>
    )
  }

  return (
    <header className="App-header">
      <div className="App-div-login">
        <img src={nimbus} className="App-logo" alt="logo" />
        <h1>Welcome to Secret Voldemort</h1>
        {/* <button className="button" onClick={skipToGame}>Skip to Game</button> */}
        {loginForm()}
      </div>
    </header>
  )
}

export default LoginForm
