
import {
  GAME_ACTIVATE_VOTATION_RESULTS,
  GAME_DEACTIVATE_VOTATION_RESULTS
} from './votationResultsTypes.js'

  const initialState = {
    is_show_results_active: false,
    votes: []
  }
 
  const votationResultsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GAME_ACTIVATE_VOTATION_RESULTS: 
        const dict = []
        for (let key in action.payload) {          
          console.log("wachoooo")
          console.log(action.payload[key])
          let player_vote = action.payload[key]
          console.log(player_vote)
          let nick = key
          let vote = (
            <div>
              <l1> (vote: {player_vote}) </l1>
            </div>
          )
          dict.push(vote)
        }
        return {
          ...state,
          is_show_results_active: true,
          votes: dict
        }

      case GAME_DEACTIVATE_VOTATION_RESULTS: return {
        ...state,
        is_show_results_active: false
      }

      default: return state
    }
  }

  export default votationResultsReducer
