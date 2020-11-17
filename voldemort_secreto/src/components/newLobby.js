import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { changeScreen, createLobby } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'

function NewLobby () {
  const token = useSelector(state => state.session.authToken)
  const dispatch = useDispatch()

  const [privLobbyName, setPrivLobbyName] = useState('')
  const [privLobbyNameLen, setPrivLobbyNameLen] = useState(0)
  const [privMaxPlayers, setPrivMaxPlayers] = useState(10)
  const [privMinPlayers, setPrivMinPlayers] = useState(5)
  const [validityMsg, setValidityMsg] = useState('')


  function handleButton(){
    setValidityMsg('')
    if (privMinPlayers > privMaxPlayers) {
      setValidityMsg('Min Players must not be greater than Max Players')
    } 
    else if (privLobbyNameLen < 2 || privLobbyNameLen > 16) {
      setValidityMsg('Lobby name must be between 2 and 16 characters, inclusive')
    } 
    else {
      axios.post(
        "http://127.0.0.1:8000/lobby/",
        { lobbyIn_name: privLobbyName, 
          lobbyIn_max_players: privMaxPlayers, 
          lobbyIn_min_players: privMinPlayers
        },
        { headers: {
            'Authorization' : token.token_type + " " + token.access_token
          }
        }
      ).then(response => {
        dispatch(createLobby(response.data))
        //console.log("-Response :" + JSON.stringify(response.data)) // dispatch for when we have the lobby redux
      }).catch(error => {
        let errorMsg
        try {
          errorMsg = error.response.data.detail
          } catch (er) {
            errorMsg = "Something went wrong"
          }
          setValidityMsg(errorMsg)
      })
  }
}
  
  function takeInput(inp) {
    const { name, value } = inp.target;
    switch (name) {
      case 'lobby':
        setPrivLobbyName(value)
        setPrivLobbyNameLen(value.length)
        break;
      
      case 'minPlayers':
        setPrivMinPlayers(value)
        break;

      case 'maxPlayers':
        setPrivMaxPlayers(value)
        break;
    
      default:
        break;
    }
  }

  const lobbyForm = () => {
    return (
      <div>
        <br/>
        <input placeholder='lobby name' name='lobby' type='text' onBlur={takeInput} onChange={takeInput}/>
        <br/>
        <form>
            <label>Min Players: </label>
            <select name="minPlayers" defaultValue="5" onChange={takeInput}>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <br/><label>Max Players: </label>
            <select name="maxPlayers" defaultValue="10" onChange={takeInput}>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
        </form>
        <br/><button className="button" name="Create Lobby" onClick={handleButton}>Create Lobby</button>
        <br/>{validityMsg}
      </div>
    )
  }

  return (
    <header className="App-header">
      <div className="App-div">
        <h2 className="brown">Create Lobby</h2>
        <label>Please, fill in the following fields to create your lobby</label>
        {lobbyForm()}
        <button className="button" onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Cancel</button>
      </div>
    </header>
  )

}

export default NewLobby
