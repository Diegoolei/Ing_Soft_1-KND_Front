import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { wsConsumeMessage, changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'


function ShowVotationResults() {
  const dispatch = useDispatch()
  const recvMsg = useSelector(state => state.socket.messages)
  const token = useSelector(state => state.session.authToken)
  const [active, setActive] = useState(false)
  const votes = useSelector(state => state.player_array)
  const [results, setResults] = useState('')
  const [election, setElection] = useState('')

  if (recvMsg.length !== 0) {
    const jsonmsg = recvMsg[0]
    const votes = jsonmsg.PAYLOAD

    if (jsonmsg.TYPE === "ELECTION_RESULT") {
      votationResults(votes)
    }

    console.log("Message from the server: ", votes)
    dispatch(wsConsumeMessage())
  }

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
      setElection("\r\nRejected government")
    }
    else {
      setElection("\r\nAccepted government")
    }
    setResults(arrayResultsOfVotes)
    return arrayResultsOfVotes
  }

  function BackToMenu() {
    dispatch(changeScreen(MAIN_MENU_COMPONENT))
  }

  return (
    <div >
      <h1 className="brown">VOTATION RESULTS</h1>
      {/*<button onClick={() => setActive(!active)}>Show Results</button>*/}
        <button className="button-votation-red" onClick={() => setActive(!active) }>Show Results</button>
        <br/>{active ? 
          <div>
            {votationResults(votes)}
            {results}
            {election}
          </div> : null}
        <br/><br/><button className="button" onClick={BackToMenu}>Back to Main Menu</button>
    </div>
  )
}

export default ShowVotationResults
