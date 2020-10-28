import axios from 'axios'
import { 
  SET_USERNAME,
  SET_EMAIL,
  SET_PASSWORD,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './loginRegisterTypes'

export const setUsername = username => {
  return {
    type : SET_USERNAME,
    payload : username
  }
}

export const setEmail = email => {
  return {
    type : SET_EMAIL,
    payload : email
  }
}

export const setPassword = password => {
  return {
    type : SET_PASSWORD,
    payload : password
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

export const login = body => {
  return (dispatch) => {
    dispatch(loginRequest)
    axios.post ('https://jsonplaceholder.typicode.com/todos', body)
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

export const register = body => {
  return (dispatch) => {
    dispatch(registerRequest)
    //  endpoint: /user/
    axios.post ('https://jsonplaceholder.typicode.com/todos', body)
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
