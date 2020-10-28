import { combineReducers } from 'redux'
import testReducer from './test/testReducer'
import loginRegisterReducer from './loginRegister/loginRegisterReducer'
import testAPIReducer from './testAPI/testAPIReducer'

const rootReducer = combineReducers ({
  test : testReducer,
  loginRegister : loginRegisterReducer,
  testAPI: testAPIReducer
})

export default rootReducer
