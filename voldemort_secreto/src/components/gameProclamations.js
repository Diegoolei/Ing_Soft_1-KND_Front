import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import tapete_5_6 from '../metaMedia/tapete_de_5-6.png'
import tapete_7_8 from '../metaMedia/tapete_de_7-8.png'
import tapete_9_10 from '../metaMedia/tapete_de_9-10.png'
import phoenix_board from '../metaMedia/tapete_phoenix_2.png'
import de_proc from '../metaMedia/procl_de_green.png'
import ph_proc from '../metaMedia/procl_phoenix_old.png'

function Proclamations() {
  const width = 17
  const height = 40
  const de_jumpX = 14.9
  const ph_jumpX = 14.6
  const proclaimed_de = useSelector(state => state.game.proclaimed_death_eater)
  const proclaimed_pf = useSelector(state => state.game.proclaimed_phoenix)
  const amount_players = useSelector(state => state.player_portraits.player_amount)

  let board_n
  switch (amount_players) {
    case 5:
      board_n = 1
      break;
    case 6:
      board_n = 1
      break;
    case 7:
      board_n = 2
      break;
    case 8:
      board_n = 2
      break;
    case 9:
      board_n = 3
      break;
    case 10:
      board_n = 3
      break;
    default:
      board_n = 1 
      break;
  }
  const de_board_classname = "Img-de_board"
  const ph_board_classname = "Img-ph_board"

  const cardPosition = (x,y) => {
    const sliderSty = makeStyles({
      root: {
        position: "absolute",
        top:    `${x}%`,
        left:   `${y}%`,
        width:  `${width}%`,
        height: `${height}%`
      }
    })
    return sliderSty()
  }

  const generateCardArray = (amount, initialX, y, jumpX) => {
    let procl_arr = []
    for (let i=0; i< amount; i++) {
      let position = cardPosition(y, initialX + jumpX*i)
      procl_arr.push(position)
    }
    return procl_arr
  }

  const Cards = () => {
    let de_originX
    let de_originY
    let ph_originX
    let ph_originY
    switch (board_n) {
      case 1:
        de_originX = 3.3
        de_originY = 5.8
        ph_originX = 3.3
        ph_originY = 54
        break;
      case 2:
        de_originX = 4
        de_originY = 5.5
        ph_originX = 30
        ph_originY = 30
        break;
      case 3:
        de_originX = 4
        de_originY = 5.5
        ph_originX = 30
        ph_originY = 30
        break;
      default:
        de_originX = 4
        de_originY = 5.5
        ph_originX = 11.5
        ph_originY = 55
        break;
    }
    let de_prcl_arr = generateCardArray(proclaimed_de, de_originX, de_originY, de_jumpX)
    let ph_prcl_arr = generateCardArray(proclaimed_pf, ph_originX, ph_originY, ph_jumpX)
    let images_array = []
    for (let i in de_prcl_arr) {
      const cur_card = <img src={de_proc} className={de_prcl_arr[i].root} alt="death eater proclamation"/>
      images_array.push(cur_card)
    }
    for (let i in ph_prcl_arr) {
      const cur_card = <img src={ph_proc} className={ph_prcl_arr[i].root} alt="phoenix proclamation"/>
      images_array.push(cur_card)
    }
    return images_array
  }

  const Board = () => {
    switch (board_n) {
      case 1: return (
        <div className="Div-invisible">
          <img src={tapete_5_6} className={de_board_classname} alt="proclamations board"/>
          <br/><img src={phoenix_board} className={ph_board_classname} alt="proclamations board"/>
        </div>
      )

      case 2: return (
        <div className="Div-invisible">
          <img src={tapete_7_8} className={de_board_classname} alt="proclamations board"/>
          <br/><img src={phoenix_board} className={ph_board_classname} alt="proclamations board"/>
        </div>
      )

      case 3: return (
        <div className="Div-invisible">
          <img src={tapete_9_10} className={de_board_classname} alt="proclamations board"/>
          <br/><img src={phoenix_board} className={ph_board_classname} alt="proclamations board"/>
        </div>
      )

      default: return <div>ERROR ON BOARD FUNCTION PROCLAMATION.JS</div>
    }
  }

  return (
    <div className="Div-invisible">
      <Board/>
      <Cards/>
    </div>
  )
}

export default Proclamations
 