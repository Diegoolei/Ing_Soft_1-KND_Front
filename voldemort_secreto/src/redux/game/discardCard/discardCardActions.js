import store from '../../store'
import axios from 'axios'
import {
  CGL_DCARD_OPTIONS,
  CGL_DCARD_RESET,
  CGL_DCARD_HIGHLIGHT_OPTION
} from './discardCardTypes'
import {
  BASE_URL,
  API_ENDPOINT_GAME_INFO,
  API_ENDPOINT_DISCARD_CARD
} from '../../API_Types'

import { deactivateDiscardCardMinister, deactivateDiscardCardDirector } from '../activeApps/activeAppsActions'

export const highlightCardOption = option_index => {
  return {
    type: CGL_DCARD_HIGHLIGHT_OPTION,
    payload: option_index
  }
}

export const saveDCardOptions = array_of_cards => {
  return {
    type: CGL_DCARD_OPTIONS,
    payload: array_of_cards
  }
}

export const resetDiscardCard = () => {
  return {
    type: CGL_DCARD_RESET
  }
}

export const confirmDiscardCard = card_number => {
  console.log("Got into confirm Discard Card")
  const state = store.getState()
  const token = state.session.authToken
  const game_id = state.game.game_id
  const uri = BASE_URL+API_ENDPOINT_GAME_INFO+String(game_id)+API_ENDPOINT_DISCARD_CARD

  function postProclamation() {
    console.log("sending post  proclamation...")
    const suburi = BASE_URL+`/games/${state.game.game_id}/proclamation/`
    axios.put(suburi, {},
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
      } catch (er) {
        errorMsg = "Something went wrong:: " + er
      }
      console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }

  return dispatch => {
    const body = { card_discarted: card_number }
    axios.put(uri, body,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      const current_nick = state.game.player_nick
      const current_director = state.game.current_director
      if(state.game.player_array[current_nick].player_number === current_director) {
        console.log("Sending to post proclamation...")
        postProclamation()
      } 
      dispatch(resetDiscardCard())
      dispatch(deactivateDiscardCardMinister())
      dispatch(deactivateDiscardCardDirector())
    }).catch(error => {
      let errorMsg
      try {
        console.log(error)
        errorMsg = error.response.data.detail
      } catch (er) {
        errorMsg = "Something went wrong:: " + er
      }
      console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }
}