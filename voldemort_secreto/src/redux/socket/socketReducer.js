import { 
  WS_CONNECT_REQUEST, WS_CONNECT_SUCCESS, WS_CONNECT_FAILURE,
  WS_DISCONNECT_REQUEST, WS_DISCONNECT_SUCCESS, WS_DISCONNECT_FAILURE,
  WS_RECEIVE_MESSAGE, WS_CONSUME_MESSAGE
} from './socketTypes'


const initialState = {
  host :'',
  status : 'closed',
  messages : []
}

const socketReducer = (state = initialState, action) => {
  let mgs = [...state.messages]
  switch (action.type) {
    case WS_CONNECT_REQUEST: return {
      ...state,
      host: action.payload,
      status: 'connecting'
    }

    case WS_CONNECT_SUCCESS: return {
      ...state,
      status: 'open'
    }

    case WS_CONNECT_FAILURE: return {
      ...state,
      status: 'failed to connect'
    }

    case WS_DISCONNECT_REQUEST: return {
      ...state,
      status: 'disconnecting'
    }

    case WS_DISCONNECT_SUCCESS: return {
      ...state,
      status: 'closed'
    }

    case WS_DISCONNECT_FAILURE: return {
      ...state,
      status: 'failed to disconnect'
    }

    case WS_RECEIVE_MESSAGE: 
      // let mgs = [...messages]
      mgs.push(action.payload)
      return {
        ...state,
        messages : mgs
    }

    case WS_CONSUME_MESSAGE:
      // let mgs = [...messages]
      mgs.shift()
      return {
        ...state,
        messages : mgs
    }
  
    default: return state
  }
}

export default socketReducer
