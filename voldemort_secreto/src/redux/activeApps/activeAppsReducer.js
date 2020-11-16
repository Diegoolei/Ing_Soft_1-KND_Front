import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DESACTIVE_CHANGE_NICK
} from './activeAppsTypes'

  const initialState = {
    is_changeNick_active: false
  }
 
  const activeAppsReducer = (state = initialState, action) => {
    switch (action.type) {
      case APPS_ACTIVATE_CHANGE_NICK: return {
        ...state,
        is_changeNick_active: true
      }

      case APPS_DESACTIVE_CHANGE_NICK: return {
        ...state,
        is_changeNick_active: false
      }

      default: return state
    }
  }

  export default activeAppsReducer