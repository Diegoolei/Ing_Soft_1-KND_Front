import { combineReducers } from 'redux'
import sessionReducer from './session/sessionReducer'
import componentControllerReducer from './componentController/componentControllerReducer'
import socketReducer from './socket/socketReducer'

const rootReducer = combineReducers ({
  controller : componentControllerReducer,
  session : sessionReducer,
  socket: socketReducer
})

export default rootReducer
