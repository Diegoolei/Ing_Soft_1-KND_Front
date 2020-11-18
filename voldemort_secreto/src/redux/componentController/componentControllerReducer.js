import { CHANGE_SCREEN, LOGIN_COMPONENT } from './componentControllerTypes'

const initialState = {
  screen: LOGIN_COMPONENT
}

const componentControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SCREEN: return {
      ...state,
      screen: action.payload
    }
    default: return state
  }
}

export default componentControllerReducer