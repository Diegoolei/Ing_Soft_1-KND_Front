
import {
  APPS_ACTIVATE_VOTATION_RESULTS,
  APPS_DESACTIVE_VOTATION_RESULTS
} from './votationResultsReducer'

export const activateShowResults = () => {
  return {
    type: APPS_ACTIVATE_VOTATION_RESULTS,
  }
}

export const deactivateShowResults = () => {
  return {
    type: APPS_DESACTIVE_VOTATION_RESULTS,
  }
}

