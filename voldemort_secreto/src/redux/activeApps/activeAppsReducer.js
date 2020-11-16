import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DESACTIVE_CHANGE_NICK
} from './activeAppsTypes'

// const activateChangeNick = () => {
// export const deactivateChangeNick = () => {


  const initialState = {
    is_changeNick_active: false
  }
 
  const activeAppsReducer = (state = initialState, action) => {
    switch (action.type) {
      case APPS_ACTIVATE_CHANGE_NICK: return {
        ...state,
        //algo
      }

      case APPS_DESACTIVE_CHANGE_NICK: return {
        ...state,
        //algo
      }

      default: return state
    }
  }
