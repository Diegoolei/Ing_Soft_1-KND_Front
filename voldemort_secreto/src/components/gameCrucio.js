import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import icons from '../metaMedia/icons/iconindex'
import {
  highlightCrucioOption,
  confirmCrucioSelection,
  resetCrucio
} from '../redux/reduxIndex'
import { deactivateCrucio } from '../redux/reduxIndex'
import { makeCrucioUnavailable } from '../redux/game/activeApps/activeAppsActions'

function Crucio() {
  const dispatch = useDispatch()
  const crucio_redux = useSelector(state => state.crucio)
  const game = useSelector(state => state.game)
  const amount_options = crucio_redux.options.length

  const optionStyle = () => {
    let style = {
      root: {
        "display": "inline-block",
        "box-sizing": "border-box",
        "border-radius": "5%",
        "border": "none",
        "padding": "1%",
        "margin": "0%",
        "width": `${100/amount_options}%`,
      }
    }
    const stl = makeStyles(style)
    return stl()
  }

  const styeclass = optionStyle()

  function RenderOptions() {
    let players_options = []
    for (let i in crucio_redux.options) {
      const nick = crucio_redux.options[i]
      const icon_n = game.player_array[nick].icon
      const src = icons[icon_n]
      let buttonclassname
      if(crucio_redux.highlighted_option !== i) {
        buttonclassname = "Crucio-optionbutton" 
      } else {
        buttonclassname = "Crucio-highlightedoption" 
      }
      const option = (
        <div className={styeclass.root} key={`crucio_option_${nick})`}>
          <button className={buttonclassname} onClick={() => dispatch(highlightCrucioOption(i))}>
          <img className="Crucio-img" src={src} alt={nick}/>
          {nick}
          </button>
        </div>)
      players_options.push(option)
    }
    return <div className="Crucio-options">{players_options}</div>
  }

  function confirm() {
    const selected_option = crucio_redux.highlighted_option
    if(selected_option !== -1) {
      const nick = crucio_redux.options[selected_option]
      const player_number = game.player_array[nick].player_number
      dispatch(confirmCrucioSelection(player_number))
    }
  }

  const ConfirmButton = () => {
    let confirmButtonClassname
    if (crucio_redux.highlighted_option !== -1) {
      confirmButtonClassname = "Crucio-confirm"
    } else {
      confirmButtonClassname = "Crucio-confirm-grey"
    }
    return <button className={confirmButtonClassname} onClick={confirm}>Confirm</button>
  }

  function Reveal() {
    const selected_option = crucio_redux.highlighted_option
    const nick = crucio_redux.options[selected_option]
    const icon_n = game.player_array[nick].icon
    const src = icons[icon_n]

    const roleString = (crucio_redux.role === 0) ? "from the Order of the Phoenix" : "a Death Eater"
    return (
      <div className="Crucio-revealcontainer">
        <img className="Crucio-revealimg" src={src} alt={nick}/>
        <br/>{nick} is {roleString}
      </div>
    )
  }

  function close() {
    if (crucio_redux.role === null) {
      dispatch(deactivateCrucio())
    } else {
      dispatch(resetCrucio())
      dispatch(makeCrucioUnavailable())
      dispatch(deactivateCrucio())
    }
  }

  return (
    <div className="Popup-background">
      <div className="Popup">
        <div className="Crucio-rules">
          Choose a player to investigate. You will get their loyalty. If you get Death Eater, that player
          could also be Voldemort.
        </div>
        {crucio_redux.role === null ? (<div className="Div-invisible">
          <div className="Crucio-optionContainer"><RenderOptions/></div>
          <ConfirmButton/>
        </div>)
         : <Reveal/>}
        <button className="Button-Close" onClick={close}>X</button>
      </div>
    </div>
  )
}

export default Crucio
