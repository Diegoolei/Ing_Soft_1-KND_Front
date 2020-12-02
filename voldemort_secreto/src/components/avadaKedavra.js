import react from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import icons from '../metaMedia/icons/iconindex'
import { selectVictimToAvadaKedavra, confirmVictimToAvadaKedavra } from '../redux/game/avadaKedavra/avadaKedavraActions'
import { deactivateAvadaKedavra } from '../redux/reduxIndex'
 
function SpellAvadaKedavra() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.session.authToken)
  const game = useSelector(state => state.game)
  const candidates_avada_kedravra = useSelector(state => state.avada_kedavra.candidates_avada_kedravra)
  const highlighted_option = useSelector(state =>state.avada_kedavra.highlighted_option)
  const amount_options = candidates_avada_kedravra.length

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
    for (let i in candidates_avada_kedravra) {
      const nick = candidates_avada_kedravra[i]
      const icon_n = game.player_array[nick].icon
      const src = icons[icon_n]
      let buttonclassname
      if(highlighted_option !== i) {
        buttonclassname = "AvadaKedavra-optionbutton" 
      } else {
        buttonclassname = "AvadaKedavra-highlightedoption" 
      }
      const option = (
        <div className={styeclass.root} key={`AvadaKedavra_option_${nick})`}>
          <button className={buttonclassname} onClick={() => dispatch(selectVictimToAvadaKedavra(i))}>
          <img className="AvadaKedavra-img" src={src} alt={nick}/>
          {nick}
          </button>
        </div>)
      players_options.push(option)
    }
    return <div className="AvadaKedavra-options">{players_options}</div>
  }

  function confirm() {
    const selected_option = highlighted_option
    if(selected_option !== -1) {
      const nick = candidates_avada_kedravra[selected_option]
      const player_number = game.player_array[nick].player_number
      dispatch(confirmVictimToAvadaKedavra(player_number))
    }
  }

  const ConfirmButton = () => {
    let confirmButtonClassname
    if (highlighted_option !== -1) {
      confirmButtonClassname = "AvadaKedavra-confirm"
    } else {
      confirmButtonClassname = "AvadaKedavra-confirm-grey"
    }
    return <button className={confirmButtonClassname} onClick={confirm}>Confirm</button>
  }

  const closeAK = () => dispatch(deactivateAvadaKedavra())

  return (
    <div className="Popup-background">
      <div className="Popup">
      <div className="title-first-screen-alt">Avada Kedavra</div>
        <RenderOptions/>
        <ConfirmButton/>
        <button className="Button-Close" onClick={closeAK}>X</button>
      </div>
    </div>
  )
}

export default SpellAvadaKedavra
