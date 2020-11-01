import { combineReducers } from 'redux'
import loginRegisterReducer from './loginRegister/loginRegisterReducer'

const rootReducer = combineReducers ({
  loginRegister : loginRegisterReducer,
})

export default rootReducer
