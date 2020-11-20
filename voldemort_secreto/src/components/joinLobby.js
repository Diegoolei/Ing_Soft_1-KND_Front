import { useDispatch, useSelector } from 'react-redux'
import { changeScreen, renderLobbyPage, joinLobby } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { LG_LISTS_PAGE_SIZE } from '../redux/lobbyGameList/lobbyGameListTypes'

function JoinLobby() {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.joinlists)
  const max_players = "max players"
  const actual_players = "actual players"

  function formatedList() {
    const unformatedLobbies = lists.lobbyPageContent.lobbyDict
    let formatedLobby = null
    let lobbiesArray = []
    for (let key in unformatedLobbies) {
      let lobby_id = unformatedLobbies[key].lobby_id
      let name = key
      let currPlay = unformatedLobbies[key][actual_players]
      let maxPlay = unformatedLobbies[key][max_players]
      let owner = unformatedLobbies[key].lobby_creator
      formatedLobby = (
        <li key={lobby_id}>
          <br /><button className="button-shadow-red" onClick={() => dispatch(joinLobby(lobby_id))}>Join </button>
          {name}  (owner: {owner})  ({currPlay}/{maxPlay})
        </li>)
      lobbiesArray.push(formatedLobby)
    }
    if (lobbiesArray.length === LG_LISTS_PAGE_SIZE + 1) {
      lobbiesArray.pop()
    }
    if (lobbiesArray.length === 0) {
      return <p>No available lobbies</p>
    }
    return lobbiesArray
  }

  function nextpage () {
    const currentAmountEntries = lists.lobbyPageAmountEntries
    const currentPageNumber = lists.lobbyPageNumber
    if (currentAmountEntries === LG_LISTS_PAGE_SIZE + 1) {
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
        <button className="button" onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back to menu</button>
        <br/><ul className="ul-big">{formatedList()}</ul>
        <br/>{lists.loading || lists.lobbyPageNumber === 0 ? null : <button className="button" onClick={prevpage}>Prev</button>}
        {!lists.loading && lists.lobbyPageAmountEntries === LG_LISTS_PAGE_SIZE + 1 ? <button className="button" onClick={nextpage}>Next</button> : null}
      </div>
      </header>
    </div>
  )
}

export default JoinLobby
