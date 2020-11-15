import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { joinGame } from '../redux/reduxIndex'
import UpdateProfile from './updateProfile'

function Game () {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
 
  return (
    <div>
      <h1>GAME</h1>
      <button onClick={() => setActive(!active)}>Change Cond</button>
      <br/><br/><br/>{active ? <div>COMPONENTE DE ≧◉ᴥ◉≦ o ( ͡~ ͜ʖ ͡°)</div> : null}
      {active ? <UpdateProfile/> : null}
      <p>OTRA COSA AL MEDIO</p>
      {active ? <UpdateProfile/> : null}
    </div>
  )
}

export default Game
