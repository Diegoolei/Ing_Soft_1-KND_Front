import { combineReducers } from 'redux'
import sessionReducer from './session/sessionReducer'
import componentControllerReducer from './componentController/componentControllerReducer'
import socketReducer from './socket/socketReducer'
import lobbyGameListReducer from './lobbyGameList/lobbyGameListReducer'

const rootReducer = combineReducers ({
  controller : componentControllerReducer,
  session : sessionReducer,
  socket: socketReducer,
  joinlists: lobbyGameListReducer
})

export default rootReducer
