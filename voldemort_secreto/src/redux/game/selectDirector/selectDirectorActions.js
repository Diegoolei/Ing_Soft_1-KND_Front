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