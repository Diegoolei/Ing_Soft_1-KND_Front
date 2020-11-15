import { useSelector, useDispatch } from 'react-redux'

import {
  playerJoinedLobby,
  playerLeftLobby,
  updateNick,
  startWaiting,
  userDoneWithAction,
  logAction,
  consumeLog
} from './gameActions'

import { wsConsumeMessage } from '../reduxIndex'


const socketProcessor = jsonMsg => {
  const dispatch = useDispatch()
  console.log("Socket Processor got this message:  " + JSON.stringify(jsonMsg))
  const type = jsonMsg.type
  const payload = jsonMsg.PAYLOAD

  switch (type) {
    case "NEW_PLAYER_JOINED":
      dispatch(playerJoinedLobby(payload))
      dispatch(logAction("Player "+ payload + " joined the lobby."))
      dispatch(wsConsumeMessage())
      break;

    case "CHANGED_NICK":
      const oldnick = "OLD_NICK"
      const newnick = "NEW_NICK"
      dispatch(updateNick(payload[oldnick], payload[newnick]))
      dispatch(logAction("Player " + payload[oldnick] + " is now " + payload[newnick]))
      dispatch(wsConsumeMessage())
      break;

    case "PLAYER_LEFT":
      dispatch(playerLeftLobby(payload))
      dispatch(logAction("Player "+ payload + " left the lobby."))
      dispatch(wsConsumeMessage())
      break;

    case "START_GAME":
      break;
    case "NEW_MINISTER":
      break;
    case "REQUEST_CANDIDATE":
      break;
    case "REQUEST_VOTE":
      break;
    case "ELECTION_RESULT":
      break;
    case "MINISTER_DISCARD":
      break;
    case "CAOS_PROCLAMATION":
      break;
    case "DIRECTOR_DISCARD":
      break;
    case "PROCLAMATION":
      break;
    case "ENDGAME":
      break;
    case "MINISTER_DISCARD":
      break;
    case "REQUEST_SPELL":
      break;
    case "ADIVINATION_NOTICE":
      break;
    case "AVADA_KEDAVRA":
      break;
    case "CHAT":
      dispatch(logAction(payload))
      dispatch(wsConsumeMessage())
      break;

    default:
      break;
  }
}

export default socketProcessor


/*
{ "TYPE": "NEW_PLAYER_JOINED", "PAYLOAD": nick }
{ "TYPE": "CHANGED_NICK", "PAYLOAD": payload }
{ "TYPE": "PLAYER_LEFT", "PAYLOAD": nick }
{ "TYPE": "START_GAME", "PAYLOAD": game_id }
{ "TYPE": "NEW_MINISTER", "PAYLOAD": minister_nick }
{ "TYPE": "REQUEST_CANDIDATE", "PAYLOAD": available_candiates }
{ "TYPE": "REQUEST_VOTE", "PAYLOAD": candidate_nick}
{ "TYPE": "ELECTION_RESULT", "PAYLOAD": votes }
{ "TYPE": "MINISTER_DISCARD", "PAYLOAD": cards }
{ "TYPE": "CAOS_PROCLAMATION", "PAYLOAD": proclamation }
{ "TYPE": "DIRECTOR_DISCARD", "PAYLOAD": cards }
{ "TYPE": "PROCLAMATION", "PAYLOAD": proclamation }
{ "TYPE": "ENDGAME", "PAYLOAD": result }
{ "TYPE": "REQUEST_SPELL", "PAYLOAD": "ADIVINATION" }
{ "TYPE": "REQUEST_SPELL", "PAYLOAD": "AVADA_KEDRAVA" }
{ "TYPE": "ADIVINATION_NOTICE", "PAYLOAD": minister_nick }
{ "TYPE": "AVADA_KEDAVRA", "PAYLOAD": victim_nick }
{ "TYPE": "CHAT", "PAYLOAD": message }
*/