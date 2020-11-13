import {
  CGL_SET_LOBBY_INFORMATION,
  CGL_SET_GAME_IMFORMATION,
  CGL_PLAYER_JOINED_LOBBY,
  CGL_PROCLAIM_PHOENIX,
  CGL_PROCLAIM_DEATH_EATER
} from './gameTypes'

const initialState = {
  lobby_id: 0,
  lobby_name: '',
  game_id: 0,
  turn_step: -1,
  player_id: -1,
  player_nick: '',
  chat_blocked: false,
  current_minister: -1,
  current_director: -1,
  player_array: null,
  election_counter: 0,
  cards_in_deck: 17,
  proclaimed_phoenix: 0,
  proclaimed_death_eater: 0,
  loading: false
}

const getInitialPlayer = nick => {
  return {
    nick: nick,
    player_number: -1,
    connected: true,
    role: -1,
    is_alive: true,
    is_candidate: false,
    vote: -1
  }
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CGL_SET_LOBBY_INFORMATION: return {
      ...state,
      lobby_id: action.payload.lobby_id,
      lobby_name: action.payload.lobby_name,
      player_id: action.payload.player_id
    }
      
    case CGL_SET_GAME_IMFORMATION: return state

    case CGL_PLAYER_JOINED_LOBBY: return {
      ...state,
      player_array: {
        ...state.player_array,
        [action.payload]: getInitialPlayer(action.payload)
      }
    }

    case CGL_PROCLAIM_PHOENIX: return {
      ...state,
      proclaimed_phoenix: state.proclaimed_phoenix + 1
    }
    
    case CGL_PROCLAIM_DEATH_EATER: return {
      ...state, 
      proclaimed_death_eater: state.proclaimed_death_eater + 1
    }
  
    default:  return state

  }
}

export default gameReducer
