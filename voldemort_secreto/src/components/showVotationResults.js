import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deactivateShowResults } from '../redux/game/votationResults/votationResultsActions'


function ShowVotationResults() {
  const dispatch = useDispatch()
  const results = useSelector(state => state.votation_results.votes)
  const LumosVotes = useSelector(state => state.votation_results.countLumos)
  const NoxVotes = useSelector(state => state.votation_results.countNox)
  const [election, setElection] = useState('')
  

  function VotationResults () {
    let arrayResultsOfVotes = []
    let res = null
    let player_vote = ''
    for (let key in results) {
      if (results[key]) {
        player_vote = "Lumos"
      }
      else { 
        player_vote = "Nox" 
      }
      res = (
        <div>
          <l1>  Nick: {key}, Vote: {player_vote} </l1>
        </div>
      ) 
      arrayResultsOfVotes.push(res)
    }
    if (LumosVotes <= NoxVotes) {
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
