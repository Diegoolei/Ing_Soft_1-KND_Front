import { combineReducers } from 'redux'
import sessionReducer from './session/sessionReducer'
import componentControllerReducer from './componentController/componentControllerReducer'
import socketReducer from './socket/socketReducer'
import lobbyGameListReducer from './lobbyGameList/lobbyGameListReducer'
import gameReducer from './game/gameReducer'
import activeAppsReducer from './game/activeApps/activeAppsReducer'
import selectDirectorReducer from './game/selectDirector/selectDirectorReducer'
import votationResultsReducer from './game/votationResults/votationResultsReducer'
import crucioReducer from './game/crucio/crucioReducer'

const rootReducer = combineReducers ({
  controller : componentControllerReducer,
  session : sessionReducer,
  socket: socketReducer,
  joinlists: lobbyGameListReducer,
  game: gameReducer,
  active_apps: activeAppsReducer,
  select_director: selectDirectorReducer,
  votation_results: votationResultsReducer,
  crucio: crucioReducer,
})

export default rootReducer
