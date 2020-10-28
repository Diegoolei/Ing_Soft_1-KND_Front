import { API_REQUEST, API_SUCCESS, API_FAILURE } from './testAPITypes'

const initialState = {
  loading: false,
  returnBody: null,
  error: null
}

const testAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST: return {
      ...state,
      loading: true,
      returnBody: null,
      error: null,
    }

    case API_SUCCESS: return {
      ...state,
      loading: false,
      returnBody: action.payload,
      error: null,
    }

    case API_FAILURE: return {
      ...state,
      loading: false,
      returnBody: null,
      error: action.payload
    }
      
    default: return state
  }
}


export default testAPIReducer