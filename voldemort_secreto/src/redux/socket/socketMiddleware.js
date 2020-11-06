import { 
  wsConnectSuccess,
  wsDisconnectSuccess,
  wsReceiveMessage
} from './socketActions'

import { 
  WS_OPEN_SOCKET, 
  WS_CLOSE_SOCKET,
  WS_SEND_MESSAGE,
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
    let payload = null
    try {
      const msg = JSON.parse(event.data);
      payload = {
        type: 'JSON',
        content: msg
      }
    } catch (error) {
      const msg = event.data;
      payload = {
        type: 'STRING',
        content: msg
      }
    }
    console.log('Server sent: "'+JSON.stringify(payload.content)+'"')
    store.dispatch(wsReceiveMessage(payload))
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
