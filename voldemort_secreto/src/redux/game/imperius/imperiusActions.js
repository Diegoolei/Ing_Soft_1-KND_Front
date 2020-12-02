// import store from '../../store'
// import {
//   CGL_IMPERIUS_HIGHLIGHT_OPTION,
//   CGL_IMPERIUS_RESET,
//   CGL_IMPERIUS_SET_OPTIONS,
//   CGL_IMPERIUS_REVEAL_ROLE
// } from './imperiusTypes'
// import {
//   BASE_URL,
//   API_ENDPOINT_IMPERIUS
// } from '../../API_Types'

// import { deactivateImperius } from '../activeApps/activeAppsActions'
// import axios from 'axios'
// import { setPlayerRole } from '../gameActions'

// export const highlightImperiusOption = option_index => {
//   return {
//     type: CGL_IMPERIUS_HIGHLIGHT_OPTION,
//     payload: option_index
//   }
// }

// export const resetImperius = () => {
//   return {
//     type: CGL_IMPERIUS_RESET
//   }
// }

// export const saveImperiusOptions = nick_array => {
//   return {
//     type: CGL_IMPERIUS_SET_OPTIONS,
//     payload: nick_array
//   }
// }

// export const revealRole = role => {
//   return {
//     type: CGL_IMPERIUS_REVEAL_ROLE,
//     payload: role
//   }
// }

// export const setImperiusOptions = except_player_number => {
//   const state = store.getState()
//   const player_arr = state.game.player_array
//   let nick_array = []
//   for (let nick in player_arr) {
//     const is_alive = player_arr[nick].is_alive
//     const is_current_player = state.game.player_nick === nick
//     const is_exception = player_arr[nick].player_number === except_player_number
//     if(is_alive && !is_current_player && !is_exception) nick_array.push(nick)
//   }
//   return dispatch => dispatch(saveImperiusOptions(nick_array))
// }

// export const confirmImperiusSelection = victim_number => {
//   const state = store.getState()
//   const token = state.session.authToken
//   const uri = BASE_URL + `/games/${state.game.game_id}/spell/imperius`
//   return dispatch => {
//     const body = { victim_number : victim_number }
//     axios.post(uri, body,
//       {
//         headers: { 'Authorization': token.token_type + " " + token.access_token }
//       }
//     ).then(response => {
//       console.log(response.data)
//       const player_array = state.game.player_array
//       let nick = undefined
//       for (let n in player_array) {
//         if (player_array[n].player_number === victim_number) {
//           nick = n
//           break
//         }
//       }
//       dispatch(setPlayerRole(nick, response.data.allegiance))
//       dispatch(revealRole(response.data.allegiance))
//     }).catch(error => {
//       let errorMsg
//       try {
//         console.log(error)
//         errorMsg = error.response.data.detail
//       } catch (er) {
//         errorMsg = "Something went wrong:: " + er
//       }
//       console.log("-Response :" + JSON.stringify(errorMsg))
//     })
//   }
// }
