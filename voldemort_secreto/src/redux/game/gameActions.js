import store from '../store'
import axios from 'axios'
import {
  CGL_SET_LOBBY_INFORMATION,
  CGL_SET_GAME_IMFORMATION,
  CGL_CLEAN_STATE,
  CGL_PLAYER_JOINED_LOBBY,
  CGL_PLAYER_LEFT_LOBBY,
  CGL_UPDATE_NICK,
  CGL_START_WAITING_FOR_USER,
  CGL_USER_DONE_WITH_ACTION,
  CGL_LOG_ACTION,
  CGL_CONSUME_LOG
} from './gameTypes'

import {
  BASE_URL,
  BASE_WS_URL,
  API_ENDPOINT_JOIN_LOBBY,
  API_ENDPOINT_LEAVE_LOBBY,
  API_ENDPOINT_START_GAME,
  API_ENDPOINT_GAME_INFO,
  API_ENDPOINT_WEBSOCKET
} from '../API_Types'

import { LOBBY_COMPONENT, GAME_COMPONENT, MAIN_MENU_COMPONENT } from '../componentController/componentControllerTypes'
import { changeScreen, wsConnect } from '../reduxIndex'

export const playerJoinedLobby = nick => {
  return {
    type: CGL_PLAYER_JOINED_LOBBY,
    payload: nick
  }
}

export const playerLeftLobby = nick => {
  return {
    type: CGL_PLAYER_LEFT_LOBBY,
    payload: nick
  }
}

export const setLobbyInfo = info => {
  return {
    type: CGL_SET_LOBBY_INFORMATION,
    payload: {
      lobby_id: info.lobby_id,
      lobby_name: info.lobby_name,
      player_id: info.player_id,
      is_owner: info.is_owner
    }
  }
}

export const setGameInfo = info => {
  return {
    type: CGL_SET_GAME_IMFORMATION,
    payload: info
  }
}

export const cleanState = () => {
  return {
    type: CGL_CLEAN_STATE
  }
}

export const updateNick = (oldnick, newnick) => {
  return {
    type: CGL_UPDATE_NICK,
    payload: {
      oldnick: oldnick,
      newnick: newnick
    }
  }
}

export const startWaiting = () => {
  return {
    type: CGL_START_WAITING_FOR_USER
  }
}

export const userDoneWithAction = () => {
  return {
    type: CGL_USER_DONE_WITH_ACTION
  }
}

export const logAction = msg => {
  return {
    type: CGL_LOG_ACTION,
    payload: msg
  }
}

export const consumeLog = () => {
  return {
    type: CGL_CONSUME_LOG
  }
}

export const createLobby = response_data => {
  //console.log("Dispathing createLobby::  " + JSON.stringify(response_data))
  return dispatch => {
    const info = {
      lobby_id: response_data.lobbyOut_Id,
      lobby_name: response_data.lobbyOut_name,
      player_id: response_data.lobbyOut_player_id,
      is_owner: true
    }
    dispatch(setLobbyInfo(info))
    dispatch(wsConnect(BASE_WS_URL+API_ENDPOINT_WEBSOCKET+String(response_data.lobbyOut_player_id)))
    dispatch(changeScreen(LOBBY_COMPONENT))
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
      //console.log("-Response :" + JSON.stringify(response.data))
      const info = {
        lobby_id: lobby_id,
        lobby_name: response.data.joinLobby_name,
        player_id: response.data.joinLobby_player_id,
        is_owner: response.data.joinLobby_is_owner
      }
      dispatch(setLobbyInfo(info))
      for (let key in response.data.joinLobby_nicks) {
        dispatch(playerJoinedLobby(response.data.joinLobby_nicks.[key]))
      }
      console.log(response.data.joinLobby_result)
      dispatch(wsConnect(BASE_WS_URL+API_ENDPOINT_WEBSOCKET+String(response.data.joinLobby_player_id)))
      dispatch(changeScreen(LOBBY_COMPONENT))
    }).catch(error => {
      let errorMsg
      try {
        console.log(error)
        errorMsg = error.response.data.detail
        if(errorMsg === " You already are in the provided lobby") {
          dispatch(changeScreen(LOBBY_COMPONENT))
        }
      } catch (er) {
        errorMsg = "Something went wrong:: " + er
      }
      console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }
}

export const leaveLobby = lobby_id => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+API_ENDPOINT_LEAVE_LOBBY+String(lobby_id)
  return dispatch => {
    axios.delete(uri,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
      dispatch(closeLobby("LEFT"))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
        switch (errorMsg) {
          case " You are not in the provided lobby":
            dispatch(closeLobby("LEFT"))
            break;
          
          case " The lobby you selected does not exist":
            dispatch(closeLobby("LEFT"))
            break;
        
          default:
            console.log("Unexpected error: ", errorMsg)
            break;
        }
      } catch (er) {
        errorMsg = "Something went wrong:: " + er
      }
      console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }
}

export const closeLobby = reason => {
  return dispatch => {
    switch (reason) {
      case "LEFT":
        dispatch(cleanState())
        dispatch(changeScreen(MAIN_MENU_COMPONENT))
        break;
    
      default:
        console.log("Closing lobby by reason of "+reason)
        dispatch(cleanState())
        dispatch(changeScreen(MAIN_MENU_COMPONENT))
        break;
    }
  }
}

export const startGame = lobby_id => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+API_ENDPOINT_START_GAME+String(lobby_id)+"/start_game"
  return dispatch => {
    axios.delete(uri,
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
}


export const joinGame = game_id => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+API_ENDPOINT_GAME_INFO+String(game_id)
  return dispatch => {
    axios.get(uri,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
      dispatch(cleanState())
      //dispatch(setGameInfo(response.data))
      /*
      -Response :{
        "game_id":12,
        "game_step_turn":-1,
        "player_id":83,
        "player_nick":"lao2",
        "chat_blocked":false,
        "current_minister":0,
        "current_director":-1,
        "player_array": 
          {
            "lao5":{"nick":"lao5","player_number":3,"connected":true,"role":2,"is_alive":true,"is_candidate":false,"vote":false},
            "lao1":{"nick":"lao1","player_number":0,"connected":true,"role":0,"is_alive":true,"is_candidate":false,"vote":false},
            "lao2":{"nick":"lao2","player_number":1,"connected":true,"role":1,"is_alive":true,"is_candidate":false,"vote":false},
            "lao3":{"nick":"lao3","player_number":4,"connected":true,"role":0,"is_alive":true,"is_candidate":false,"vote":false},
            "lao4":{"nick":"lao4","player_number":2,"connected":true,"role":0,"is_alive":true,"is_candidate":false,"vote":false}
          },
          "election_counter":0,
          "cards_in_deck":17,
          "proclaimed_phoenix":0,
          "proclaimed_death_eater":0
        }
      */
      dispatch(changeScreen(GAME_COMPONENT))
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
}


export const voteInGame = (vote_recive, game_id) => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+API_ENDPOINT_GAME_INFO+game_id+"/vote/"

  return dispatch => {
    axios.put(uri,
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
}

