import store from '../../store'
import {
  CGL_CRUCIO_HIGHLIGHT_OPTION,
  CGL_CRUCIO_RESET,
  CGL_CRUCIO_SET_OPTIONS,
  CGL_CRUCIO_REVEAL_ROLE
} from './crucioTypes'
import {
  BASE_URL,
  API_ENDPOINT_CRUCIO
} from '../../API_Types'

import { deactivateCrucio } from '../activeApps/activeAppsActions'
import axios from 'axios'
import { setPlayerRole } from '../gameActions'

export const highlightCrucioOption = option_index => {
  return {
    type: CGL_CRUCIO_HIGHLIGHT_OPTION,
    payload: option_index
  }
}

export const resetCrucio = () => {
  return {
    type: CGL_CRUCIO_RESET
  }
}

export const saveCrucioOptions = nick_array => {
  return {
    type: CGL_CRUCIO_SET_OPTIONS,
    payload: nick_array
  }
}

export const revealRole = role => {
  return {
    type: CGL_CRUCIO_REVEAL_ROLE,
    payload: role
  }
}

export const setCrucioOptions = except_player_number => {
  const state = store.getState()
  const player_arr = state.game.player_array
  let nick_array = []
  for (let nick in player_arr) {
    const is_alive = player_arr[nick].is_alive
    const is_current_player = state.game.player_nick === nick
    const is_exception = player_arr[nick].player_number === except_player_number
    if(is_alive && !is_current_player && !is_exception) nick_array.push(nick)
  }
  return dispatch => dispatch(saveCrucioOptions(nick_array))
}

export const confirmCrucioSelection = victim_number => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL + `/games/${state.game.game_id}/spell/crucio`
  return dispatch => {
    const body = { victim_number : victim_number }
    axios.post(uri, body,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log(response.data)
      const player_array = state.game.player_array
      let nick = undefined
      for (let n in player_array) {
        if (player_array[n].player_number === victim_number) {
          nick = n
          break
        }
      }
      dispatch(setPlayerRole(nick, response.data.allegiance))
      dispatch(revealRole(response.data.allegiance))
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
