
import {
  APPS_ACTIVATE_VOTATION_RESULTS,
  APPS_DEACTIVATE_VOTATION_RESULTS
} from './votationResultsTypes'

export const activateShowResults = () => {
  return {
    type: APPS_ACTIVATE_VOTATION_RESULTS,
  }
}

export const deactivateShowResults = () => {
  return {
    type: APPS_DEACTIVATE_VOTATION_RESULTS,
  }
}

