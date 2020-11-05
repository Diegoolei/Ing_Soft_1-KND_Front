import { 
  wsConnectSuccess, wsDisconnectSuccess, wsReceiveMessage,

} from './socketActions'
import { WS_OPEN_SOCKET, WS_CLOSE_SOCKET, WS_SEND_MESSAGE } from './socketTypes'

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
    //console.log("Received:"+event.data)
    //const payload = JSON.parse(event.data);
    const payload = event.data
    store.dispatch(wsReceiveMessage(payload))
    console.log('receiving server message');
    console.log('showing::'+JSON.stringify(payload))

    // switch (payload.type) {
    //   case 'update_game_players':
    //     store.dispatch(updateGame(payload.game, payload.current_player));
    //     break;
    //   default:
    //     break;
    // }
  };

  // the middleware part of this function
  // Do something in here, when each action is dispatched
  /*
  // The Structure of the middleware is slightly obscured by the arrow functions. This is another way of writing the same thing
  function socketMiddleware(storeAPI) {
    return function wrapDispatch(next) {
      return function handleAction(action) {
        console.log("Socket middleware running! I got the "+action.type+"s action")
        // Do something in here, when each action is dispatched
        // Do anything here: pass the action onwards with next(action),
        // or restart the pipeline with storeAPI.dispatch(action)
        // Can also use storeAPI.getState() here
        return next(action)
      }
    }
  }
  */
  return store => next => action => {
    switch (action.type) {
      case WS_OPEN_SOCKET:
        console.log("WS_OPEN SOCKET ACTION DISPATCHED")
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
        socket.send(action.payload)
        break;
      // case 'NEW_MESSAGE':
      //   console.log('sending a message', action.msg);
      //   socket.send(JSON.stringify({ command: 'NEW_MESSAGE', message: action.msg }));
      //   break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
