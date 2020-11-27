import { CGL_PORTRAIT_ADD_PLAYER, CGL_PORTRAIT_SET_AMOUNT } from './playerPortraitTypes'

const initialState = {
  player_arr: [],
  player_amount: 0
}

const playerPortraitReducer = (state = initialState, action) => {
  switch (action.type) {
    case CGL_PORTRAIT_SET_AMOUNT: return {
      ...state,
      player_amount: action.payload
    }

    case CGL_PORTRAIT_ADD_PLAYER:
      let new_arr = state.player_arr
      new_arr.push(action.payload)
      return {
        ...state,
        player_arr: new_arr
      }

    default: return state
  }
}

export default playerPortraitReducer
