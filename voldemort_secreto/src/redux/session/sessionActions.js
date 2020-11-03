import axios from 'axios'
import { 
  SET_USERNAME,
  SET_EMAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from './sessionTypes'
import {
  BASE_URL, API_ENDPOINT_LOGIN, API_ENDPOINT_REGISTER,
  API_IN_LOGIN_EMAIL, API_IN_LOGIN_PASSWORD, API_IN_REGISTER_EMAIL,
  API_IN_REGISTER_PASSWORD, API_IN_REGISTER_USERNAME
} from '../API_Types'

export const setUsername = username => {
  return {
    type : SET_USERNAME,
    payload : username
  }
}

export const setEmail = emailobj => {
  return {
    type : SET_EMAIL,
    payload : emailobj
  }
}

export const loginRequest = () => {
  return {
    type : LOGIN_REQUEST
  }
}

export const loginSuccess = authToken => {
  return {
    type : LOGIN_SUCCESS,
    payload : authToken
  }
}

export const loginFailure = error => {
  return {
    type : LOGIN_FAILURE,
    payload : error
  }
}

export const registerRequest = () => {
  return {
    type : REGISTER_REQUEST
  }
}

export const registerSuccess = authToken => {
  return {
    type : REGISTER_SUCCESS,
    payload : authToken
  }
}

export const registerFailure = error => {
  return {
    type : REGISTER_FAILURE,
    payload : error
  }
}

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  }
}

export const logoutSuccess = msg => {
  return {
    type: LOGOUT_SUCCESS,
    payload: msg
  }
}

export const logoutFailure = error => {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  }
}

export const login = (email, password) => {
  var body = new FormData()
  body.append([API_IN_LOGIN_EMAIL], email)
  body.append([API_IN_LOGIN_PASSWORD], password)
  console.log("Sending POST to"+BASE_URL+API_ENDPOINT_LOGIN+" with body = " + JSON.stringify(body, null, 2))
  return (dispatch) => {
    dispatch(loginRequest)
    axios.post (BASE_URL+API_ENDPOINT_LOGIN, body)
      .then(response => {
        const authToken = response.data
        dispatch(loginSuccess(authToken))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(loginFailure(errorMsg))
      })
  }
}

export const register = (email, username, password) => {
  var body = new FormData()
  body.append([API_IN_REGISTER_EMAIL], email)
  body.append([API_IN_REGISTER_USERNAME], username)
  body.append([API_IN_REGISTER_PASSWORD], password)
  console.log("Sending POST to "+BASE_URL+API_ENDPOINT_REGISTER+" with body = " + JSON.stringify(body, null, 2))
  return (dispatch) => {
    dispatch(registerRequest)
    axios.post (BASE_URL+API_ENDPOINT_REGISTER, body)
      .then(response => {
        const authToken = response.data
        dispatch(registerSuccess(authToken))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(registerFailure(errorMsg))
      })
  }
}
