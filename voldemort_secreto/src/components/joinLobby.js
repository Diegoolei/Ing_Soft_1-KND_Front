import react, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { renderLobbyPage } from '../redux/reduxIndex'

function JoinLobby() {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.joinlists)
  const max_players = "max players"
  const actual_players = "actual players"

  function handleJoinButton(lobby_id) {
    console.log("Attempting to join Lobby", lobby_id)    
  }

  function formatedList() {
    const unformatedLobbies = lists.lobbyPageContent.lobbyDict
    let formatedLobby = null
    let lobbiesArray = []
    for (let key in unformatedLobbies) {
      let lobby_id = unformatedLobbies.[key].lobby_id
      let name = key
      let currPlay = unformatedLobbies.[key].[actual_players]
      let maxPlay = unformatedLobbies.[key].[max_players]
      let owner = unformatedLobbies.[key].lobby_creator
      formatedLobby = (
      <div>
        <br/><button onClick={() => handleJoinButton(lobby_id)}>Join</button>
        <l1>    {name}  (owner: {owner})  ({currPlay}/{maxPlay})</l1>
      </div>)
      lobbiesArray.push(formatedLobby)
    }
    return lobbiesArray
  }

  function nextpage () {
    console.log("NOT DOING ANYTHING")
    //   dispatch(renderLobbyPage(1))
  }

  function prevpage () {
    console.log("NOT DOING ANYTHING")
    //   dispatch(renderLobbyPage(1))
  }

  return (
    <div>
      <h1>JOIN LOBBY</h1>
      <br/>{formatedList()}
      <br/><button onClick={prevpage}>Prev</button>
      <button onClick={nextpage}>Next</button>
      <br/><br /><button onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back</button>
    </div>
  )
}

export default JoinLobby