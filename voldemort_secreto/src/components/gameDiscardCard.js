import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import procl_phoenix_old from '../metaMedia/procl_phoenix_old.png'
import procl_de_old from '../metaMedia/procl_de_green.png'
import { BASE_URL } from '../redux/API_Types'
import {
  deactivateDiscardCardDirector,
  deactivateDiscardCardMinister,
  disableDiscardCard,
  highlightCardOption,
  resetDiscardCard,
  confirmDiscardCard,
} from '../redux/reduxIndex'

function DiscardCard() {
  const dispatch = useDispatch()
  const dcard_redux = useSelector(state => state.discard_card)
  const game = useSelector(state => state.game)
  const token = useSelector(state => state.session.authToken)
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
        "width": `${75/amount_options}%`,
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
      // const card_number = dcard_redux.card_options[selected_option]
      const sending = parseInt(selected_option) + 1
      dispatch(confirmDiscardCard(sending))
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

  const is_expelliarmus_available = () => {
    if (game.proclaimed_death_eater < 5) return false
    const current_player_number = game.player_array[game.player_nick].player_number
    return current_player_number === game.current_director
  }

  function ExpelliarmusButton () {
    const launchExpelliarmus = () => {
      const uri = BASE_URL+`/games/${game.game_id}/spell/expeliarmus`
      axios.put(uri, {},
        {
          headers: { 'Authorization': token.token_type + " " + token.access_token }
        }
      ).then(response => {
        console.log("-Response :" + JSON.stringify(response.data))
        dispatch(disableDiscardCard())
        dispatch(deactivateDiscardCardDirector())
        dispatch(deactivateDiscardCardMinister())
      }).catch(error => {
        console.log(error)
      })
    }

    return (
      <button className="button" onClick={launchExpelliarmus}>Expelliarmus!</button>
    )
  }
  
  return (
    <div className="Dcard-Popup-background">
      <div className="Dcard-Popup">
        <div className="Dcard-font-rules">
          Select one card to discard
        </div>
        <div className="DCard-optionContainer"><RenderOptions/></div>
        <ConfirmButton/>
        <br/>{is_expelliarmus_available() ? <ExpelliarmusButton/> : null}
        <button className="Button-Close" onClick={close}>X</button>
      </div>
    </div>
  )
}

export default DiscardCard
