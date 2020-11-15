import { useSelector, useDispatch } from 'react-redux'

import {
  playerJoinedLobby,
  playerLeftLobby,
  updateNick,
  startWaiting,
  userDoneWithAction,
  logAction,
  consumeLog,
  joinGame,
  closeLobby
} from './gameActions'

import { wsConsumeMessage } from '../reduxIndex'



export const processSocketMessage = jsonMsg => {
  console.log("Socket Processor got this message:  " + JSON.stringify(jsonMsg))
  const type = jsonMsg.TYPE
  const payload = jsonMsg.PAYLOAD
  return dispatch => {
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

      case "LEAVE_LOBBY":
        dispatch(closeLobby(payload))
        dispatch(wsConsumeMessage())
        break;
  
      case "START_GAME":
        dispatch(joinGame(payload))
        dispatch(wsConsumeMessage())
        break;
  
      case "NEW_MINISTER":
        dispatch(wsConsumeMessage())
        break;
      case "REQUEST_CANDIDATE":
        dispatch(wsConsumeMessage())
        break;
      case "REQUEST_VOTE":
        dispatch(wsConsumeMessage())
        break;
      case "ELECTION_RESULT":
        dispatch(wsConsumeMessage())
        break;
      case "MINISTER_DISCARD":
        dispatch(wsConsumeMessage())
        break;
      case "CAOS_PROCLAMATION":
        dispatch(wsConsumeMessage())
        break;
      case "DIRECTOR_DISCARD":
        dispatch(wsConsumeMessage())
        break;
      case "PROCLAMATION":
        dispatch(wsConsumeMessage())
        break;
      case "END_GAME":
        dispatch(wsConsumeMessage())
        break;
      case "MINISTER_DISCARD":
        dispatch(wsConsumeMessage())
        break;
      case "REQUEST_SPELL":
        dispatch(wsConsumeMessage())
        break;
      case "ADIVINATION_NOTICE":
        dispatch(wsConsumeMessage())
        break;
      case "AVADA_KEDAVRA":
        dispatch(wsConsumeMessage())
        break;
      case "CHAT":
        dispatch(logAction(payload))
        dispatch(wsConsumeMessage())
        break;
  
      default:
        break;
    }
  }
}

export default processSocketMessage


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