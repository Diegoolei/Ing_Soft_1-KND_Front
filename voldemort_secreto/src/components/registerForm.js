import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FIRST_SCREEN_PAGE_COMPONENT, LOGIN_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { setUserinfo, setEmail, register, resetResponse, changeScreen } from '../redux/reduxIndex'

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
    dispatch(resetResponse())
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
      dispatch(setUserinfo(privUsername))
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
    dispatch(resetResponse())
    if (privUsername !== '') {
      dispatch(setUserinfo(privUsername))
    }
    dispatch(changeScreen(LOGIN_COMPONENT))
  }

  const registerForm = () => {
    return (
      <div>  
        <label>Email:</label>
        <input placeholder='email' name='email' type='email' defaultValue={privEmail} onBlur={takeInput} onChange={takeInput}></input>
        
        <br/><label>Username:</label>
        <input placeholder='username' name='username' type='text' defaultValue={privUsername} onBlur={takeInput} onChange={takeInput}></input>

        <br/><label>password:</label>
        <input name='password1' type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input>
        
        <br/><label>repeat password:</label>
        <input name='password2' type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input>
        <br/>
        <br/><button className="button-shadow-red" name="Register" onClick={handleButton}>Register</button>
        <br/><label className="Error-text">{validityMsg !== "" ? validityMsg : sessionState.response + " " + sessionState.error}</label>
        <br/><button className="button-shadow-red" onClick={switchToLogin}>Login Instead</button>
        <button className="button" onClick={() => dispatch(changeScreen(FIRST_SCREEN_PAGE_COMPONENT))}>Home</button>
      </div>
    )
  }

  return (
    <header className="App-header">
      <div className="App-div">
        <p className="title-first-screen">Register</p>
        {registerForm()}
      </div>
    </header>
  )
}

export default LoginForm
