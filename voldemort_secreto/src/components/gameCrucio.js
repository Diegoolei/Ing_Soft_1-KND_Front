import { useDispatch } from 'react-redux'
import {
  highlightCrucioOption,
  confirmCrucioSelection,
  resetCrucio
} from '../redux/reduxIndex'
import { deactivateCrucio } from '../redux/reduxIndex'

function Crucio() {
  const dispatch = useDispatch()
  return (
    <div className="Popup-background">
      <div className="Popup">
        <h3>POPUP!</h3>
        <button className="Button-Close" onClick={() => dispatch(deactivateCrucio())}>X</button>
      </div>
    </div>
  )
}

export default Crucio
