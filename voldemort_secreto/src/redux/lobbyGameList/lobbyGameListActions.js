import axios from 'axios'
import {
  LG_LISTS_PAGE_SIZE,
  LG_LISTS_REQUEST_LOBBY_PAGE,
  LG_LISTS_REQUEST_GAME_PAGE,
  LG_LISTS_SET_LOBBY_LIST,
  LG_LISTS_SET_GAME_LIST,
  LG_LISTS_SET_RESPONSE
} from './lobbyGameListTypes'
import { BASE_URL ,API_ENDPOINT_LIST_LOBBIES, API_ENDPOINT_LIST_GAMES } from '../API_Types'
import store from '../store'


export const requestLobbyPage = pageNumber => {
  return {
    type : LG_LISTS_REQUEST_LOBBY_PAGE,
    payload : pageNumber
  }
}

export const requestGamePage = pageNumber => {
  return {
    type : LG_LISTS_REQUEST_GAME_PAGE,
    payload : pageNumber
  }
}

export const setLobbyPage = response => {
  return {
    type: LG_LISTS_SET_LOBBY_LIST,
    payload: response
  }
}

export const setGamePage = response => {
  return {
    type: LG_LISTS_SET_GAME_LIST,
    payload: response
  }
}

export const setResponse = response => {
  return {
    type: LG_LISTS_SET_RESPONSE,
    payload: response
  }
}

export const renderLobbyPage = pageNumber => {
  const state = store.getState()
  const token = state.session.authToken

  return dispatch => {
    dispatch(requestLobbyPage(pageNumber))
    axios.get(BASE_URL+API_ENDPOINT_LIST_LOBBIES,
      {
        headers: {
          'Authorization': token.token_type + " " + token.access_token
        }, 
        params: { 
          start_from: LG_LISTS_PAGE_SIZE*pageNumber + 1, 
          end_at: LG_LISTS_PAGE_SIZE*(pageNumber + 1) + 1
        }
      }).then(response => {
        const lobbies = response.data
        const resp = {
          content: lobbies,
          entries: Object.keys(lobbies.lobbyDict).length,
          date: Date.now()
        }
        dispatch(setLobbyPage(resp))
        //console.log("-Response :" + JSON.stringify(response.data.lobbyDict))
      }).catch(error => {
        let errorMsg
        try {
          errorMsg = error.response.data.detail
        }
        catch (er) {
          errorMsg = "Something went wrong:: " + er
        }
        dispatch(setResponse(errorMsg))
      })
  }
}

export const renderGamePage = pageNumber => {
  const state = store.getState()
  const token = state.session.authToken

  return dispatch => {
    dispatch(requestGamePage(pageNumber))
    axios.get(BASE_URL+API_ENDPOINT_LIST_GAMES,
      {
        headers: {
          'Authorization': token.token_type + " " + token.access_token
        }, 
        params: { 
          start_from: LG_LISTS_PAGE_SIZE*pageNumber + 1, 
          end_at: LG_LISTS_PAGE_SIZE*(pageNumber + 1) + 1
        }
      }).then(response => {
        const games = response.data
        const resp = {
          content: games,
          entries: Object.keys(games.gameDict).length,
          date: Date.now()
        }
        dispatch(setGamePage(resp))
        //console.log("-Response :" + JSON.stringify(response.data.lobbyDict))
      }).catch(error => {
        let errorMsg
        try {
          errorMsg = error.response.data.detail
        }
        catch (er) {
          errorMsg = "Something went wrong:: " + er
        }
        dispatch(setResponse(errorMsg))
      })
  }
}
