import { useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles'

function Portraits() {
  const player_portraits = useSelector(state => state.player_portraits)
  const portrait_height = 10
  const portrait_width = 10

  const portraitPosition = (top, left, bottom, right) => {
    let style = {
      root: { // rgba(255, 255, 255, 0.3)
        "background-color": "rgb(64, 255, 0)",
        position: "absolute",
        height: `${portrait_height}%`,
        width: `${portrait_width}%`
      }
    }
    if (top    !== -1) style.root.top    = `${top}%`
    if (left   !== -1) style.root.left   = `${left}%`
    if (bottom !== -1) style.root.bottom = `${bottom}%`
    if (right  !== -1) style.root.right  = `${right}%`
    const sliderSty = makeStyles(style)
    return sliderSty()
  }

  const getPortraits = () => {
    const positions_arr = player_portraits.player_arr
    let portrait_array = []
    for (let i in positions_arr) {
      // console.log(i, positions_arr[i])
      const clas = portraitPosition(positions_arr[i].top, positions_arr[i].left,positions_arr[i].bottom, positions_arr[i].right)
      const portr = <div key={i} className={clas.root}>({positions_arr[i].nick})</div>
      portrait_array.push(portr)
      // console.log(positions_arr[i].nick)
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

