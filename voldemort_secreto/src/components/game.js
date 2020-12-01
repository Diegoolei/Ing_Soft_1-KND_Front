import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteInGame } from '../redux/reduxIndex'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import processSocketMessage from '../redux/game/socketMsgProcessor'
import Header from './gameHeader'
import Chat from './chat'
//import ShowVotationResults from './showVotationResults'
import ActionButton from './gameActionButton'
import Deck from './gameDeck'
import ElectionCounter from './gameElectionCounter'
import Proclamations from './gameProclamations'
import Portraits from './gamePortraits'
import Crucio from './gameCrucio'
import DiscardCard from './gameDiscardCard'
import SelectDirector from './selectDirector'

function Game() {
  const dispatch = useDispatch()
  const gameState = useSelector(state => state.game)
  const activeApps = useSelector(state => state.active_apps)
  const unprocessed_socket_messages = useSelector(state => state.socket.messages)
  //const votationActive = useSelector(state => state.votation_results.is_show_results_active)
  const [showingSecretInfo, setShowingSecretInfo] = useState(false)

  const info = () => {
    return (
      <div className="Div-invisible">
        <br /><button onClick={() => setShowingSecretInfo(!showingSecretInfo)}>Show Secret Role</button>
        {showingSecretInfo ? secretInfo() : null}
        <button className="button" onClick={() => vote()}>Vote</button>
        <br/><br/>Current Minister: {currentMinisterString()}
        <br/>{currentDirectorString()}
        <br/>Order Proclamations: {gameState.proclaimed_phoenix}
        <br/>Death Eater Proclamations: {gameState.proclaimed_death_eater}
        <br/>Cards in Deck: {gameState.cards_in_deck}
        <br/>Election Counter: {gameState.election_counter}
      </div>
    )
  }

  useEffect(() => {
    if (unprocessed_socket_messages.length !== 0) {
      dispatch(processSocketMessage(unprocessed_socket_messages[0]))
    }
  })

  function vote() {
    confirmAlert({
      title: 'It is time to Vote!',
      message: 'Vote Lumos to accept government or Nox to reject it',
      buttons: [{
        label: 'Lumos',
        onClick: () => dispatch(voteInGame(true, gameState.game_id))
      },
      {
        label: 'Nox',
        onClick: () => dispatch(voteInGame(false, gameState.game_id))
      }
      ]
    })
  }

  function getStringRole(role) {
    switch (role) {
      case 0: return 'Order of the Phoenix'
      case 1: return 'Death Eater'
      case 2: return 'Voldemort'
      default: return 'unknown'
    }

  }

  function getNickByNumber(number) {
    for (let key in gameState.player_array) {
      if (gameState.player_array[key].player_number === number) {
        return key
      }
    }
    return undefined
  }

  function secretInfo() {
    const user_role = gameState.player_array[gameState.player_nick].role
    let otherRoles = []
    let auxRole = undefined
    for (let key in gameState.player_array) {
      auxRole = gameState.player_array[key].role
      if (auxRole !== -1 && auxRole !== 0 && key !== gameState.player_nick) {
        otherRoles.push(<p>{key} is {getStringRole(auxRole)}</p>)
      }
    }
    return (
      <p>
        Your Role: {getStringRole(user_role)}
        {otherRoles}
      </p>
    )
  }

  const currentMinisterString = () => String(getNickByNumber(gameState.current_minister))
  const currentDirectorString = () => {
    if (gameState.current_director === -1) {
      return ''
    } else {
      return String(getNickByNumber(gameState.current_minister))
    }
  }

  const MainGame = () => {
    return (
      <div className="Div-invisible">
        <div className="Board-container">
          <div className="Proclamations-container"><Proclamations/></div>
          <div className="Deck-container"><Deck/></div>
          <div className="ActionButton-container"><ActionButton/></div>
          <div className="ElectionCounter-container"><ElectionCounter/></div>
          <Portraits/>
        </div>        
        {/* <button className="button-votation-red" onClick={() => vote()}>Vote</button> */}
      </div>
    )
  }

  return (
    <div>
      <div className="Game-header"><Header/></div>
      <div className="Game-container"><MainGame/></div>
      <div className="Chat-container"><Chat/></div>
      { activeApps.is_crucio_active ? <Crucio/> : null }
      { activeApps.is_discard_card_active ? <DiscardCard/> : null }
      { activeApps.is_select_director_active ? <SelectDirector/> : null}
    </div>
  )
}

export default Game
