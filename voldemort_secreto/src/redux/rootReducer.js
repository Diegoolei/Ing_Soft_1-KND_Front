import { combineReducers } from 'redux'
import sessionReducer from './session/sessionReducer'
import componentControllerReducer from './componentController/componentControllerReducer'

const rootReducer = combineReducers ({
  controller : componentControllerReducer,
  session : sessionReducer
})

export default rootReducer
