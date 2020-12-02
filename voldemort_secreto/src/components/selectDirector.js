import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL } from '../redux/API_Types'
import { deactivateCandidateSelection, makeSelectDirectorUnavailable } from '../redux/reduxIndex'

function Director() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.session.authToken)
  const game = useSelector(state => state.game)
  const [playerNumber, setPlayer_number] = useState(null)
  const candidates = useSelector(state => state.select_director.candidates)
  console.log("Player number:", playerNumber)

  function SelectDirectorCandidate() {
    if (playerNumber !== null) {
      const uri = BASE_URL + "/games/" + String(game.game_id) + "/select_director"
      const body = { "playerNumber": playerNumber }
      axios.post(
        uri, body, { headers: { 'Authorization': token.token_type + " " + token.access_token } }
      ).then(response => {
        dispatch(deactivateCandidateSelection())
        dispatch(makeSelectDirectorUnavailable())
      }).catch(error => {
        let errorMsg
        try {
          errorMsg = error.response.data.retail
        }
        catch (err) {
          errorMsg = "You are not the Minister"
        }
        console.log("-Response:", errorMsg)
      })
    }
  }

  function takeInput(inp) {
    const { value } = inp.target;
    setPlayer_number(value)
  }

  function FormOptions(){
    let options_arr = []
    const nullOption = <option value={null} key={`select_director_option_null`}>Select Director...</option>
    options_arr.push(nullOption)
    for(let i in candidates) {
      const current_nick = candidates[i]
      const current_player_number = game.player_array[current_nick].player_number
      const option = <option value={current_player_number} key={`select_director_option_${current_player_number}`}>{current_nick}</option>
      options_arr.push(option)
    }
    return options_arr
  }

  const close = () => dispatch(deactivateCandidateSelection())

  return (
    <div className="Popup-background">
      <div className="Popup">
        <h2>Select Director</h2>
        <form onChange={takeInput}>
          <select id="nick_player" name="nick">
            <FormOptions/>
          </select>
        </form>
      <button className="button" onClick={SelectDirectorCandidate}>Select</button>
      <button className="Button-Close" onClick={close}>X</button>
      </div>
    </div>
  )
}

export default Director
