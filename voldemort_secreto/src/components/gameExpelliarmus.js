import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { deactivateExpelliarmus, makeExpelliarmusUnavailable } from '../redux/reduxIndex'

function Expelliarmus () {
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)
  const token = useSelector(state => state.session.authToken)

  const sendExpelliarmusEndpoint = decision => {
    const uri = `/games/${game.game_id}/spell/expeliarmus`
    const body = { ministerDecition : decision}
    axios.put(uri, body,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      console.log("-Response :" + JSON.stringify(response.data))
      dispatch(deactivateExpelliarmus())
      dispatch(makeExpelliarmusUnavailable())
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="Div-invisible">
      <button className="Button" onClick={() => sendExpelliarmusEndpoint(true)} >Accept Expelliarmus</button>
      <br/><button className="Button" onClick={() => sendExpelliarmusEndpoint(false)}>Reject Expelliarmus</button>
    </div>
  )
}

export default Expelliarmus
