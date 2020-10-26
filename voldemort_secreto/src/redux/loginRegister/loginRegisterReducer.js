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

const initialState = {
  username: '',
  email: '',
  password: '',
  loggedin: false,
  loading: false,
  authToken: '',
  error: ''
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: return {
      ...state,
      loading: true,
      authToken : '',
      error: ''
    }

    case LOGIN_SUCCESS: return {
      ...state,
      loggedin : true,
      loading: false,
      authToken : action.payload,
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
      error: ''
    }

    case REGISTER_SUCCESS: return {
      ...state,
      loading: false,
      authToken : action.payload,
      error: ''
    }

    case REGISTER_FAILURE: return {
      ...state,
      loading: false,
      authToken: '',
      error: action.payload
    }

    case SET_USERNAME: return {
      ...state,
      username: action.payload
    }

    case SET_EMAIL: return {
      ...state,
      email: action.payload
    }

    case SET_PASSWORD: return {
      ...state,
      password: action.payload
    }

    default: return state
  }
}

export default loginReducer