import store from '../store'
import axios from 'axios'
import {
  CGL_CHAT_MEMORY_LENGTH,
  CGL_SET_LOBBY_INFORMATION,
  CGL_SET_GAME_IMFORMATION,
  CGL_CLEAN_STATE,
  CGL_PLAYER_JOINED_LOBBY,
  CGL_PLAYER_JOINED_GAME,
  CGL_PLAYER_LEFT_LOBBY,
  CGL_SET_DECK_AMOUNT,
  CGL_UPDATE_NICK,
  CGL_PROCLAIM_PHOENIX,
  CGL_SET_CURRENT_CANDIDATE,
  CGL_PROCLAIM_DEATH_EATER,
  CGL_START_WAITING_FOR_USER,
  CGL_SET_DIRECTOR,
  CGL_SET_MINISTER,
  CGL_USER_DONE_WITH_ACTION,
  CGL_SET_ELECTION_COUNTER,
  CGL_SET_PLAYER_ROLE,
  CGL_LOG_ACTION,
  CGL_CONSUME_LOG,
  CGL_VOTE,
  CGL_SET_PLAYER_DEAD
} from './gameTypes'


import {
  BASE_URL,
  BASE_WS_URL,
  API_ENDPOINT_JOIN_LOBBY,
  API_ENDPOINT_LEAVE_LOBBY,
  API_ENDPOINT_START_GAME,
  API_ENDPOINT_GAME_INFO,
  API_ENDPOINT_WEBSOCKET,
  API_ENDPOINT_VOTE
} from '../API_Types'

import { LOBBY_COMPONENT, GAME_COMPONENT, MAIN_MENU_COMPONENT } from '../componentController/componentControllerTypes'
import { changeScreen, wsConnect } from '../reduxIndex'
import { setPlayerPortraits } from './playerPortrait/playerPortraitActions'

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

export const playerJoinedGame = player_info => {
  return {
    type: CGL_PLAYER_JOINED_GAME,
    payload: player_info
  }
}

export const setLobbyInfo = info => {
  return {
    type: CGL_SET_LOBBY_INFORMATION,
    payload: {
      lobby_id: info.lobby_id,
      lobby_name: info.lobby_name,
      player_id: info.player_id,
      player_nick: info.player_nick,
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

export const vote = (n, v) => {
  return {
    type: CGL_VOTE,
    payload: {
      nick: n,
      vote: v
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

export const addLog = msg => {
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

export const proclaimPhoenix = () => {
  return {
    type: CGL_PROCLAIM_PHOENIX
  }
}

export const proclaimDeathEater = () => {
  return {
    type: CGL_PROCLAIM_DEATH_EATER
  }
}

export const setDeckAmount = amount_cards => {
  return {
    type: CGL_SET_DECK_AMOUNT,
    payload: amount_cards
  }
}

export const setPlayerRole = (nick, role) => {
  return {
    type: CGL_SET_PLAYER_ROLE,
    payload: {
      nick: nick,
      role: role
    }
  }
}

export const setPlayerDead = nick => {
  return {
    type: CGL_SET_PLAYER_DEAD,
    payload: nick
  }
}

export const setDirector = player_number => {
  return {
    type: CGL_SET_DIRECTOR,
    payload: player_number
  }
}

export const setMinister = player_number => {
  return {
    type: CGL_SET_MINISTER,
    payload: player_number
  }
}

export const setElectionCounter = value => {
  return {
    type: CGL_SET_ELECTION_COUNTER,
    payload: value
  }
}

export const setCurrentCandidate = player_number => {
  return {
    type: CGL_SET_CURRENT_CANDIDATE,
    payload: player_number
  }
}

export const updateDeckAmount = () => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+ `/games/${state.game.game_id}/deck`
  return dispatch => {
    axios.get(uri,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      dispatch(setDeckAmount(response.data.cards_in_deck))
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

export const logAction = msg => {
  const state = store.getState()
  return dispatch => {
    dispatch(addLog(msg))
    if(state.game.messages_log.length > CGL_CHAT_MEMORY_LENGTH) {
      dispatch(consumeLog())
    }
  }
}

export const createLobby = response_data => {
  //console.log("Dispathing createLobby::  " + JSON.stringify(response_data))
  return dispatch => {
    const info = {
      lobby_id: response_data.lobbyOut_Id,
      lobby_name: response_data.lobbyOut_name,
      player_id: response_data.lobbyOut_player_id,
      player_nick: response_data.lobbyOut_player_nick,
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
        player_nick: response.data.joinLobby_player_nick,
        is_owner: response.data.joinLobby_is_owner
      }
      dispatch(setLobbyInfo(info))
      for (let key in response.data.joinLobby_nicks) {
        dispatch(playerJoinedLobby(response.data.joinLobby_nicks[key])) //dispatch(playerJoinedLobby(response.data.joinLobby_nicks.[key]))
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
      // console.log("-Response :" + JSON.stringify(response.data))
      dispatch(cleanState())
      const info = {
        game_id: game_id,
        game_step_turn:         response.data.game_step_turn,
        player_id:              response.data.player_id,
        player_nick:            response.data.player_nick,
        chat_blocked:           response.data.chat_blocked,
        current_minister:       response.data.current_minister,
        current_director:       response.data.current_director,
        election_counter:       response.data.election_counter,
        cards_in_deck:          response.data.cards_in_deck,
        proclaimed_phoenix:     response.data.proclaimed_phoenix,
        proclaimed_death_eater: response.data.proclaimed_death_eater
      }
      if (state.socket.status === "closed") {
        dispatch(wsConnect(BASE_WS_URL+API_ENDPOINT_WEBSOCKET+String(response.data.player_id)))
      }
      dispatch(setGameInfo(info))
      const player_array = response.data.player_array
      for (let key in player_array) {
        const player_info = {
          nick: key,
          player_number: player_array[key].player_number,
          connected: player_array[key].connected,
          role: player_array[key].role,
          is_alive: player_array[key].is_alive,
          is_candidate: player_array[key].is_candidate,
          has_voted: player_array[key].has_voted,
          vote: player_array[key].vote,
          icon: player_array[key].icon,
          house: player_array[key].house
        }
        dispatch(playerJoinedGame(player_info))
      }
      dispatch(setPlayerPortraits(player_array, response.data.player_nick))
      dispatch(changeScreen(GAME_COMPONENT))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
      } catch (er) {
        errorMsg = "Something went wrong:: " + er
      }
    })
  }
}


export const spellProphecy = () => {

  const cardString = card => card===0 ? "Phoenix Proclamation" : "Death Eater Proclamation"

  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+`/games/${state.game.game_id}/spell/prophecy`
  return dispatch => {
    axios.get(uri,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      const c1 = response.data.prophecy_card_0
      const c2 = response.data.prophecy_card_1
      const c3 = response.data.prophecy_card_2
      const prophecy_cards = `Card 1: ${cardString(c1)} - Card 2: ${cardString(c2)} - Card 3: ${cardString(c3)}`
      dispatch(logAction(prophecy_cards))
      console.log("-Prophecy response:", response.data)
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
  const body = { "vote" : vote_recive }
  const uri = BASE_URL+API_ENDPOINT_GAME_INFO+String(game_id)+API_ENDPOINT_VOTE

  return dispatch => {
    axios.put(uri, body,
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
