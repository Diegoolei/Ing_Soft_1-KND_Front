// Implementations on construction
import store from '../../store'
import axios from 'axios'
import {
  BASE_URL,
  API_ENDPOINT_GAME,
  API_ENDPOINT_SELECT_DIRECTOR
} from '../../API_Types'

import {
  CGL_SD_SET_CANDIDATES,
  CGL_SD_SELECT_DIRECTOR,
  CGL_SD_RESET
} from './selectDirectorTypes'

// /*Select Director (POST) /games/{game_id}/select_director/
// We need to ask everyone to vote for the candidate the Minister selected:
// { "TYPE": "REQUEST_VOTE", "PAYLOAD": candidate_nick}
// candidate_nick : string
// Send to: All players in game */
//   export const selectDirector = info =>{
//       return{
//           type: CGL_SELECT_DIRECTOR,
//           payload
//       }
//   }
// CGL_SD_SET_CANDIDATES,
// CGL_SD_ACTIVATE_SELECT_CANDIDATE,
// CGL_SD_DEACTIVATE_SELECT_CANDIDATE,
// CGL_SD_RESET

export const resetCandidates = () => {
  return {
    type: CGL_SD_RESET
  }
}

export const setCandidates = candidateArray => {
  return {
    type: CGL_SD_SET_CANDIDATES,
    payload: candidateArray
  }
}


export const selectDirector = candidate_nick => {
  return {
    type: CGL_SD_SELECT_DIRECTOR,
    payload: candidate_nick
  }
}

/* {PRIVATE} PlayerNumber{ player_number: int } */
export const confirmCandidate = player_number => {
  const state = store.getState()
  const token = state.session.authToken
  const game_id = state.game.game_id
  const uri = BASE_URL + API_ENDPOINT_GAME + String(game_id) + API_ENDPOINT_SELECT_DIRECTOR
  const body = { player_number: player_number }
  return dispatch => {
    axios.post(uri, body,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
    })
      .catch(error => {
        let errorMsg
        try {
          errorMsg = error.response.data.detail
        }
        catch (err) {
          errorMsg = "Something went wrong:: " + err
        }
        console.log("-Response :" + JSON.stringify(errorMsg))
      })
  }
}