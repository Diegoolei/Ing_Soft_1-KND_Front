import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeScreen } from '../redux/reduxIndex'
import { MAIN_MENU_COMPONENT } from '../redux/componentController/componentControllerTypes'
import axios from 'axios'

function ShowVotationResults() {
  const dispatch = useDispatch()
  //const votes = useSelector(state => state.player_array)
  const [print, setPrint] = useState('')
  function votationResults() {
    const votes = {"sarasa": false, "hola": true, "chau": true, "pedro": true, "juana": true} 
    let vote = null
    let arrayResultsOfVotes = []
    for (let key in votes) {
      let player_vote = votes.[key]
      if (player_vote) { player_vote = "Lumos" }
      else { player_vote = "Nox" }
      vote = (
        <div>
          <l1>  (nick: {key})  (vote: {player_vote}) </l1>
        </div>
      )
      arrayResultsOfVotes.push(vote)
    }
    setPrint(arrayResultsOfVotes)
    return arrayResultsOfVotes
  }
  return (
    <div class="fond">
      <h1 class="sect-title font-weight-bold">VOTATION RESULTS</h1>
        <br/><button className="button-votation">Most of Lumos</button>
        <br/><button className="button-votation">Most or equality Nox</button>
        <br/><button className="button-votation" onClick={votationResults}>Show Results</button>
        {print}
    </div>
  )
}

export default ShowVotationResults
