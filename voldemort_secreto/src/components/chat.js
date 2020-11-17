import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wsSendMessage } from '../redux/reduxIndex'

function Chat() {
  const messages = useSelector(state => state.game.messages_log)

  const dispatch = useDispatch()
  const [chat, setChat] = useState('')
  const [msg_len, setmsg_len] = useState(messages.length)

  if (msg_len !== messages.length) {
    let objDiv = document.querySelectorAll('#chat_history')
    objDiv[0].scrollTop = objDiv[0].scrollHeight
    setmsg_len(messages.length)
  }

  function formatedLogMessages() {
    const msg_arr = []
    for (let m in messages) {
      msg_arr.push(<li key={m}>{messages[m]}</li>)
    }
    return msg_arr
  }

  function handleEnter(inp) {
    const value = inp.target.value;
    setChat(value)
    if (inp.keyCode === 13 && chat.length > 0) {
      dispatch(wsSendMessage(chat))
      document.getElementById('chatInput').value = ''
      setChat('')
    }
  }

  return (
    <div className="Chat-container">
      <ul id="chat_history" className="Chat-history">
        {formatedLogMessages()}
      </ul>
      <input id="chatInput" placeholder="chat" className="Chat-input" autoComplete="off" onChange={i => setChat(i.target.value)} onKeyDown={handleEnter}></input>
    </div>
  )
}

export default Chat