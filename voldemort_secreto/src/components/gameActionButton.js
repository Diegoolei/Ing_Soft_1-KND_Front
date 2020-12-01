import { useSelector, useDispatch } from 'react-redux'
import crucioIcon from '../metaMedia/ActionButton/crucio_icon.png'
import hat2 from '../metaMedia/ActionButton/hat2.png'
import discardCard from '../metaMedia/ActionButton/discardCard.png'
import voto from '../metaMedia/ActionButton/voto.svg' 
import { activateVote } from '../redux/game/activeApps/activeAppsActions'
import {
  activateCrucio,
  activateCandidateSelection,
  activateDiscardCardDirector,
  activateDiscardCardMinister
} from '../redux/reduxIndex'

function ActionButton() {
  const activeApps = useSelector(state => state.active_apps)
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()

  function isMinister() {
    const res = false
    if (game.player_id===game.current_minister) {
      res = true
    }
    return res
  }

  let chosenButton = null
  if (activeApps.is_crucio_available) chosenButton = 'CRUCIO'
  if (activeApps.is_discard_card_available) chosenButton = 'DISCARD_CARD'
  if (activeApps.is_select_director_available) chosenButton = 'SELECT_DIRECTOR'
  if (activeApps.is_vote_available) chosenButton = 'VOTE'

  let buttonClick = () => null
  let alt = "empty button"
  let src = null

  switch (chosenButton) {
    case 'CRUCIO':
      buttonClick = () => dispatch(activateCrucio())
      alt         = "Crucio"
      src         = crucioIcon
      break;

    case 'SELECT_DIRECTOR':
      buttonClick = () => dispatch(activateCandidateSelection())
      alt         = 'Select Director'
      src         = hat2
      break;
      
    case 'DISCARD_CARD':
      if (isMinister()) {
        buttonClick = () => dispatch(activateDiscardCardMinister())
      }
      else {
        buttonClick = () => dispatch(activateDiscardCardDirector())
      }
      alt         = "Discard Card"
      src         = discardCard
      break;
    
    case 'VOTE':
      buttonClick = () => dispatch(activateVote())
      alt         = 'Vote'
      src         = voto

    default:
      break;
  }

  return (
    <div className="Div-invisible">
      <button className="Action-button" onClick={buttonClick}>
        {src !== null ? <img className="Img-80" src={src} alt={alt}/> : null}
      </button>
    </div>
  )
}

export default ActionButton
