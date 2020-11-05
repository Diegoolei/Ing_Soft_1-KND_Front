import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { wsConnect, wsDisconnect, wsSendMessage } from '../redux/socket/socketActions'
import axios from 'axios'

function TestSocket() {
  const dispatch = useDispatch()

  const openws = () => {
    dispatch(wsConnect("ws://127.0.0.1:8000/wstest/"))
  }

  const closews = () => {
    dispatch(wsDisconnect())
  }

  const askButton = () => {
    axios.post("http://127.0.0.1:8000/ws2/")
  }


  return (
    <div>
      <h1>Socket Test</h1>
      <button onClick={openws}>Start Socket</button>
      <button onClick={closews}>Disconnect</button>
      <button onClick={() => dispatch(wsSendMessage("Message Front to back"))}>Ask for Number</button>
    </div>
  )
}

export default TestSocket

// import React, { useState } from 'react'

// function TestSocket() {
//   var stuff = false
//   if (!stuff) {
//     var ws = new WebSocket("ws://127.0.0.1:8000/ws/")
//     stuff = true
//   }
//   ws.onmessage = function (event) {
//     var content = document.createTextNode(event.data)
//     console.log(content)
//     console.log("Msg:", event.data)
//     ws.send('Hello Server!');
//   };

//   ws.addEventListener('open', function (event) {
//     console.log("Event: open!")
//     //ws.send('Hello Server!');
//   });

//   // ws.addEventListener('message', function (event) {
//   //   console.log('Message from server', event.data);
//   //   //ws.send("Confirmed")
//   // });

//   return (
//     <div>
//       <button onClick={() => ws.send("I clicked on the browser")}>Send Socket Msg</button>
//     </div>
//   )
// }

// export default TestSocket