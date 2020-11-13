import store from '../store'
import axios from 'axios'
import {
  CGL_SET_LOBBY_INFORMATION,
  CGL_SET_GAME_IMFORMATION,
  CGL_PLAYER_JOINED_LOBBY
} from './gameTypes'

import {
  BASE_URL,
  API_ENDPOINT_JOIN_LOBBY,
  API_ENDPOINT_LEAVE_LOBBY,
  API_ENDPOINT_GAME_INFO,
  API_ENDPOINT_WEBSOCKET
} from '../API_Types'

import { LOBBY_COMPONENT, MAIN_MENU_COMPONENT } from '../componentController/componentControllerTypes'
import { changeScreen, wsConnect } from '../reduxIndex'

export const playerJoinedLobby = nick => {
  return {
    type: CGL_PLAYER_JOINED_LOBBY,
    payload: nick
  }
}

export const setLobbyInfo = info => {
  return {
    type: CGL_SET_LOBBY_INFORMATION,
    payload: {
      ////////////////////////
      ////////////////////////
      ////////////////////////
      ////////////////////////
    }
  }
}

export const setGameInfo = info => {
  return {
    type: CGL_SET_GAME_IMFORMATION,
    payload: info
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
      /*{    "joinLobby_name":"Example1",
             "joinLobby_player_id":35,
             "joinLobby_result":" Welcome to Example1",
             "joinLobby_nicks":["lao4","laoPrime","lao1"]} */
      const info = {
        lobby_id: lobby_id,
        lobby_name: response.data.joinLobby_name,
        player_id: response.data.joinLobby_player_id
      }
      dispatch(setLobbyInfo(info))
      for (let key in response.data.joinLobby_nicks) {
        dispatch(playerJoinedLobby(response.data.joinLobby_nicks.[key]))
      }
      console.log(response.data.joinLobby_result)
      dispatch(wsConnect(BASE_URL+API_ENDPOINT_WEBSOCKET+String(response.data.joinLobby_player_id)+"/"))
      dispatch(changeScreen(LOBBY_COMPONENT))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
        if(errorMsg === " You already are in the provided lobby") {
          dispatch(changeScreen(LOBBY_COMPONENT))
        }
      } catch (er) {
        errorMsg = "Something went wrong"
      }
      console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }
}

export const leaveLobby = lobby_id => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+API_ENDPOINT_LEAVE_LOBBY+lobby_id+"/"
  return dispatch => {
    axios.delete(uri, {},
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
      dispatch(changeScreen(MAIN_MENU_COMPONENT))
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

export const joinGame = game_id => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+API_ENDPOINT_GAME_INFO+game_id+"/"
  return dispatch => {
    axios.get(uri,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
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
