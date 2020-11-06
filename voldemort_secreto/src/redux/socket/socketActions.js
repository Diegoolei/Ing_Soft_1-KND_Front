import {
  WS_CONNECT_SUCCESS,
  WS_DISCONNECT_SUCCESS,
  WS_OPEN_SOCKET,
  WS_CLOSE_SOCKET,
  WS_SEND_MESSAGE,
  WS_RECEIVE_MESSAGE,
  WS_CONSUME_MESSAGE
} from './socketTypes'

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

export const wsConsumeMessage = () => {
  return {
    type: WS_CONSUME_MESSAGE
  }
}
