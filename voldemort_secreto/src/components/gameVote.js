import { useSelector, useDispatch } from 'react-redux'
import {
  deactivateVote,
  disableVote
} from '../redux/reduxIndex'
import { voteInGame } from '../redux/game/gameActions'
// import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'


function Vote() {
  const dispatch = useDispatch()
  const gameState = useSelector(state => state.game)

  function closeVote(vote) {
    dispatch(voteInGame(vote, gameState.game_id))
    dispatch(deactivateVote())
    dispatch(disableVote())
  }

  // function electionVote() {
  //   confirmAlert({
  //     title: 'It is time to Vote!',
  //     message: 'Vote Lumos to accept government or Nox to reject it',
  //     buttons: [{
  //       label: 'Lumos',
  //       onClick: () => closeVote(true)
  //     },
  //     {
  //       label: 'Nox',
  //       onClick: () => closeVote(false)
  //     }
  //     ]
  //   })
  // }

  // return electionVote()

  return (
    <div className="Popup-background">
      <div className="Popup">
        <div className="title-first-screen-alt">It is time to Vote!</div>
        <h5 className="white">Vote Lumos to accept government or Nox to reject it</h5>
        <button className="button" onClick={() => closeVote(true)}>Lumos</button>
        <button className="button" onClick={() => closeVote(false)}>Nox</button>
      </div>
    </div>
  )
}

export default Vote