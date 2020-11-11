import react, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'

function JoinLobby () {
  const ENTRIES_PER_PAGE = 10
  const dispatch = useDispatch()
  const token = useSelector(state => state.session.authToken)
  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState('')

  // const data =[{"name":"test1"},{"name":"test2"}];
  // const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);

  function getLobbies(from, to) {
    console.log("Getting lobbies from", from, "to", to)
    axios.get(
      "http://127.0.0.1:8000/lobby/list_lobbies/",
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

  return (
    <div>
      <h1>JOIN LOBBY</h1>
      <br/><button onClick={() => getLobbies(1,10)}>Get Lobbies</button>
      <br/><button onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back</button>
    </div>
  )
}

export default JoinLobby