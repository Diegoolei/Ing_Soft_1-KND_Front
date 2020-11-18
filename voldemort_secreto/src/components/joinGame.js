import { useDispatch, useSelector } from 'react-redux'
import { changeScreen, renderGamePage, joinGame } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import { LG_LISTS_PAGE_SIZE } from '../redux/lobbyGameList/lobbyGameListTypes'

function JoinGame() {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.joinlists)
  const total_players = "total players"

  const roleString = role => {
    switch (role) {
      case 0: return "an Order Member"
      case 1: return "a Death Eater"
      case 2: return "Voldemort"
      default: return "Unknown"
    }
  }

  function formatedList() {
    const unformated_games = (lists.gamePageContent === null) ? null : lists.gamePageContent.gameDict
    let formated_game = null
    let games_array = []
    for (let key in unformated_games) {
      let game_id = key
      let is_alive = unformated_games[key].is_alive
      let tot_ply = unformated_games[key][total_players]
      let role = unformated_games[key].role
      let nick = unformated_games[key].nick
      formated_game = (
        <li key={game_id}>
          <br /><button className="button-shadow-red" onClick={() => dispatch(joinGame(game_id))}>Rejoin </button>
          ({tot_ply} players) You are {roleString(role)} named "{nick}" and you are {is_alive ? "alive" : "not alive"}
        </li>)
      games_array.push(formated_game)
    }
    return games_array
  }

  function nextpage () {
    const currentAmountEntries = lists.gamePageAmountEntries
    const currentPageNumber = lists.gamePageNumber
    if (currentAmountEntries === LG_LISTS_PAGE_SIZE) {
      dispatch(renderGamePage(currentPageNumber + 1)) 
    }
  }

  function prevpage () {
    const currentPageNumber = lists.gamePageNumber
    if (currentPageNumber > 0) {
      dispatch(renderGamePage(currentPageNumber - 1)) 
    }
  }

  return (
    <div>
      <header className="App-header-test">
      <div className="App-div">
        <h1 className="brown">Your Games</h1>
        <ul className="ul-big">{formatedList()}</ul>
        <br/><button className="button" onClick={prevpage}>Prev</button>
        <button className="button" onClick={nextpage}>Next</button>
        <br/><button className="button" onClick={() => dispatch(changeScreen(MAIN_MENU_COMPONENT))}>Back to menu</button>
      </div>
      </header>
    </div>
  )
}

export default JoinGame
