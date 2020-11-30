import { useSelector } from 'react-redux'
import decksrc from '../metaMedia/deck.png'


function Deck() {
  const cards_in_deck = useSelector(state => state.game.cards_in_deck)
  return (
    <div className="Div-invisible">
      <img className="Img-100" src={decksrc} alt="deck"/>
      <div className="Deck-number">{cards_in_deck}</div>
    </div>
  )
}

export default Deck
