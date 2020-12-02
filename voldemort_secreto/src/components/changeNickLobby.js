import React, { useState } from 'react'
import axios from 'axios'
import dobby from '../metaMedia/dobby.svg'
import { useSelector, useDispatch } from 'react-redux'
import { deactivateChangeNick } from '../redux/reduxIndex'
import {BASE_URL} from '../redux/API_Types'

function ChangeNickOnLobby() {
  const dispatch = useDispatch()
  const lobby_id = useSelector(state => state.game.lobby_id)
  const token = useSelector(state => state.session.authToken)
  const [playerNick, setPlayer_nick] = useState('')
  const [validityMsg, setValidityMsg] = useState('')

  function ChangeNick() {
    console.log("Sending Change Nick request to lobby:", lobby_id)
    const uri = BASE_URL + "/lobby/" + String(lobby_id) + "/change_nick"
    const body = { "nick": playerNick }
    axios.post(
      uri, body, { headers: { 'Authorization': token.token_type + " " + token.access_token } }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
      setValidityMsg("Your nickname was changed correctly")
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.detail
      } catch (er) {
        errorMsg = "The nick is already selected by another player " + er
      }
      console.log("-Response :" + JSON.stringify(errorMsg))
      setValidityMsg(errorMsg)
    })
  }

  function takeInput(inp) {
    const { name, value } = inp.target;
    switch (name) {
      case "setNewPlayerNick":
        setPlayer_nick(String(value))
        break;
      default:
        break;
    }
  }

  return (
    <div className="App-div-up">
      <img src={dobby} className="App-logo-without-animation" alt="logo" />
      <h1 className="black">Change your nickname on Lobby</h1>
      <input placeholder='New player nick' name='setNewPlayerNick' type='text' onBlur={takeInput} onClick={takeInput} onChange={takeInput}></input><br />
      <br/><button className="button-shadow-red" onClick={ChangeNick}>Check and confirm</button><br />
      <button className="button-shadow-red" onClick={() => dispatch(deactivateChangeNick())}>Close</button>
      <br/><label>{validityMsg}</label><br />
      <br/>
    </div>
  )
}

export default ChangeNickOnLobby
