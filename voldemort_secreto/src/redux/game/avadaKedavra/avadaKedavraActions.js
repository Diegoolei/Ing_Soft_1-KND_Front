import store from '../../store'
import axios from 'axios'
import {
  BASE_URL,
  API_ENDPOINT_GAME,
  API_ENDPOINT_SPELL,
  API_ENDPOINT_AVADA_KEDAVRA
} from '../../API_Types'
import { deactivateAvadaKedavra, makeAvadaKedavraUnavailable } from '../activeApps/activeAppsActions'

import {
  CGL_AVADA_KEDAVRA_RESET,
  CGL_SET_CANDIDATES_SPELL_AVADA_KEDAVRA,
  CGL_SELECT_VICTIM_AVADA_KEDAVRA
} from './avadaKedavraTypes'

export const resetAvadaKedavra = () => {
  return {
    type: CGL_AVADA_KEDAVRA_RESET
  }
}

export const setVictimCandidatesToAvadaKedavra = victimsCandidatesArray => {
  return {
    type: CGL_SET_CANDIDATES_SPELL_AVADA_KEDAVRA,
    payload: victimsCandidatesArray
  }
}

export const selectVictimToAvadaKedavra = i => {
  return {
    type: CGL_SELECT_VICTIM_AVADA_KEDAVRA,
    payload: i
  }
}

export const confirmVictimToAvadaKedavra = victim_number => {
  const state = store.getState()
    const token = state.session.authToken
    const uri = BASE_URL + API_ENDPOINT_GAME + `${state.game.game_id}` + API_ENDPOINT_SPELL + API_ENDPOINT_AVADA_KEDAVRA
    return dispatch => {
      const body = { victim_number: victim_number }
      axios.put(uri, body,
        {
          headers: { 'Authorization': token.token_type + " " + token.access_token }
        }
      ).then(response => {
        console.log(response.data)
        console.log("-Response :" + JSON.stringify(response.data))
        dispatch(makeAvadaKedavraUnavailable())
        dispatch(deactivateAvadaKedavra())
        dispatch(resetAvadaKedavra())
      }).catch(error => {
          let errorMsg
          try {
            console.log(error)
            errorMsg = error.response.data.detail
          }
          catch (err) {
            errorMsg = "Something went wrong:: " + err
          }
          console.log("-Response :" + JSON.stringify(errorMsg))
        })
    }  
}      