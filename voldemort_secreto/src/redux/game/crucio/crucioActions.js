import store from '../../store'
import {
  CGL_CRUCIO_HIGHLIGHT_OPTION,
  CGL_CRUCIO_RESET,
  CGL_CRUCIO_SET_OPTIONS,
} from './crucioTypes'
import {
  BASE_URL,
  API_ENDPOINT_CRUCIO
} from '../../API_Types'

import { deactivateCrucio } from '../activeApps/activeAppsActions'
import axios from 'axios'

export const highlightCrucioOption = option_index => {
  return {
    type: CGL_CRUCIO_HIGHLIGHT_OPTION,
    payload: option_index
  }
}

export const resetCrucio = () => {
  return {
    type: CGL_CRUCIO_RESET
  }
}

export const setCrucioOptions = nick_array => {
  return {
    type: CGL_CRUCIO_SET_OPTIONS,
    payload: nick_array
  }
}

export const confirmCrucioSelection = () => {
  const state = store.getState()
  const token = state.session.authToken
  const uri = BASE_URL+API_ENDPOINT_CRUCIO
  return dispatch => {
    const body = {/* ???????????????????????? */}
    axios.post(uri, body,
      {
        headers: { 'Authorization': token.token_type + " " + token.access_token }
      }
    ).then(response => {
      /* ??????????????????????????????? */
      dispatch(resetCrucio())
      dispatch(deactivateCrucio())
    }).catch(error => {
      let errorMsg
      try {
        console.log(error)
        errorMsg = error.response.data.detail
      } catch (er) {
        errorMsg = "Something went wrong:: " + er
      }
      console.log("-Response :" + JSON.stringify(errorMsg))
    })
  }
}
