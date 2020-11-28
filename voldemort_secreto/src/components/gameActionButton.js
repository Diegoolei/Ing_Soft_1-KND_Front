import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import crucioIcon from '../metaMedia/crucio_icon.png'
import { activateCrucio } from '../redux/reduxIndex'

function ActionButton() {
  const activeApps = useSelector(state => state.active_apps)
  const dispatch = useDispatch()
  let chosenButton = null

  if (activeApps.is_crucio_available) chosenButton = 'CRUCIO'

  let buttonClick = () => null
  let alt = "empty button"
  let src = null

  switch (chosenButton) {
    case 'CRUCIO':
      buttonClick = () => dispatch(activateCrucio())
      alt         = "Crucio"
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
