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

  const echoMsg = { "TYPE": "START_GAME", "PAYLOAD": currentGame_id }

  if (unreadMsg.length !== 0) {
    const jsonmsg = unreadMsg[0]
    console.log(JSON.stringify(jsonmsg))
    dispatch(wsConsumeMessage())
  }

  const openws = () => {
    const uri = "ws://127.0.0.1:8000/websocket/"+String(currentPlayer_id)
    dispatch(wsConnect(uri))
  }

  // const sendAuth = () => {
  //   console.log("Sending auth to socket. Token: ",token.access_token)
  //   dispatch(wsSendMessage(token.access_token))
  // }

  const closews = () => {
    dispatch(wsDisconnect())
  }

  const echoSingle = () => {
    const body = {
      player_id: currentPlayer_id,
      message: echoMsg
    }
    axios.post("http://127.0.0.1:8000/echo/", body)
  }

  const echoBroadcast = () => {
    const body = {
      game_id: currentGame_id,
      message: echoMsg
    }
    axios.post("http://127.0.0.1:8000/echo/", body)
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
          errorMsg = "Something went wrong:: " + er
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
          errorMsg = "Something went wrong:: " + er
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
          errorMsg = "Something went wrong:: " + er
        }
        console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }

  function startgame() {
    console.log("Starting game " + currentGame_id + " from lobby " + String(currentLobby_id))
    const uri = "http://127.0.0.1:8000/lobby/"+String(currentGame_id)+"/start_game/"
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
          errorMsg = "Something went wrong:: " + er
        }
        console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }

  function getgameinfo() {
    axios.get(
      "http://127.0.0.1:8000/games/"+String(currentGame_id),
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
          errorMsg = "Something went wrong:: " + er
        }
        console.log("-Response :" + JSON.stringify(errorMsg))
    })
    
  }

  function selectdirector() {
    console.log("Sending request to game: '"+ currentGame_id  +"' select director selecting player_number :"+String(selectDirector_number))
    const uri = "http://127.0.0.1:8000/games/"+String(currentGame_id)+"/select_director/"
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
          errorMsg = "Something went wrong:: " + er
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
        <br/>Player_id:<input name='playerid' type='number' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        <br/>Lobby_id:<input name='lobbyid' type='number' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        <br/>Game_id:<input name='gameid' type='number' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
      </p>
      <p>
      <br/><button onClick={createlobby}>Create Lobby</button>
        <input placeholder='Lobby name' name='setlobbyname' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
        <br/><button onClick={joinlobby}>Join Lobby</button>
        <button onClick={leavelobby}>Leave Lobby</button>
        <br/><button onClick={openws}>Open Socket</button>
        {/* <button onClick={sendAuth}>Auth Socket</button> */}
        <button onClick={closews}>Close Socket</button>
        <br/><button onClick={() => dispatch(wsSendMessage(chatmsg))}>Chat</button>
        <input placeholder='message' name='setchatmsg' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
      </p>
      <p>
        <button onClick={startgame}>Start Game</button>
        <button onClick={getgameinfo}>Get Game Info</button>
        <br/><button onClick={selectdirector}>Select Director</button>
        <input name='selectdirector' type='number' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input>
      </p>
      <p>
        Message to echo: {JSON.stringify(echoMsg)}
        <br/><button onClick={echoSingle}>Send to Player {currentPlayer_id}</button>
        <br/><button onClick={echoBroadcast}>Send to Game {currentGame_id}</button>
      </p>
      <br/><button onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back</button>
    
    </div>
  )
}

export default TestSocket
