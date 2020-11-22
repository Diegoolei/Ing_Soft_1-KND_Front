import { combineReducers } from 'redux'
import sessionReducer from './session/sessionReducer'
import componentControllerReducer from './componentController/componentControllerReducer'
import socketReducer from './socket/socketReducer'
import lobbyGameListReducer from './lobbyGameList/lobbyGameListReducer'
import gameReducer from './game/gameReducer'
import activeAppsReducer from './game/activeApps/activeAppsReducer'
import votationResultsReducer from './game/votationResults/votationResultsReducer'

const rootReducer = combineReducers ({
  controller : componentControllerReducer,
  session : sessionReducer,
  socket: socketReducer,
  joinlists: lobbyGameListReducer,
  game: gameReducer,
  active_apps: activeAppsReducer,
  votation_results: votationResultsReducer
})

export default rootReducer
