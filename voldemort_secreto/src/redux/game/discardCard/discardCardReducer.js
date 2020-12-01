import {
  CGL_DCARD_OPTIONS,
  CGL_DCARD_RESET,
  CGL_DCARD_HIGHLIGHT_OPTION
} from './discardCardTypes'

const initialState = {
  card_options: [],
  highlighted_option: -1
}

const discardCardReducer = (state = initialState, action) => {
  switch (action.type) {

    case CGL_DCARD_OPTIONS:
      return {
        ...state,
        card_options: action.payload
      }

    case CGL_DCARD_HIGHLIGHT_OPTION:  
      return {
        ...state,
        highlighted_option: action.payload          
      }

    case CGL_DCARD_RESET: return initialState

    default: return state
  }
}

export default discardCardReducer