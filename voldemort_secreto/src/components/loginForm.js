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

  function loginForm() {
    return (
      <div>
        <h2>Login:</h2>
        <label>email:</label>
        <input placeholder='email' name='email' type='email' defaultValue={sessionState.email} onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        
        <br/><label>Password:</label>
        <input name='password' type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input>
        
        <br/><button onClick={handleButton}>Login</button>
        <br/><label>{sessionState.response + " " + sessionState.error + " " + validityMsg}</label>
        <br/><button onClick={switchToRegister}>Register Instead</button> 
      </div>
    )
  }

  return (
    <header className="App-header">
      <img src={nimbus} className="App-logo" alt="logo" />
      <p>
        Bienvenido a Secret Voldemort
      </p>
      {loginForm()}
    </header>
  )
}

export default LoginForm
