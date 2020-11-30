import { CHANGE_SCREEN, FIRST_SCREEN_PAGE_COMPONENT } from './componentControllerTypes'

const initialState = {
  screen: FIRST_SCREEN_PAGE_COMPONENT
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