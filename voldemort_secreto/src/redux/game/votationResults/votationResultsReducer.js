
import {
  GAME_ACTIVATE_VOTATION_RESULTS,
  GAME_DEACTIVATE_VOTATION_RESULTS
} from './votationResultsTypes.js'

  const initialState = {
    is_show_results_active: false,
    votes: [],
    countLumos: 0,
    countNox: 0
  }
 
  const votationResultsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GAME_ACTIVATE_VOTATION_RESULTS:
        let vote = false
        let st = {...state}
        for (let key in action.payload) {          
          vote = action.payload[key]
          if (vote) {
            st = {
              ...state,
              is_show_results_active: true,
              votes: action.payload,
              countLumos: state.countLumos + 1
            }
          }
          else {
            st = {
              ...state,
              is_show_results_active: true,
              votes: action.payload,
              countNox: state.countNox + 1
            }
          }
        }
        return st

      case GAME_DEACTIVATE_VOTATION_RESULTS: return {
        ...state,
        is_show_results_active: false
      }

      default: return state
    }
  }

  export default votationResultsReducer
