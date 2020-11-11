import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

function NewLobby () {
  const sessionState = useSelector(state => state.session)
  const token = useSelector(state => state.session.authToken)

  const [privGname, setPrivGname] = useState(sessionState.gname)
  const [privLobbyName, setPrivLobbyName] = useState('')
  const [privMaxPlayers, setPrivMaxPlayers] = useState(10)
  const [privMinPlayers, setPrivMinPlayers] = useState(5)
  const [validityState, setValidityMsg] = useState('')


  function handleButton(){
    if (privLobbyName == '') {
      setValidityMsg('Lobby name must not be empty. Should be between 3 and 16 characters')
    }  else if (privGname === '') {
      setValidityMsg('Game name must not be empty')
    } else {
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


      // dispatch(setLobby(privLobby))
      // dispatch(setGname(privGname))
      // dispatch(register(privLobby, privGname)) //I don't know how to pass on the result of the drop-down list :c
  }
}
  
  function takeInput(inp) {
    const { name, value } = inp.target;
    switch (name) {

      case 'lobby':
        setPrivLobbyName(value)
        break;

      case 'gname':
        setPrivGname(value)
        break;
    
      default:
        break;
    }
  }

  const lobbyForm = () => {
    return (
      <div>
        <input placeholder='lobby name' name='lobby' type='text' onBlur={takeInput} onChange={takeInput}/>
        
        <br/>
        <form>
            <label>Min Players: </label>
            <select defaultValue="5" onChange={takeInput}>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <br/><label>Max Players: </label>
            <select defaultValue="10" onChange={takeInput}>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
        </form>
          
        <br/><label>Name during the game:</label>
          <input placeholder='nick' name='nick' type='text' defaultValue={privGname} onBlur={takeInput} onChange={takeInput}></input>
       
        <br/><button name="Create Lobby" onClick={handleButton}>Create Lobby</button>
      </div>
    )
  }

  return (
    <header className="App-header">
      <h2>
        Create Lobby
      </h2>
      <label>
        Please, fill in the following fields to create your lobby
      </label>
      {lobbyForm()}
    </header>
  )

}

export default NewLobby
