import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DEACTIVE_CHANGE_NICK,
  APPS_ACTIVATE_SELECT_DIRECTOR,
  APPS_DEACTIVE_SELECT_DIRECTOR,
  APPS_MAKE_CRUCIO_AVAILABLE,
  APPS_MAKE_CRUCIO_UNAVAILABLE,
  APPS_ACTIVATE_CRUCIO,
  APPS_DEACTIVE_CRUCIO,
} from './activeAppsTypes'

  const initialState = {
    is_changeNick_active: false,
    is_selecting_director_active: false,
    is_crucio_available: false,
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

      case APPS_MAKE_CRUCIO_AVAILABLE: return {
        ...state,
        is_crucio_available: true
      }

      case APPS_MAKE_CRUCIO_UNAVAILABLE: return {
        ...state,
        is_crucio_available: false
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