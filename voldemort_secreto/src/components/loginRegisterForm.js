import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setEmail, setPassword, login, register } from '../redux/loginRegister/loginRegisterActions'
import nimbus from './../nimbus.svg';

function LoginForm () {
  const [usr, setUsr] = useState('')
  const [eml, setEml] = useState('')
  const [psw, setPsw] = useState('')
  const [pswrepeat, setPswRepeat] = useState('')
  const [validEml, setValidEml] = useState(false)
  const [validPsw, setValidPsw] = useState(false)
  const [isShowingLoginForm, setloginFrm] = useState(true)
  const [stateMsg, setStateMsg] = useState('')
  const loading = useSelector(state => state.loginRegister.loading)
  const storeUsername = useSelector(state => state.loginRegister.username)
  const storeEmail = useSelector(state => state.loginRegister.email)
  const storePassword = useSelector(state => state.loginRegister.password)
  const dispatch = useDispatch()

  function launchLoginRequest () {
    console.log("Attempting to login!")
    const body = {
      email: storeEmail,
      password : storePassword
    }
    dispatch(login(body))
  }

  function launchRegisterRequest () {
    console.log("Attempting to register!")
    const body = {
      email: storeEmail,
      username : storeUsername,
      password : storePassword,
      photo : -1
    }
    dispatch(register(body))
  }

  function handleButton (inp) {
    const { name } = inp.target;
    if (!validEml) {
      setStateMsg("Invalid email address")
    } else if (!validPsw) {
      setStateMsg('')
      setStateMsg("Invalid password. Should be between 8 and 32 characters")
    } else {
      setStateMsg('')
      dispatch(setEmail(eml))
      dispatch(setPassword(psw))
      switch (name) {
        case "Register":
          if (psw !== pswrepeat) {
            setStateMsg("Passwords don't match")
          } else {
            dispatch(setUsername(usr))
            if (usr.length > 0) {
              launchRegisterRequest()
            } else {
              setStateMsg("Username is empty")
            }
          }
          break;
  
        case "Login":
          launchLoginRequest()
          break;
      
        default:
          break;
      }
    }    
  }

  function takeInput(inp) {
    const { name, value, validity } = inp.target;
    switch (name) {
      case "username":
        setUsr(value)
        break;

      case "email":
        setEml(value)
        setValidEml(validity.valid)
        break;
  
      case "password":
        setPsw(value)
        setValidPsw(validity.valid)
        break;

      case "passwordrepeat":
        setPswRepeat(value)
        break;
    
      default:
        break;
    }
  }

  function loginForm() {
    return (
      <div>
        <h3>Login:</h3>
        <label>email:</label>
        <input placeholder="email" name="email" type='email' defaultValue={eml} onKeyUp={takeInput}></input>
        <br/><label>password:</label>
        <input name="password" type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input>
        <br/><button name="Login" onClick={handleButton}>Login</button>
        <br/><label>{loading ? 'Loading' : stateMsg}</label>
        <br/><button onClick={() => setloginFrm(false)}>Register</button> 
      </div>
    )
  }

  function registerForm () {
    return (
      <div>
        <h3>Register:</h3>
        <label>username:</label>
        <input placeholder="username" name="username" type='text' defaultValue={usr} onKeyUp={takeInput}></input>
        <br/><label>email:</label>
        <input placeholder="email" name="email" type='email' defaultValue={eml} onKeyUp={takeInput}></input>
        <br/><label>password:</label>
        <input name="password" type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input>
        <br/><label>repeat password:</label>
        <input name="passwordrepeat" type='password' onKeyUp={takeInput} maxLength='32' minLength='8' ></input>
        <br/><button name="Register" onClick={handleButton}>Register</button>
        <br/><label>{loading ? 'Loading' : stateMsg}</label>
        <br/><button onClick={() => setloginFrm(true)}>Login</button> 
      </div>
    )
  }

  return (
    <header className="App-header">
      <img src={nimbus} className="App-logo" alt="logo" />
      <p>
        Bienvenido a Secret Voldemort
      </p>
      {isShowingLoginForm ? loginForm() : registerForm()}
    </header>
  )
}

export default LoginForm
