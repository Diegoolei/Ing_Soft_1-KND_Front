import { setCandidates } from './selectDirector/selectDirectorActions'
import { activateShowResults } from '../game/votationResults/votationResultsActions'
import { wsConsumeMessage } from '../reduxIndex'
import { saveDCardOptions } from '../game/discardCard/discardCardActions'

import {
  playerJoinedLobby,
  playerLeftLobby,
  updateNick,
  logAction,
  joinGame,
  closeLobby,
  voteInGame,
  proclaimPhoenix,
  proclaimDeathEater
} from './gameActions'

import { 
  makeCrucioAvailable, 
  enableDiscardCard
} from './activeApps/activeAppsActions'

export const processSocketMessage = jsonMsg => {
  console.log("Socket Processor got this message:  " + JSON.stringify(jsonMsg))
  const type = jsonMsg.TYPE
  const payload = jsonMsg.PAYLOAD
  return dispatch => {
    switch (type) {
      case "NEW_PLAYER_JOINED":
        dispatch(playerJoinedLobby(payload))
        dispatch(logAction("Player "+ payload + " joined the lobby."))
        break;
  
      case "CHANGED_NICK":
        const oldnick = "OLD_NICK"
        const newnick = "NEW_NICK"
        dispatch(updateNick(payload[oldnick], payload[newnick]))
        dispatch(logAction("Player " + payload[oldnick] + " is now " + payload[newnick]))
        break;
  
      case "PLAYER_LEFT":
        dispatch(playerLeftLobby(payload))
        dispatch(logAction("Player "+ payload + " left the lobby."))
        break;

      case "LEAVE_LOBBY":
        dispatch(closeLobby(payload))
        break;
  
      case "START_GAME":
        dispatch(joinGame(payload))
        dispatch(logAction("The Game has started"))
        break;
  
      case "NEW_MINISTER":
        dispatch(logAction(`${payload} is now Minister of Magic`))
        break;
      
      case "REQUEST_CANDIDATE":
        dispatch(setCandidates(payload))
        dispatch(makeSelectDirectorAvailable())
        break;

      case "REQUEST_VOTE":
        dispatch(voteInGame(payload))
        dispatch(logAction("Vote: " + JSON.stringify(payload)))
        break;
      case "ELECTION_RESULT":
        dispatch(activateShowResults(payload))
        break;
      case "MINISTER_DISCARD":
        dispatch(saveDCardOptions(payload))
        dispatch(enableDiscardCard())
        dispatch(logAction("You have to discard a card"))
        break;
      case "CAOS_PROCLAMATION":
        dispatch(updateDeckAmount())
        break;
      case "DIRECTOR_DISCARD":
        dispatch(saveDCardOptions(payload))
        dispatch(enableDiscardCard())
        dispatch(logAction("You have to discard a card"))
        break;
      case "PROCLAMATION":
        switch (payload) {
          case 0:
            dispatch(proclaimPhoenix())
            break;
          case 1:
            dispatch(proclaimDeathEater())
            break;
          default:
            console.log("Fatal error. Payload of PROCLAMATION in socket proccesor is wrong")     
            console.log(payload, typeof payload)
            break;
        }
        dispatch(updateDeckAmount())
        break;
      case "END_GAME":
        break;
      case "REQUEST_SPELL":
        switch (payload) {        
          default:
            console.log("Unknown spell has been requested")
            break;
        }

      case "REQUEST_CRUCIO":
        dispatch(setCrucioOptions(payload))
        dispatch(makeCrucioAvailable())
        break;

      case "ADIVINATION_NOTICE":
        break;
      case "AVADA_KEDAVRA":
        break;

      case "CHAT":
        dispatch(logAction(payload))
        break;
  
      default:
        break;
    }
    dispatch(wsConsumeMessage())
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