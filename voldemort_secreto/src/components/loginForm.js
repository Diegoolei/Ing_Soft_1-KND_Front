import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import nimbus from './../nimbus.svg';
import { MAIN_MENU_COMPONENT, REGISTER_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { setEmail, login, changeScreen } from '../redux/reduxIndex'

function LoginForm () {
  const sessionState = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [privEmail, setPrivEmail] = useState(sessionState.email)
  const [privPassword, setPrivPassword] = useState('')
  const [validEmail, setValidEmail] = useState(sessionState.isvalidEmail)
  const [validPassword, setValidPassword] = useState(false)
  const [validityMsg, setValidityMsg] = useState('')

  function handleButton () {
    if (!validEmail) {
      setValidityMsg('Invalid email address')
    } else if (!validPassword) {
      setValidityMsg('Invalid password. Should be between 8 and 32 characters')
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
        setValidPassword(validity.valid)
        break;
    
      default:
        break;
    }
  }
  
  const switchToRegister = () => {
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
        <br/><label>{sessionState.loading ? 'Loading' : validityMsg}</label>
        <br/><button onClick={switchToRegister}>Register Instead</button> 
        <br/><button onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Mock Login</button> 
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
