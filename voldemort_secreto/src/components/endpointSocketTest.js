import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { wsConnect, wsDisconnect, wsSendMessage, wsConsumeMessage, changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import axios from 'axios'

function TestSocket() {
  const dispatch = useDispatch()
  const unreadMsg = useSelector(state => state.socket.messages)
  const token = useSelector(state => state.session.authToken)
  const [lobbyName, setLobbyName] = useState('')
  const [currentLobby_id, setCurrentLobby_id] = useState('')
  const [currentPlayer_id, setCurrentPlayer_id] = useState('')
  const [currentGame_id, setCurrentGame_id] = useState('')
  const [selectDirector_number, setselectDirector_number] = useState('')
  const [chatmsg, setchatmsg] = useState('')

  if (unreadMsg.length !== 0) {
    const jsonmsg = unreadMsg[0]
    const content = jsonmsg.content;
    if (jsonmsg.type === 'JSON') {
      console.log("Message from the server: ", JSON.stringify(content))
    } else {
      console.log("Message from the server: ", content)
    }
    dispatch(wsConsumeMessage())
  }

  const openws = () => {
    dispatch(wsConnect("ws://127.0.0.1:8000/ws/"+String(currentPlayer_id)))
  }
  const closews = () => {
    dispatch(wsDisconnect())
  }

  function createlobby () {
    console.log("Sending create Lobby request with lobby name:", lobbyName)
    axios.post(
      "http://127.0.0.1:8000/lobby/",
      { lobbyIn_name: lobbyName },
      { headers: {
          'Authorization' : token.token_type + " " + token.access_token
        }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
        } catch (er) {
          errorMsg = "Something went wrong"
        }
        console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }

  function joinlobby() {
    console.log("Sending Join Lobby request to lobby:", currentLobby_id)
    axios.post(
      "http://127.0.0.1:8000/lobby/"+String(currentLobby_id)+"/",
      { lobbyIn_name: lobbyName },
      {
        headers: {
          'Authorization': token.token_type + " " + token.access_token
        }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
        } catch (er) {
          errorMsg = "Something went wrong"
        }
        console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }

  function leavelobby() {
    console.log("Leaving lobby:"+String(currentLobby_id))
    axios.delete(
      "http://127.0.0.1:8000/lobby/"+String(currentLobby_id),
      { 
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
        } catch (er) {
          errorMsg = "Something went wrong"
        }
        console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }

  function startgame() {
    console.log("Starting game " + currentGame_id + " from lobby " + String(currentLobby_id))
    const uri = "http://127.0.0.1:8000/lobby/"+String(currentLobby_id)+"/start_game/"
    console.log("Making POST Request::", uri)
    axios.delete(
      uri,
      {
        data: {},
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
        } catch (er) {
          errorMsg = "Something went wrong"
        }
        console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }

  function selectdirector() {
    console.log("Sending request to game: '"+ currentGame_id  +"' select director selecting player_number :"+String(selectDirector_number))
    const uri = "http://127.0.0.1:8000/games/"+String(selectDirector_number)+"/select_director/"
    console.log("Making POST Request::", uri)
    const body = { "playerNumber" : selectDirector_number }
    axios.post(
      uri, body, 
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token },
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
        } catch (er) {
          errorMsg = "Something went wrong"
        }
        console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }

  function takeInput(inp) {
    const { name, value } = inp.target;
    switch (name) {
      case "setlobbyname":
        setLobbyName(value)
        break;
      
      case "setchatmsg":
        setchatmsg(value)
        break;
      
      case "lobbyid":
        setCurrentLobby_id(value)
        break;

      case "gameid":
        setCurrentGame_id(value)
        break;

      case "playerid":
        setCurrentPlayer_id(value)
        break;

      case "selectdirector":
        setselectDirector_number(value)
        break;

      default:
        break;
    }
  }

  return (
    <div>
      <h1>Endpoint/Socket Tests</h1>
      <p>
        {":>>Current IDs<<:"}
        <br/>Lobby_id:<input name='lobbyid' type='number' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        <br/>Game_id:<input name='gameid' type='number' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
      </p>
      <p>
      <br/><button onClick={createlobby}>Create Lobby</button>
        <input placeholder='Lobby name' name='setlobbyname' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        <br/><button onClick={joinlobby}>Join Lobby</button>
        <button onClick={leavelobby}>Leave Lobby</button>
        <br/><button onClick={openws}>Open Socket</button>
        <button onClick={closews}>Close Socket</button>
        {/* <br/><button onClick={askButton}>Trigger Different Endpoint</button> */}
        <br/><button onClick={() => dispatch(wsSendMessage(chatmsg))}>Chat</button>
        <input placeholder='message' name='setchatmsg' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
      </p>
      <p>
        <button onClick={startgame}>Start Game</button>
        <br/><button onClick={selectdirector}>Select Director</button>
        <input name='selectdirector' type='number' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
      </p>
      <br/><button onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back</button>
    
    </div>
  )
}

export default TestSocket