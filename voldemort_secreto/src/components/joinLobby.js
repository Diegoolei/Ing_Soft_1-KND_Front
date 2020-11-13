import { useDispatch, useSelector } from 'react-redux'
import { changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { renderLobbyPage } from '../redux/reduxIndex'
import { LG_LISTS_PAGE_SIZE } from '../redux/lobbyGameList/lobbyGameListTypes'
import {joinLobby } from '../redux/reduxIndex'

function JoinLobby() {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.joinlists)
  const max_players = "max players"
  const actual_players = "actual players"

  function handleJoinButton(lobby_id) {
    console.log("Attempting to join Lobby", lobby_id)  
    dispatch(joinLobby(lobby_id))  
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
      <li>
        <br/><button className="button-shadow-red" onClick={() => handleJoinButton(lobby_id)}>Join</button>
        {name}  (owner: {owner})  ({currPlay}/{maxPlay})
      </li>)
      lobbiesArray.push(formatedLobby)
    }
    return lobbiesArray
  }

  function nextpage () {
    const currentAmountEntries = lists.lobbyPageAmountEntries
    const currentPageNumber = lists.lobbyPageNumber
    if (currentAmountEntries === LG_LISTS_PAGE_SIZE) {
      dispatch(renderLobbyPage(currentPageNumber + 1)) 
    }
  }

  function prevpage () {
    const currentPageNumber = lists.lobbyPageNumber
    if (currentPageNumber > 0) {
      dispatch(renderLobbyPage(currentPageNumber - 1)) 
    }
  }

  return (
    <div className="App-div-pastel-pink">
      <h1 className="white">JOIN LOBBY</h1>
      <ul>{formatedList()}</ul>
      <br/><button onClick={prevpage}>Prev</button>
      <button onClick={nextpage}>Next</button>
      <br/><br /><button onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back</button>
    </div>
  )
}

export default JoinLobby
