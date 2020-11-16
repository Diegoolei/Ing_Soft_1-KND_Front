import {
  CGL_SET_LOBBY_INFORMATION,
  CGL_SET_GAME_IMFORMATION,
  CGL_PLAYER_JOINED_LOBBY,
  CGL_PLAYER_LEFT_LOBBY,
  CGL_PROCLAIM_PHOENIX,
  CGL_CLEAN_STATE,
  CGL_PROCLAIM_DEATH_EATER,
  CGL_UPDATE_NICK,
  CGL_START_WAITING_FOR_USER,
  CGL_USER_DONE_WITH_ACTION,
  CGL_LOG_ACTION,
  CGL_CONSUME_LOG,
  CGL_REJECTED_ELECTION,
  CGL_ACCEPTED_ELECTION
} from './gameTypes'


const initialState = {
  lobby_id: 0,
  lobby_name: '',
  is_owner: false,
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
  messages_log: [],
  waiting_for_user: false,
  loading: false
}

/*
 turn_step : 
-1 : Turno inicial cuando recién empieza el juego
0 : Nuevo turno 
1 : Seleccionar director 
2 : Votar
3 : si => Ministro obtiene 3 cartas y descarta 1
    no => Incrementar marcador de elecciones, salta a 0 (con caos salta a 5)
4 : Director recibe 2 cartas y descarta 1
5 : Se proclama la carta
6 : Si hay hechizos se lanzan
7 : Gana fenix o mortífagos
*/

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
    case CGL_SET_LOBBY_INFORMATION: 
    console.log("Payload::  "+JSON.stringify(action))
    return {
      ...state,
      lobby_id: action.payload.lobby_id,
      lobby_name: action.payload.lobby_name,
      player_id: action.payload.player_id,
      is_owner: action.payload.is_owner
    }
      
    case CGL_SET_GAME_IMFORMATION: return state

    case CGL_PLAYER_JOINED_LOBBY: return {
      ...state,
      player_array: {
        ...state.player_array,
        [action.payload]: getInitialPlayer(action.payload)
      }
    }

    case CGL_PLAYER_LEFT_LOBBY: 
      let new_players = {...state.player_array}
      delete new_players[action.payload]
      return {
      ...state,
      player_array: new_players
    }

    case CGL_CLEAN_STATE: return initialState

    case CGL_PROCLAIM_PHOENIX: return {
      ...state,
      proclaimed_phoenix: state.proclaimed_phoenix + 1
    }
    
    case CGL_PROCLAIM_DEATH_EATER: return {
      ...state, 
      proclaimed_death_eater: state.proclaimed_death_eater + 1
    }
  
    case CGL_ACCEPTED_ELECTION: return {
      ...state,
      turn_step: 3
    }

    case CGL_UPDATE_NICK:
      const oldnick = action.payload.oldnick
      const newnick = action.payload.newnick
      let players = {
        ...state.player_array,
        [newnick]: state.player_array[oldnick]
      }
      players[newnick].nick = newnick
      delete players[oldnick]
      return {
        ...state,
        player_array: players
    }

    case CGL_START_WAITING_FOR_USER: return {
      ...state,
      waiting_for_user: true
    }

    case CGL_USER_DONE_WITH_ACTION: return {
      ...state,
      waiting_for_user: false
    }

    case CGL_LOG_ACTION:
      let messages = [...state.messages_log]
      messages.push(action.payload)
      return {
      ...state,
      messages_log: messages
    }

    case CGL_CONSUME_LOG:
      messages = [...state.messages_log]
      messages.shift()
      return {
      ...state,
      messages_log: messages
    }
    
    default:  return state

  }
}

export default gameReducer
