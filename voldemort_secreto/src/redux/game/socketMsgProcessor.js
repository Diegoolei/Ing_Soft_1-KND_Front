import store from '../store'
import { setCandidates } from './selectDirector/selectDirectorActions'
import { wsConsumeMessage } from '../reduxIndex'
import { saveDCardOptions } from '../game/discardCard/discardCardActions'
import { setCrucioOptions } from '../game/crucio/crucioActions'
import { setVictimCandidatesToAvadaKedavra } from '../game/avadaKedavra/avadaKedavraActions'

import {
  playerJoinedLobby,
  playerLeftLobby,
  updateNick,
  logAction,
  joinGame,
  closeLobby,
  proclaimPhoenix,
  proclaimDeathEater,
  updateDeckAmount,
  setCurrentCandidate,
  setDirector,
  setMinister,
  setElectionCounter,
  spellProphecy,
  setPlayerRole,
  setPlayerDead
} from './gameActions'

import { 
  enableVote,
  makeCrucioAvailable, 
  enableDiscardCard,
  makeSelectDirectorAvailable,
  makeExpelliarmusAvailable,
  makeAvadaKedavraAvailable
} from './activeApps/activeAppsActions'

export const processSocketMessage = jsonMsg => {
  console.log("Socket Processor got this message:  " + JSON.stringify(jsonMsg))
  const state = store.getState()
  const game = state.game
  const type = jsonMsg.TYPE
  const payload = jsonMsg.PAYLOAD
  return dispatch => {
    const is_current_player_minister = state.game.player_nick === payload
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
        const new_minister_number = game.player_array[payload].player_number
        dispatch(logAction(`${payload} is now Minister of Magic`))
        dispatch(setMinister(new_minister_number))
        dispatch(setDirector(-1))
        break;
      
      case "REQUEST_CANDIDATE":
        dispatch(setCandidates(payload))
        dispatch(makeSelectDirectorAvailable())
        break;

      case "REQUEST_VOTE":
        dispatch(enableVote(payload))
        const candidate_player_number = game.player_array[payload].player_number
        dispatch(setCurrentCandidate(candidate_player_number))
        dispatch(logAction(`Minister nominated ${payload} for director. It's time to vote.`))
        break;

      case "ELECTION_RESULT":
        let votecounter = 0
        for (let nick in payload) {
          const vote = payload[nick]
          const votestring = vote ? "Lumos" : "Nox"
          votecounter += (vote ? 1 : -1)
          dispatch(logAction(`${nick} voted ${votestring}`))
        }
        if(votecounter > 0) {
          dispatch(setDirector(game.current_candidate))
          dispatch(setCurrentCandidate(-1))
          dispatch(logAction("Election passed"))
          dispatch(setElectionCounter(0))
        } else {
          const election_counter = game.election_counter
          dispatch(setElectionCounter(election_counter + 1))
          dispatch(setCurrentCandidate(-1))
        }
        break;

      case "MINISTER_DISCARD":
        dispatch(saveDCardOptions(payload))
        dispatch(enableDiscardCard())
        dispatch(logAction("You have to discard a card"))
        break;

      case "CHAOS":
        dispatch(setElectionCounter(0))
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
        const roles = payload.ROLES
        const winner_string = payload.WINNER === 0 ? "Order of the Phoenix" : "Death Eaters"
        // if (payload.WINNER === 0) {
        //   dispatch(proclaimPhoenix())
        // } else {
        //   dispatch(proclaimDeathEater())
        // }
        dispatch(logAction(`Winner: ${winner_string}`))
        for (let nick in roles) {
          const endgame_role = roles[nick]
          let endgame_stringrole
          if (endgame_role === 0) endgame_stringrole = "Order of the Phoenix"
          if (endgame_role === 1) endgame_stringrole = "Death Eater"
          if (endgame_role === 2) endgame_stringrole = "Voldemort"
          dispatch(setPlayerRole(nick,roles[nick]))
          dispatch(logAction(`${nick} : ${endgame_stringrole}`))
        }
        break;
      case "REQUEST_SPELL":
        switch (payload) { 
          case "ADIVINATION":
            dispatch(spellProphecy())
            break;
          
          case "AVADA_KEDAVRA":
            let possible_victims = []
            for (let nick in game.player_array) {
              const ak_alive = game.player_array[nick].is_alive
              const ak_is_current_player = nick === game.player_nick
              if (ak_alive && !ak_is_current_player) {
                possible_victims.push(nick)
              }
            }
            dispatch(setVictimCandidatesToAvadaKedavra(possible_victims))
            dispatch(makeAvadaKedavraAvailable())
            break;
          
          default:
            console.log("Unknown spell has been requested")
            break;
        }
        break;

      case "REQUEST_CRUCIO":
        dispatch(setCrucioOptions(payload))
        dispatch(makeCrucioAvailable())
        break;

      case "ADIVINATION_NOTICE":
        dispatch(logAction(`Minister ${payload} reads the fate of the cards...`))
        break;
      case "AVADA_KEDAVRA":
        dispatch(logAction(`Minister killed ${payload} in a duel.`))
        dispatch(setPlayerDead(payload))
        break;

      case "CHAT":
        dispatch(logAction(payload))
        break;

      case "EXPELIARMUS_NOTICE":
        dispatch(logAction("Director launched Expelliarmus!"))
        
        if (is_current_player_minister) dispatch(makeExpelliarmusAvailable())
        break;

      case "EXPELIARMUS_REJECT_NOTICE":
        //{ "TYPE": "EXPELIARMUS_REJECT_NOTICE", "PAYLOAD": director_nick }
        dispatch(logAction("Director launched Expelliarmus!"))
        if (is_current_player_minister) dispatch(makeExpelliarmusAvailable())
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