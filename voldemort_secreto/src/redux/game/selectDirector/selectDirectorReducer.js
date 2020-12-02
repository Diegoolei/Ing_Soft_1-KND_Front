import {
    CGL_SD_SET_CANDIDATES,
    CGL_SD_RESET
  } from './selectDirectorTypes'
  
const initialState = {
  candidates: []
}

const selectDirectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CGL_SD_SET_CANDIDATES:
      return {
        ...state,
        candidates: action.payload
      }

    case CGL_SD_RESET: return initialState

    default: return state
  }
}

export default selectDirectorReducer
