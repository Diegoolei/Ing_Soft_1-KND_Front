import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { wsDisconnect, wsSendMessage, wsConsumeMessage, changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import axios from 'axios'
import processSocketMessage from '../redux/game/socketMsgProcessor'
import { deactivateShowResults } from '../redux/game/votationResults/votationResultsActions'


function ShowVotationResults() {
  const dispatch = useDispatch()
  const recvMsg = useSelector(state => state.socket.messages)
  const token = useSelector(state => state.session.authToken)
  const votationActive = useSelector(state => state.games.votation_results.is_show_results_active)
  const results = useSelector(state => state.games.votation_results.votes)
  const [election, setElection] = useState('')


  function VotationResults () {
    //const results = {"sarasa": false, "hola": true, "chau": true, "pedro": true, "juana": true} 
    let arrayResultsOfVotes = []
    let countLumos = 0
    let countNox = 0
    console.log("qondaaaaaaa")
    console.log(results)
    for (let key in results) {
      let player_vote = null
      let vote = null
      let nick = ''
      player_vote = results[key]
      nick = results[key]
      console.log("soy el nick:")
      console.log(nick)
      if (player_vote) {
        console.log("holaaaa")
        console.log(player_vote)
        console.log(nick)
        player_vote = "Lumos"
        countLumos += 1
      }
      else { 
        player_vote = "Nox" 
        countNox += 1
      }
      vote = (
        <div>
          <l1>  (nick: {nick})  (vote: {player_vote}) </l1>
        </div>
      ) 
      arrayResultsOfVotes.push(vote)
    }
    if (countLumos <= countNox) {
      setElection("Rejected government")
    }
    else {
      setElection("Accepted government")
    }
    console.log(arrayResultsOfVotes)
    return arrayResultsOfVotes
  }


  return (
    <div className="Popup">
      <h1 className="brown">VOTATION RESULTS</h1>
      <VotationResults/>
      {election}
      <button className="Button-Close" onClick={() => dispatch(deactivateShowResults())}>X</button>
    </div>
  )
}

export default ShowVotationResults
