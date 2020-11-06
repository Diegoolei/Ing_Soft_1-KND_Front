import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { wsConnect, wsDisconnect, wsSendMessage, wsConsumeMessage } from '../redux/reduxIndex'
import axios from 'axios'

function TestSocket() {
  const dispatch = useDispatch()
  const unreadMsg = useSelector(state => state.socket.messages)

  if (unreadMsg.length !== 0) {
    const jsonmsg = unreadMsg[0]
    const content = jsonmsg.content;
    if (jsonmsg.type === 'JSON') {
      console.log("Consuming Message:", JSON.stringify(content))
    } else {
      console.log("Consuming Message:", content)
    }
    dispatch(wsConsumeMessage())
  }

  const openws = () => {
    dispatch(wsConnect("ws://127.0.0.1:8000/ws/1"))
  }

  const closews = () => {
    dispatch(wsDisconnect())
  }

  const askButton = () => {
    axios.post("http://127.0.0.1:8000/wsmsg/1")
  }

  return (
    <div>
      <h1>Socket Test</h1>
      <button onClick={openws}>Open Socket</button>
      <button onClick={closews}>Close Socket</button>
      <br/><button onClick={askButton}>Trigger Different Endpoint</button>
      <br/><button onClick={() => dispatch(wsSendMessage("Chat message from Front through websocket"))}>Send Chat Msg</button>
    </div>
  )
}

export default TestSocket
