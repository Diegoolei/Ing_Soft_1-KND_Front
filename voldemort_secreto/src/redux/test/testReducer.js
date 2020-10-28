import { RUN_TEST, RESET_TEST } from './testTypes'

const initialState = {
  state_var1: true,
  state_var2: false,
  state_var3: 10
}

// Shape of a reducer : (previousState, action) => newState
// testReducer usually is called just reducer, but it can be named anything
const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUN_TEST: return {
      ...state,
      state_var1 : !state.state_var2 || (state.state_var3%3 === 0),
      state_var2 : !state.state_var2,
      state_var3 : state.state_var3 - 1
    }

    case RESET_TEST : return initialState
    default: return state
  }
}

export default testReducer
