import { useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles'
import icons from '../metaMedia/icons/iconindex'
import pin_director from '../metaMedia/pin_director.png'
import pin_minister from '../metaMedia/pin_ministry.png'
import { useState, useRef } from "react"

function Portraits() {
  const player_portraits = useSelector(state => state.player_portraits)
  const player_arr = useSelector(state => state.game.player_array)
  const current_minister = useSelector(state => state.game.current_minister)
  const current_director = useSelector(state => state.game.current_director)
  const portrait_height = 40
  const portrait_width = 20
  const [rendering_info, setRendering_info] = useState([-1,0,0])
  const mouse_pos_container = useRef(null)
  const timing_cont = useRef(-1)
  const currentPlayerNick = useSelector(state => state.game.player_nick)

  const renderInfo = nick => setRendering_info([nick, mouse_pos_container.current.x, mouse_pos_container.current.y])

  function mouseEnter(nick) {
    const timoutId = setTimeout(() => renderInfo(nick), 500)
    timing_cont.current = timoutId
  }

  function mouseLeave() {
    clearTimeout(timing_cont.current)
    setRendering_info([-1,0,0])
  }
  const portrait_sub1 = () => {
    let style = {
      svg: {
        "background-color": "white",
        "float": "center",
        "left": "0%",
        "top": "0%",
        "max-height": "80%",
        "max-width": "100%",
      }
    }
    const stl = makeStyles(style)
    return stl()
  }

  const portrait_sub2 = () => {
    let style = {
      root: {
        position: "absolute",
        bottom: "75%",
        left: "75%",
        width: "50px",
      }
    }
    const stl = makeStyles(style)
    return stl()
  }

  const infoPopupStyle = (x, y) => {
    let style = {
      root: {
        "list-style-type": "none",
        "box-sizing": "border-box",
        "border-radius": "10%",
        "color": "rgb(90, 95, 90)",
        "background-color": "rgb(20, 5, 10)",
        position: "fixed",
        padding: "1%"
      }
    }
    if (y <= window.innerHeight/2) {
      style.root.top = `${y}px`
    } else {
      style.root.bottom = `${window.innerHeight-y}px`
    }
    if (x <= window.innerWidth/2) {
      style.root.left = `${x}px`
    } else {
      style.root.right = `${window.innerWidth-x}px`
    }
    const stl = makeStyles(style)
    return stl()
  }


  const PortraitInfo = ({pkey}) => {
    const nick = player_portraits.player_arr[pkey].nick
    const player_number = player_arr[nick].player_number
    const iconclass = portrait_sub1()
    const pinclass = portrait_sub2()
    const icon_n = player_arr[nick].icon
    const is_minister = (player_number === current_minister)
    const is_director = (player_number === current_director) || (player_arr[nick].is_candidate)
    return (
      <div className="Div-invisible">
        <img className={iconclass.svg} src={icons[icon_n]} alt={`icon ${icon_n}`}/>
        <div className="Portrait-nameinfo">{nick}</div>
        {is_minister ? <img className={pinclass.root} src={pin_minister} alt="minister pin"/> : null}
        {is_director ? <img className={pinclass.root} src={pin_director} alt="director pin"/>: null}
      </div>
    )
  }

  const portraitPositionStyle = (top, left, bottom, right, is_alive=true) => {
    let style = {
      root: {
        "background-color": is_alive ? "rgb(47, 10, 10)" : "rgb(10, 10, 10)",
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

  const RenderPortraits = () => {
    const positions_arr = player_portraits.player_arr
    let portrait_array = []
    for (let i in positions_arr) {
      const nick = positions_arr[i].nick
      const clas = portraitPositionStyle(
        positions_arr[i].top, 
        positions_arr[i].left,
        positions_arr[i].bottom,
        positions_arr[i].right,
        player_arr[nick].is_alive
      )
      const portr = (
      <div 
      key={`portrait_${nick}`}
      className={clas.root}
      onMouseEnter={()=> mouseEnter(nick)}
      onMouseLeave={mouseLeave}
      onMouseMove={p => mouse_pos_container.current = {x:p.pageX, y:p.pageY}}>
        <PortraitInfo pkey={i}/>
      </div>)
      portrait_array.push(portr)
    }
    return portrait_array
  }

  const RenderInfo = () => {
    const getListEl = (key, msg) => <li key={key}>{msg}</li>
    const nick = rendering_info[0]
    const classinfoPopup = infoPopupStyle(rendering_info[1], rendering_info[2])
    const role = player_arr[nick].role
    const vote = player_arr[nick].vote
    const isCurPlayer = rendering_info[0] === currentPlayerNick
    // const is_alive = player_arr[nick].is_alive
    let info = []
    if (role !== -1) {
      let rolestring
      switch (role) {
        case 0:
          rolestring = isCurPlayer ? "You are from the Order of the Phoenix" : "This player is Order of the Phoenix"
          break;
        case 1:
          rolestring = isCurPlayer ? "You are a Death Eater" : "This player is a Death Eater"
          break;
        
        case 2:
          rolestring = isCurPlayer ? "You are Voldemort" : "This player is Voldemort"
          break;
        default:
          break;
      }
      info.push(getListEl("role", rolestring ))
    }
    if (vote !== null) {
      const votestring = vote ? "Voted Lumos" : "Voted Nox"
      info.push(getListEl("vote", votestring ))
    }
    const ret = (info.length > 0) ? <ul className={classinfoPopup.root}>{info}</ul> : null
    return ret
  }

  return (
    <div className="Div-invisible">
      <RenderPortraits/>
      {rendering_info[0] !== -1 ? <RenderInfo/> : null}
    </div>)
}

export default Portraits

