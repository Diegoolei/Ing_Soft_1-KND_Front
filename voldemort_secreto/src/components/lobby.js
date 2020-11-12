import React from 'react'

function Lobby () {

  function leaveLobby() {
    console.log("I cannot leave...")
  }
  
  return (
    <div>
      <h1>MAIN LOBBY</h1>
      <button onClick={leaveLobby}>Leave Lobby</button>
    </div>
  )
}

export default Lobby