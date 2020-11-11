import {
  LG_LISTS_REQUEST_LOBBY_PAGE,
  LG_LISTS_REQUEST_GAME_PAGE,
  LG_LISTS_SET_LOBBY_LIST,
  LG_LISTS_SET_GAME_LIST,
  LG_LISTS_SET_RESPONSE
} from './lobbyGameListTypes'

const initialState = {
  gamePageNumber: -1,
  gamePageContent: null,
  gamePageAmountEntries: 0,
  gamePageDate: null,
  lobbyPageNumber: -1,
  lobbyPageContent: '',
  lobbyPageAmountEntries: 0,
  lobbyPageDate: null,
  loading: false,
  response: '',
}

const lobbyGameListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LG_LISTS_REQUEST_LOBBY_PAGE: return {
      ...state,
      lobbyPageNumber: action.payload,
      loading: true
    }

    case LG_LISTS_REQUEST_GAME_PAGE: return {
      ...state,
      gamePageNumber: action.payload,
      loading: true
    }

    case LG_LISTS_SET_LOBBY_LIST: return {
      ...state,
      lobbyPageContent: action.payload.content,
      lobbyPageAmountEntries: action.payload.entries,
      lobbyPageDate: action.payload.date,
      loading: false
    }

    case LG_LISTS_SET_GAME_LIST: return {
      ...state,
      gamePageContent: action.payload.content,
      gamePageAmountEntries: action.payload.entries,
      gamePageDate: action.payload.date,
      loading: false
    }

    case LG_LISTS_SET_RESPONSE: return {
      ...state,
      response: action.payload
    }

    default: return state
  }
}

export default lobbyGameListReducer
