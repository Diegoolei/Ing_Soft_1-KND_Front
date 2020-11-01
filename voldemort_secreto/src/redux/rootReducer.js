import { combineReducers } from 'redux'
import loginRegisterReducer from './loginRegister/loginRegisterReducer'
import componentControllerReducer from './componentController/componentControllerReducer'

const rootReducer = combineReducers ({
  controller : componentControllerReducer,
  loginRegister : loginRegisterReducer
})

export default rootReducer
