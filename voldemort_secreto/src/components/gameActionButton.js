import { useSelector, useDispatch } from 'react-redux'
import nimbus from '../metaMedia/nimbus.svg'
import { activateCrucio } from '../redux/reduxIndex'

function ActionButton() {
  // const activeApps = useSelector(state => state.active_apps)
  const dispatch = useDispatch()

  let buttonClick = () => console.log("Wrong on gameActionButton")
  let alt = "Incorrect Buttom"
  let src = nimbus

  buttonClick = () => dispatch(activateCrucio())

  return (
    <div className="Div-invisible">
      <button className="Action-button" onClick={buttonClick}>
          <img className="Img-50" src={src} alt={alt}/>
      </button>
    </div>
    
  )
}

export default ActionButton
