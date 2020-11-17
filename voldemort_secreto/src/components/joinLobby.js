import { useDispatch, useSelector } from 'react-redux'
import { changeScreen, renderLobbyPage, joinLobby } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { LG_LISTS_PAGE_SIZE } from '../redux/lobbyGameList/lobbyGameListTypes'

function JoinLobby() {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.joinlists)
  const max_players = "max players"
  const actual_players = "actual players"

  function handleJoinButton(lobby_id) {
    //console.log("Attempting to join Lobby", lobby_id)  
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
      <li key={lobby_id}>
        <br/><button className="button-shadow-red" onClick={() => handleJoinButton(lobby_id)}>Join </button>
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
    <div>
      <header className="App-header-test">
      <div className="App-div">
        <h1 className="brown">Join Lobby</h1>
        <ul>{formatedList()}</ul>
        <br/><button className="button" onClick={prevpage}>Prev</button>
        <button className="button" onClick={nextpage}>Next</button>
        <br/><button className="button" onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back to menu</button>
      </div>
      </header>
    </div>
  )
}

export default JoinLobby
