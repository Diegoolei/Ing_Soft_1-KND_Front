import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL } from '../redux/API_Types'

function Director() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.session.authToken)
  const game_id = useSelector(state => state.game.game_id)
  const [playerNumber, setPlayer_number] = useState('')
  const [validityMsg, setValidityMsg] = useState('')

  function SelectDirectorCandidate() {
    console.log("Minister are electing a Director candidate...")
    const uri = BASE_URL + "/games/" + String(game_id) + "/select_director/"
    const body = { "player_number": playerNumber } // Checks if better player_nick 
    axios.post(
      uri, body, { headers: { 'Authorization': token.token_type + " " + token.access_token } }
    ).then(response => {
      console.log("-Response:" + JSON.stringify(response.data))
      setValidityMsg("The Minister are selected correctly")
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.retail
      }
      catch (err) {
        errorMsg = "You are not the Minister"
      }
      console.log("-Response:" + JSON.stringify(errorMsg))
      setValidityMsg(errorMsg)
    })
  }

  function takeInput(inp) {
    const { name, value } = inp.target;
    switch (name) {
      case "setPlayer_number":
        setPlayer_number(value)
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <h1>Select Director</h1>
      <form>
        <select id="country" name="country">
          <option value="Player 1">Player 1</option>
          <option value="Player 2">Player 2</option>
          <option value="Player 3">Player 3</option>
        </select>
      </form>
      <br /><button className="button" onClick={SelectDirectorCandidate}>Select player as Director candidate</button>
      <br /><label>{validityMsg}</label><br />
      {/* <button className="button" onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Main menu</button> */}
    </div>
  )
}

export default Director