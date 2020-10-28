import axios from 'axios'
import { BASE_URL } from '../globalTypes'
import { API_REQUEST, API_SUCCESS, API_FAILURE } from './testAPITypes'


export const apiRequest = () => {
  return {
    type: API_REQUEST,
  }
}

export const apiSuccess = response => {
  return {
    type: API_SUCCESS,
    payload: response
  }
}

export const apiFailure = error => {
  return {
    type: API_FAILURE,
    payload: error
  }
}

export const get = (endpoint, params) => {
  return (dispatch) => {
    dispatch(apiRequest)
    axios({
      method: 'get',
      url: endpoint,
      baseURL: BASE_URL,
      timeout: 5000, // milliseconds: 1000 milliseconds = 1 s
      params: params
    })
      .then(response => {
        const reqResponse = response
        dispatch(apiSuccess(reqResponse))
      })
      .catch(error => {
        const reqError = error
        dispatch(apiFailure(reqError))
      })
  }
}

export const post = (endpoint, params, body) => {
  return (dispatch) => {
    dispatch(apiRequest)
    axios({
      method: 'post',
      url: endpoint,
      baseURL: BASE_URL,
      timeout: 5000, // milliseconds: 1000 milliseconds = 1 s
      params: params,
      data: body
    })
      .then(response => {
        const reqResponse = response
        dispatch(apiSuccess(reqResponse))
      })
      .catch(error => {
        const reqError = error
        dispatch(apiFailure(reqError))
      })
  }
}

export const put = (endpoint, params, body) => {
  return (dispatch) => {
    dispatch(apiRequest)
    axios({
      method: 'put',
      url: endpoint,
      baseURL: BASE_URL,
      timeout: 5000, // milliseconds: 1000 milliseconds = 1 s
      params: params,
      data: body
    })
      .then(response => {
        const reqResponse = response
        dispatch(apiSuccess(reqResponse))
      })
      .catch(error => {
        const reqError = error
        dispatch(apiFailure(reqError))
      })
  }
}
