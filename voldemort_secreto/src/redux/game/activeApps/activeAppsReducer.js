import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DEACTIVE_CHANGE_NICK,
  APPS_ACTIVATE_SELECT_DIRECTOR,
  APPS_DEACTIVE_SELECT_DIRECTOR,
  APPS_ACTIVATE_AVADA_KEDAVRA,
  APPS_DEACTIVATE_AVADA_KEDAVRA
} from './activeAppsTypes'

  const initialState = {
    is_changeNick_active: false,
    is_selecting_director_active: false,
    is_avada_kedravra_active: false
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

      case APPS_ACTIVATE_AVADA_KEDAVRA: return {
        ...state,
        is_avada_kedravra_active: true
      }

      case APPS_DEACTIVATE_AVADA_KEDAVRA: return {
        ...state,
        is_avada_kedravra_active: false
      }

      default: return state
    }
  }

  export default activeAppsReducer