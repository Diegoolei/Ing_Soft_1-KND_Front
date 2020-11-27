import {
  CGL_CRUCIO_HIGHLIGHT_OPTION,
  CGL_CRUCIO_RESET,
  CGL_CRUCIO_SET_OPTIONS
} from './crucioTypes'

const initialState = {
  options: [],
  highlighted_option: -1
}

const crucioReducer = (state = initialState, action) => {
  switch (action.type) {
    case CGL_CRUCIO_SET_OPTIONS: return {
      ...state,
      options: action.payload
    }

    case CGL_CRUCIO_HIGHLIGHT_OPTION: return {
      ...state,
      highlighted_option: action.payload
    }

    case CGL_CRUCIO_RESET: return initialState

    default: return state
  }
}

export default crucioReducer
