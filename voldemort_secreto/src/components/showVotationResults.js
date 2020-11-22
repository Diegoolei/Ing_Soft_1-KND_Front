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
  const votationActive = useSelector(state => state.votation_results.is_show_results_active)
  const votes = useSelector(state => state.player_array)
  const [results, setResults] = useState('')
  const [election, setElection] = useState('')


  function votationResults(vote_results) {
    //const results = {"sarasa": false, "hola": true, "chau": true, "pedro": true, "juana": true} 
    let vote = null
    let arrayResultsOfVotes = []
    let countLumos = 0
    let countNox = 0
    for (let key in vote_results) {
      let player_vote = vote_results[key]
      if (player_vote) { 
        player_vote = "Lumos" 
        countLumos += 1
      }
      else { 
        player_vote = "Nox" 
        countNox += 1
      }
      vote = (
        <div>
          <l1>  (nick: {key})  (vote: {player_vote}) </l1>
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
    setResults(arrayResultsOfVotes)
//    return arrayResultsOfVotes
  }


  return (
    <div >
      <h1 className="brown">VOTATION RESULTS</h1>
      {votationResults(votes)}
      {results}
      {election}
      <button className="Button-Close" onClick={() => dispatch(deactivateShowResults())}>X</button>
    </div>
  )
}

export default ShowVotationResults
