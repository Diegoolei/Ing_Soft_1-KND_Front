import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DEACTIVE_CHANGE_NICK,
  APPS_ACTIVATE_SELECT_DIRECTOR,
  APPS_DEACTIVE_SELECT_DIRECTOR,
  APPS_ACTIVATE_CRUCIO,
  APPS_DEACTIVE_CRUCIO,
} from './activeAppsTypes'

  const initialState = {
    is_changeNick_active: false,
    is_selecting_director_active: false,
    is_crucio_active: false,
  }
 
  const activeAppsReducer = (state = initialState, action) => {
    switch (action.type) {
      case APPS_ACTIVATE_CHANGE_NICK: return {
        ...state,
        is_changeNick_active: true
      }

      case APPS_DEACTIVE_CHANGE_NICK: return {
        ...state,
        is_changeNick_active: false
      }

      case APPS_ACTIVATE_SELECT_DIRECTOR: return {
        ...state,
        is_selecting_director_active: true
      }
  
      case APPS_DEACTIVE_SELECT_DIRECTOR: return {
        ...state,
        is_selecting_director_active: false
      }
      
      case APPS_ACTIVATE_CRUCIO: return {
        ...state,
        is_crucio_active: true
      }

      case APPS_DEACTIVE_CRUCIO: return {
        ...state,
        is_crucio_active: false
      }

      default: return state
    }
  }

  export default activeAppsReducer