import { 
  wsConnectSuccess,
  wsDisconnectSuccess,
  wsReceiveMessage
} from './socketActions'

import { 
  WS_OPEN_SOCKET, 
  WS_CLOSE_SOCKET,
  WS_SEND_MESSAGE,
  REQUEST_AUTH,
} from './socketTypes'

const socketMiddleware = () => {
  let socket = null;

  const onOpen = store => (event) => {
    console.log('websocket open', event.target.url);
    store.dispatch(wsConnectSuccess(event.target.url));
  };

  const onClose = store => () => {
    store.dispatch(wsDisconnectSuccess());
  };

  const onMessage = store => (event) => {
    try {
      const websocket_message = JSON.parse(event.data);
      if (websocket_message.TYPE === REQUEST_AUTH) {
        const state = store.getState()
        const token = state.session.authToken.access_token
        socket.send(token)
        console.log("Authenticating websocket connection...")
      } else {
        //console.log('Server sent: "'+JSON.stringify(websocket_message)+'"')
        store.dispatch(wsReceiveMessage(websocket_message))
      }
    } catch (error) {
      switch (event.data) {
        case "Connection Accepted":
          console.log("Server accepted Socket Auth.")
          break

        case "Connection rejected":
          console.log("Server rejected Socket connection.")
          break
      
        default:
          console.log('ERROR: Could not parse or got raw string. Server sent: ', event.data)
          break
      }
    }
  }

  // The middleware part of this function
  return store => next => action => {
    switch (action.type) {
      case WS_OPEN_SOCKET:
        if (socket !== null) {
          socket.close();
        }
        // connect to the remote host
        socket = new WebSocket(action.payload);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);
        break;

      case WS_CLOSE_SOCKET:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('websocket closed');
        break;

      case WS_SEND_MESSAGE:
        console.log("Sending message: "+action.payload)
        socket.send(action.payload)
        break;

      default:
        return next(action);
    }
  }
}

export default socketMiddleware();
