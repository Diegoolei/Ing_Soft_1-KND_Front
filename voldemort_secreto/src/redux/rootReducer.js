import { combineReducers } from 'redux'
import testReducer from './test/testReducer'
import loginRegisterReducer from './loginRegister/loginRegisterReducer'

const rootReducer = combineReducers ({
  test : testReducer,
  loginRegister : loginRegisterReducer
})

export default rootReducer
