import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wsSendMessage } from '../redux/reduxIndex'

function Chat() {
  const messages = useSelector(state => state.game.messages_log)

  const dispatch = useDispatch()
  const [chat, setChat] = useState('')
  const [msg_len, setmsg_len] = useState(messages.length)
  const msg_len_container = useRef(0)

  const scrollDown = () => {
    const objDiv = document.querySelectorAll('#chat_history')
    const fontSize = 30  // Make it twice as big as the actual font size
    const scroll_top = objDiv[0].scrollTop //!FIXME
    const client_height = objDiv[0].clientHeight
    const scroll_height = objDiv[0].scrollHeight
    // console.log(`Scroll top: ${scroll_top}. Client Height: ${client_height}. Font size: ${fontSize}`)
    // console.log(`${scroll_top + client_height + fontSize} comparing with ${scroll_height}`)
    if (scroll_top + client_height + fontSize >= scroll_height) {
      objDiv[0].scrollTop = scroll_height
    }
  }
  useEffect(() => {
    if (msg_len !== msg_len_container.current) {
      msg_len_container.current = messages.length
      setTimeout(scrollDown,50)
    }
  });

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
    <div className="Div-invisible">
      <ul id="chat_history" className="Chat-history">
        {formatedLogMessages()}
      </ul>
      <input id="chatInput" placeholder="chat" className="Chat-input" autoComplete="off" onChange={i => setChat(i.target.value)} onKeyDown={handleEnter}></input>
    </div>
  )
}

export default Chat
