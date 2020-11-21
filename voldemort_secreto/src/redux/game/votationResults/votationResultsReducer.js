
import {
  APPS_ACTIVATE_VOTATION_RESULTS,
  APPS_DEACTIVATE_VOTATION_RESULTS
} from './votationResultsTypes.js'

  const initialState = {
    is_show_results_active: false
  }
 
  const activeAppsReducer = (state = initialState, action) => {
    switch (action.type) {
      case APPS_ACTIVATE_VOTATION_RESULTS: return {
        ...state,
        is_show_results_active: true
      }

      case APPS_DEACTIVATE_VOTATION_RESULTS: return {
        ...state,
        is_show_results_active: false
      }

      default: return state
    }
  }

  export default activeAppsReducer
