import { useSelector } from "react-redux"

function ElectionCounter() {
  const election_counter = useSelector(state => state.game.election_counter)
  return (
    <div className="Div-invisible">
      Elections: {election_counter}/3
    </div>
  )
}

export default ElectionCounter
