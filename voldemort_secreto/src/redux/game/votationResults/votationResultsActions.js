
import {
  GAME_ACTIVATE_VOTATION_RESULTS,
  GAME_DEACTIVATE_VOTATION_RESULTS
} from './votationResultsTypes'

export const activateShowResults = (payload) => {
  return {
    type: GAME_ACTIVATE_VOTATION_RESULTS,
    payload: payload
  }
}

export const deactivateShowResults = () => {
  return {
    type: GAME_DEACTIVATE_VOTATION_RESULTS
  }
}

