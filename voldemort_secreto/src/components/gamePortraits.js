import { useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles'

function Portraits() {
  const player_portraits = useSelector(state => state.player_portraits)
  const portrait_size = 10

  const portraitPosition = (top,left) => {
    const sliderSty = makeStyles({
      root: {
        "background-color": "rgb(0, 226, 0)",
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        height: `${portrait_size}%`,
        width: `${portrait_size}%`
      }
    })
    return sliderSty()
  }

  const getPortraits = () => {
    const positions_arr = player_portraits.player_arr
    let portrait_array = []
    for (let i in positions_arr) {
      console.log(i, positions_arr[i])
      const clas = portraitPosition(positions_arr[i].top, positions_arr[i].left)
      const portr = <div key={i} className={clas.root}>??? {positions_arr[i].nick} ???</div>
      portrait_array.push(portr)
      console.log(positions_arr[i].nick)
    }
    return portrait_array
  }

  return (
    <div className="Div-invisible">
      {getPortraits()}
    </div>
  )
}

export default Portraits
