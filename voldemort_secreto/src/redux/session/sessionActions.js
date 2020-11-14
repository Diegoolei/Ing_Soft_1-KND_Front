import axios from 'axios'
import { 
  SET_USERINFO,
  SET_EMAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RESET_RESPONSE
} from './sessionTypes'
import {
  BASE_URL, API_ENDPOINT_LOGIN, API_ENDPOINT_REGISTER, API_ENDPOINT_PROFILE_INFO,
  API_IN_LOGIN_EMAIL, API_IN_LOGIN_PASSWORD, API_IN_REGISTER_EMAIL,
  API_IN_REGISTER_PASSWORD, API_IN_REGISTER_USERNAME
} from '../API_Types'
import { changeScreen } from '../componentController/componentControllerActions'
import { LOGIN_COMPONENT, MAIN_MENU_COMPONENT } from '../componentController/componentControllerTypes'

export const setUserinfo = userinfo => {
  return {
    type : SET_USERINFO,
    payload : userinfo
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

export const registerSuccess = msg => {
  return {
    type : REGISTER_SUCCESS,
    payload : msg
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

export const resetResponse = (response = '') => {
  return {
    type: RESET_RESPONSE,
    payload: response
  }
}

export const login = (email, password) => {
  var body = new FormData()
  body.append([API_IN_LOGIN_EMAIL], email)
  body.append([API_IN_LOGIN_PASSWORD], password)
  console.log("Sending POST to"+BASE_URL+API_ENDPOINT_LOGIN+" with body = " + JSON.stringify(body, null, 2))
  return (dispatch) => {
    let token = ''
    dispatch(loginRequest)
    axios.post (BASE_URL+API_ENDPOINT_LOGIN, body)
      .then(response => {
        token = response.data
        dispatch(loginSuccess(token))
        dispatch(getProfile(token))
        dispatch(changeScreen(MAIN_MENU_COMPONENT))
      })
      .catch(error => {
        let errorMsg = "Something went wrong:: " + error
        if (error.message === "Request failed with status code 401") {
          errorMsg = "Bad Email or password"
        }
        dispatch(loginFailure(errorMsg))
      })
  }
}

export const getProfile = token => {
  return (dispatch) => {
    axios.get(BASE_URL+API_ENDPOINT_PROFILE_INFO,
      { 
        headers: { 'Authorization': token.token_type + " " + token.access_token } 
    }).then( response => {
      const data = response.data
      dispatch(setUserinfo(data))
    }).catch(error => {
      let errorMsg = "Something went wrong:: " + error
      if (error.message === "Request failed with status code 401") {
        errorMsg = "Bad Email or password"
      }
      else {
        errorMsg = "Something went wrong with getting profile:: " + error
      }
      console.log("-Response: ", errorMsg)
    })
  }
}

export const register = (email, username, password) => {
  const body = {
    [API_IN_REGISTER_EMAIL]: email,
    [API_IN_REGISTER_USERNAME]: username,
    [API_IN_REGISTER_PASSWORD]: password
  }

  console.log("Sending POST to: '"+BASE_URL+API_ENDPOINT_REGISTER+"' with body = " + JSON.stringify(body, null, 2))
  return (dispatch) => {
    dispatch(registerRequest)
    axios.post (BASE_URL+API_ENDPOINT_REGISTER, body)
      .then(response => {
        const detail = response.data.userOut_operation_result
        dispatch(registerSuccess(detail))
        dispatch(changeScreen(LOGIN_COMPONENT))
        dispatch(resetResponse('Succesfully Created!'))
      })
      .catch(error => {
        let errorMsg
        try {
          errorMsg = error.response.data.detail
          } catch (er) {
            errorMsg = "Something went wrong:: " + er
          }
        dispatch(registerFailure(errorMsg))
      })
  }
}
