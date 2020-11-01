import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import nimbus from './../nimbus.svg';
import { LOGIN_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { setUsername, setEmail, register, changeScreen } from '../redux/reduxIndex'

function LoginForm () {
  const sessionState = useSelector(state => state.session)
  const dispatch = useDispatch()

  const [privUsername, setPrivUsername] = useState(sessionState.username)
  const [privEmail, setPrivEmail] = useState(sessionState.email)
  const [privPassword1, setPrivPassword1] = useState('')
  const [privPassword2, setPrivPassword2] = useState('')
  const [validEmail, setValidEmail] = useState(sessionState.isvalidEmail)
  const [validPassword, setValidPassword] = useState(undefined)
  const [validityMsg, setValidityMsg] = useState('')

  function handleButton () {
    if (!validEmail) {
      setValidityMsg('Invalid email address')
    } else if (!validPassword) {
      setValidityMsg('Invalid password. Should be between 8 and 32 characters')
    } else if (privPassword1 !== privPassword2) {
      setValidityMsg('Passwords don\'t match')
    } else if (privUsername === '') {
      setValidityMsg('username must not be empty')
    } else {
      setValidityMsg('')
      dispatch(setEmail({email: privEmail, validity: true}))
      dispatch(setUsername(privUsername))
      dispatch(register(privEmail, privUsername, privPassword1))
    }    
  }

  function takeInput(inp) {
    const { name, value, validity } = inp.target;
    switch (name) {

      case 'username':
        setPrivUsername(value)
        break;

      case 'email':
        setPrivEmail(value)
        setValidEmail(validity.valid)
        break;

      case 'password1':
        setPrivPassword1(value)
        setValidPassword(validity.valid)
        break;
      
      case 'password2':
        setPrivPassword2(value)
        break;
    
      default:
        break;
    }
  }

  const switchToLogin = () => {
    dispatch(setEmail({email: privEmail, validity: validEmail}))
    if (privUsername !== '') {
      dispatch(setUsername(privUsername))
    }
    dispatch(changeScreen(LOGIN_COMPONENT))
  }

  const registerForm = () => {
    return (
      <div>
        <h3>Register:</h3>        
        <label>Email:</label>
        <input placeholder='email' name='email' type='email' defaultValue={privEmail} onBlur={takeInput} onChange={takeInput}></input>
        
        <br/><label>Username:</label>
        <input placeholder='username' name='username' type='text' defaultValue={privUsername} onBlur={takeInput} onChange={takeInput}></input>

        <br/><label>password:</label>
        <input name='password1' type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input>
        
        <br/><label>repeat password:</label>
        <input name='password2' type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input>
        <br/><button name="Register" onClick={handleButton}>Register</button>
        <br/><label>{sessionState.loading ? 'Loading' : validityMsg}</label>
        <br/><button onClick={switchToLogin}>Login Instead</button> 
      </div>
    )
  }

  return (
    <header className="App-header">
      <img src={nimbus} className="App-logo" alt="logo" />
      <p>
        Bienvenido a Secret Voldemort
      </p>
      {registerForm()}
    </header>
  )
}

export default LoginForm
