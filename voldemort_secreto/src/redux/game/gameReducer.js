import {
  CGL_SET_LOBBY_INFORMATION,
  CGL_SET_GAME_IMFORMATION,
  CGL_PLAYER_JOINED_LOBBY,
  CGL_PLAYER_JOINED_GAME,
  CGL_PLAYER_LEFT_LOBBY,
  CGL_PROCLAIM_PHOENIX,
  CGL_CLEAN_STATE,
  CGL_SET_PLAYER_ROLE,
  CGL_PROCLAIM_DEATH_EATER,
  CGL_SET_ELECTION_COUNTER,
  CGL_SET_DIRECTOR,
  CGL_SET_MINISTER,
  CGL_SET_CURRENT_CANDIDATE,
  CGL_UPDATE_NICK,
  CGL_START_WAITING_FOR_USER,
  CGL_SET_DECK_AMOUNT,
  CGL_USER_DONE_WITH_ACTION,
  CGL_LOG_ACTION,
  CGL_CONSUME_LOG,
  CGL_VOTE,
  CGL_SET_PLAYER_DEAD
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
  current_candidate: -1,
  player_array: null,
  amount_players: 0,
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
    vote: null
  }
}

const gameReducer = (state = initialState, action) => {
  let messages = [...state.messages_log]
  switch (action.type) {
    case CGL_SET_LOBBY_INFORMATION: return {
      ...state,
      lobby_id: action.payload.lobby_id,
      lobby_name: action.payload.lobby_name,
      player_id: action.payload.player_id,
      player_nick: action.payload.player_nick,
      is_owner: action.payload.is_owner,
      player_array: { [action.payload.player_nick]: getInitialPlayer(action.payload.player_nick) }
    }
      
    case CGL_SET_GAME_IMFORMATION: return {
      ...state,
      game_id: action.payload.game_id,
      game_step_turn: action.payload.game_step_turn,
      player_id: action.payload.player_id,
      player_nick: action.payload.player_nick,
      chat_blocked: action.payload.chat_blocked,
      current_minister: action.payload.current_minister,
      current_director: action.payload.current_director,
      election_counter: action.payload.election_counter,
      cards_in_deck: action.payload.cards_in_deck,
      proclaimed_phoenix: action.payload.proclaimed_phoenix,
      proclaimed_death_eater: action.payload.proclaimed_death_eater
    }

    case CGL_PLAYER_JOINED_LOBBY: return {
      ...state,
      player_array: {
        ...state.player_array,
        [action.payload]: getInitialPlayer(action.payload)
      }
    }

    case CGL_PLAYER_JOINED_GAME: 
      const pvote = action.payload.has_voted ? action.payload.vote : null
      return {
        ...state,
        player_array: {
          ...state.player_array,
          [action.payload.nick] : {
            nick: action.payload.nick,
            player_number: action.payload.player_number,
            connected: action.payload.connected,
            role: action.payload.role,
            is_alive: action.payload.is_alive,
            is_candidate: action.payload.is_candidate,
            vote: pvote,
            icon: action.payload.icon,
            house: action.payload.house
          }
        },
        amount_players: state.amount_players + 1
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
  
    case CGL_VOTE:
      let nick = ''
      let vote = null 
      for (let key in action.payload) {
        nick = key
        vote = action.payload[key]
      }
      let a_players = {
        ...state.player_array
      }
      a_players[nick].vote = vote
      return {
        ...state.player_array,
        player_array: a_players
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
        player_nick: (oldnick === state.player_nick) ? newnick : state.player_nick,
        player_array: players
    }

    case CGL_SET_DECK_AMOUNT: return {
      ...state,
      cards_in_deck: action.payload
    }

    case CGL_SET_PLAYER_ROLE: return {
      ...state,
      player_array: {
        ...state.player_array,
        [action.payload.nick]: {
          ...state.player_array[action.payload.nick],
          role: action.payload.role
        }
      }
    }

    case CGL_SET_DIRECTOR: return {
      ...state,
      current_director: action.payload
    }

    case CGL_SET_MINISTER: return {
      ...state,
      current_minister: action.payload
    }

    case CGL_SET_ELECTION_COUNTER: return {
      ...state,
      election_counter: action.payload
    }

    case CGL_SET_CURRENT_CANDIDATE: return {
      ...state,
      current_candidate: action.payload
    }

    case CGL_SET_PLAYER_DEAD: return {
      ...state,
      player_array: {
        ...state.player_array,
        [action.payload]: {
          ...state.player_array[action.payload],
          is_alive: false
        }
      }
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
      messages.push(action.payload)
      return {
      ...state,
      messages_log: messages
    }

    case CGL_CONSUME_LOG:
      messages.shift()
      return {
      ...state,
      messages_log: messages
    }
    
    default:  return state

  }
}

export default gameReducer
