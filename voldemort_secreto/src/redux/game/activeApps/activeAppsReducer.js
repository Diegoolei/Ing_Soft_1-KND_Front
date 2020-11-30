import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DEACTIVE_CHANGE_NICK,
  APPS_ACTIVATE_SELECT_DIRECTOR,
  APPS_DEACTIVE_SELECT_DIRECTOR,
  APPS_MAKE_CRUCIO_AVAILABLE,
  APPS_MAKE_CRUCIO_UNAVAILABLE,
  APPS_ACTIVATE_CRUCIO,
  APPS_DEACTIVE_CRUCIO,
  APPS_ACTIVATE_MINISTER_DC,
  APPS_DEACTIVATE_MINISTER_DC,
  APPS_ACTIVATE_DIRECTOR_DC,
  APPS_DEACTIVATE_DIRECTOR_DC,
  APPS_ENABLE_DISCARD_CARD,  
  APPS_DISABLE_DISCARD_CARD      
} from './activeAppsTypes'

  const initialState = {
    is_changeNick_active: false,
    is_selecting_director_active: false,
    is_crucio_available: false,
    is_crucio_active: false,
    is_discard_card_available: false,
    is_discard_card_active: false
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

      case APPS_ENABLE_DISCARD_CARD: return {
        ...state,
        is_discard_card_available: true
      }

      case APPS_DISABLE_DISCARD_CARD: return {
        ...state,
        is_discard_card_available: false
      }

      case APPS_ACTIVATE_MINISTER_DC: return {
        ...state,
        is_discard_card_active: true        
      }
    
      case APPS_DEACTIVATE_MINISTER_DC: return {
        ...state,
        is_discard_card_active: false
      }

      case APPS_ACTIVATE_DIRECTOR_DC: return {
        ...state,
        is_discard_card_active: true
      }

      case APPS_DEACTIVATE_DIRECTOR_DC: return {
        ...state,
        is_discard_card_active: false
      }

      default: return state
    }
  }

  export default activeAppsReducer