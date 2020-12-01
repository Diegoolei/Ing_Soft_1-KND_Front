import {
  CGL_AVADA_KEDAVRA_RESET,
  CGL_SD_SET_CANDIDATES_SPELL_AVADA_KEDAVRA
} from './avadaKedavraTypes.js'

const initialState = {
  candidates_avada_kedravra: []   // array of nicks
}

const selectVictimsCandidatesToAvadaKedavraReducer = (state = initialState, action) => {
  switch (action.type) {
    case CGL_SD_SET_CANDIDATES_SPELL_AVADA_KEDAVRA:
      return {
        ...state,
        candidates_avada_kedravra: action.payload
      }

    case CGL_AVADA_KEDAVRA_RESET: return initialState

    default: return state
  }
}

export default selectVictimsCandidatesToAvadaKedavraReducer
