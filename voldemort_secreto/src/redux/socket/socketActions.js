import {
  WS_CONNECT_REQUEST, WS_CONNECT_SUCCESS, WS_CONNECT_FAILURE,
  WS_DISCONNECT_REQUEST, WS_DISCONNECT_SUCCESS, WS_DISCONNECT_FAILURE,
  WS_OPEN_SOCKET, WS_CLOSE_SOCKET, WS_SEND_MESSAGE, WS_RECEIVE_MESSAGE
} from './socketTypes'

// const wsConnect      = host => ({ type: 'WS_CONNECT', host });
// const wsConnecting   = host => ({ type: 'WS_CONNECTING', host });
// const wsConnected    = host => ({ type: 'WS_CONNECTED', host });
// const wsDisconnect   = host => ({ type: 'WS_DISCONNECT', host });
// const wsDisconnected = host => ({ type: 'WS_DISCONNECTED', host });

export const wsConnect = host => {
  return {
    type:  WS_OPEN_SOCKET,
    payload : host
  }
}

export const wsConnectSuccess = host => {
  return {
    type:  WS_CONNECT_SUCCESS,
    payload : host
  }
}

export const wsDisconnect = host => {
  return {
    type:  WS_CLOSE_SOCKET,
    payload : host
  }
}

export const wsDisconnectSuccess = () => {
  return {
    type:  WS_DISCONNECT_SUCCESS,
  }
}

export const wsSendMessage = msg => {
  return {
    type: WS_SEND_MESSAGE,
    payload: msg
  }
}

export const wsReceiveMessage = msg => {
  return {
    type: WS_RECEIVE_MESSAGE,
    payload : msg
  }
}
