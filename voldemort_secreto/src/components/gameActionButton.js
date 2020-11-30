import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import crucioIcon from '../metaMedia/crucio_icon.png'
import {
  activateCrucio, 
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

  let buttonClick = () => null
  let alt = "empty button"
  let src = null

  switch (chosenButton) {
    case 'CRUCIO':
      buttonClick = () => dispatch(activateCrucio())
      alt         = "Crucio"
      src         = crucioIcon
      break;
      
    case 'DISCARD_CARD':
      if (isMinister()) {
        buttonClick = () => dispatch(activateDiscardCardMinister())
      }
      else {
        buttonClick = () => dispatch(activateDiscardCardDirector())
      }
      alt         = "Discard Card"
      src         = crucioIcon
      break;

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
