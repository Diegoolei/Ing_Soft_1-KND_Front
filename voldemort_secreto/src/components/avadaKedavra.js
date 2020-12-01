
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL, API_ENDPOINT_SPELL, API_ENDPOINT_AVADA_KEDAVRA } from '../redux/API_Types'

function SpellAvadaKedavra() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.session.authToken)
  const game_id = useSelector(state => state.game.game_id)
  const [victim_number, setPlayer_number] = useState('')
  const [validityMsg, setValidityMsg] = useState('')
  const candidates_avada_kedravra = useSelector(state => state.avada_kedavra.candidates_avada_kedravra)

  function AvadaKedavra() {
    console.log("Avada Kedavra...")
    const uri = BASE_URL + "/games/" + String(game_id) + API_ENDPOINT_SPELL + API_ENDPOINT_AVADA_KEDAVRA
    const body = { "victim_number": victim_number }
    axios.put(
      uri, body, { headers: { 'Authorization': token.token_type + " " + token.access_token } }
    ).then(response => {
      console.log("-Response:" + JSON.stringify(response.data))
      setValidityMsg("The player was selected correctly")
    }).catch(error => {
      let errorMsg
      try {
        errorMsg = error.response.data.retail
      }
      catch (err) {
        errorMsg = "You can't cast Avada Kedavra..."
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

  function FormOptionsAvada() {
    let options_arr = []
    for (let i in candidates_avada_kedravra) {
      const current_nick = candidates_avada_kedravra[i]
      const option = <option value={current_nick}>{current_nick}</option>
      options_arr.push(option)
    }
    return options_arr
  }

  return (
    <div>
      <h1>Avada Kedavra</h1>
      <form>
        <select id="nick_player" name="nick">
          <FormOptionsAvada />
        </select>
      </form>
      <br /><button className="button" onClick={AvadaKedavra}>Select player</button>
      <br /><label>{validityMsg}</label><br />
    </div>
  )
}

export default SpellAvadaKedavra
