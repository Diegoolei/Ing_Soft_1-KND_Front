import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import procl_phoenix_old from '../metaMedia/procl_phoenix_old.png'
import procl_de_old from '../metaMedia/procl_de_green.png'
import {
  deactivateDiscardCardDirector,
  deactivateDiscardCardMinister,
  disableDiscardCard,
  highlightCardOption,
  resetDiscardCard,
  confirmDiscardCard
} from '../redux/reduxIndex'

function DiscardCard() {
  const dispatch = useDispatch()
  const dcard_redux = useSelector(state => state.discard_card)
  const amount_options = dcard_redux.card_options.length

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
    let card_options = []
    for (let i in dcard_redux.card_options) {
      const card = dcard_redux.card_options[i]
      let src = '' 
      let alt = ''
      let buttonclassname = ''
      if (dcard_redux.highlighted_option !== i) {
        buttonclassname = "DCard-optionbutton" 
      } else {
        buttonclassname = "DCard-highlightedoption" 
      }
      if (card===0) {
        src = procl_phoenix_old
        alt = "Phoenix Proclamation"
      } else {
        src = procl_de_old
        alt = "Death Eater Proclamation"
      }
      const option = (
        <div className={styeclass.root} key={`discard_card_${i}`}>
          <button className={buttonclassname} onClick={() => dispatch(highlightCardOption(i))}>
          <img className="DCard-img" src={src} alt={alt}/>
          </button>
        </div>)
      card_options.push(option)
    }
    return <div className="DCard-options">{card_options}</div>
  }
  
  function confirm() {
    const selected_option = dcard_redux.highlighted_option
    if(selected_option !== -1) {
      const card_number = dcard_redux.card_options[selected_option]
      dispatch(confirmDiscardCard(card_number))
      dispatch(resetDiscardCard())
      close()
      dispatch(disableDiscardCard())
    }
  }
  
  const ConfirmButton = () => {
    let confirmButtonClassname
    if (dcard_redux.highlighted_option !== -1) {
      confirmButtonClassname = "DCard-confirm"
    } else {
      confirmButtonClassname = "DCard-confirm-grey"
    }
    return <button className={confirmButtonClassname} onClick={confirm}>Confirm</button>
  }
  
  function close() {
    dispatch(deactivateDiscardCardDirector())
    dispatch(deactivateDiscardCardMinister())
  }
  
  return (
    <div className="Dcard-Popup-background">
      <div className="Dcard-Popup">
        <div className="DCard-rules">
          Select one card to discard
        </div>
        <div className="DCard-optionContainer"><RenderOptions/></div>
        <ConfirmButton/>
        <button className="Button-Close" onClick={close}>X</button>
      </div>
    </div>
  )
}

export default DiscardCard
