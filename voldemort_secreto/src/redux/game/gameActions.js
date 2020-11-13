import store from '../store'
import axios from 'axios'
import {
  BASE_URL,
  API_ENDPOINT_JOIN_LOBBY,
  API_ENDPOINT_LOBBY_INFO
} from '../API_Types'
import { LOBBY_COMPONENT } from '../componentController/componentControllerTypes'
import { changeScreen } from '../reduxIndex'

/*
export const API_ENDPOINT_JOIN_LOBBY = '/lobby/'
export const API_ENDPOINT_LOBBY_INFO = '/lobby/'
*/

export const getLobbyInfo = lobby_id => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+API_ENDPOINT_LOBBY_INFO+lobby_id+"/"
  return dispatch => {
    axios.get(uri,
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
        errorMsg = "Something went wrong"
      }
      console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }
}

export const joinLobby = lobby_id => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+API_ENDPOINT_JOIN_LOBBY+lobby_id+"/"
  return dispatch => {
    axios.post(uri, {},
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
      console.log("Dispatching info request")
      dispatch(getLobbyInfo(lobby_id))
      dispatch(changeScreen(LOBBY_COMPONENT))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
      } catch (er) {
        errorMsg = "Something went wrong"
      }
      console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }
}
