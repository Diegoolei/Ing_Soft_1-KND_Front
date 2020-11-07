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
  LOGOUT_FAILURE,
  RESET_RESPONSE
} from './sessionTypes'

const initialState = {
  username: '',
  email: '',
  isvalidEmail: false,
  loggedin: false,
  loading: false,
  authToken: '',
  response: '',
  error: ''
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: return {
      ...state,
      loading: true,
      authToken: '',
      response: '',
      error: ''
    }

    case LOGIN_SUCCESS: return {
      ...state,
      loggedin: true,
      loading: false,
      authToken: action.payload,
      response: 'You are loggued in',
      error: ''
    }

    case LOGIN_FAILURE: return {
      ...state,
      loading: false,
      authToken: '',
      error: action.payload
    }

    case REGISTER_REQUEST: return {
      ...state,
      loading: true,
      authToken: '',
      response: '',
      error: ''
    }

    case REGISTER_SUCCESS: return {
      ...state,
      loading: false,
      authToken: '',
      response: action.payload,
      error: ''
    }

    case REGISTER_FAILURE: return {
      ...state,
      loading: false,
      authToken: '',
      response: '',
      error: action.payload
    }

    case LOGOUT_REQUEST: return {
      ...state,
      loading: true,
    }

    case LOGOUT_SUCCESS: return initialState

    case LOGOUT_FAILURE: return {
      ...state,
      loading: false,
      error: action.payload
    }

    case SET_USERNAME: return {
      ...state,
      username: action.payload
    }

    case SET_EMAIL: return {
      ...state,
      email: action.payload.email,
      isvalidEmail: action.payload.validity
    }

    case RESET_RESPONSE: return {
      ...state,
      response: action.payload
    }

    default: return state
  }
}

export default loginReducer