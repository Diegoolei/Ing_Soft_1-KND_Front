// import {
//     CGL_IMPERIUS_HIGHLIGHT_OPTION,
//     CGL_IMPERIUS_RESET,
//     CGL_IMPERIUS_SET_OPTIONS,
//     CGL_IMPERIUS_REVEAL_ROLE
//   } from './imperiusTypes'
  
//   const initialState = {
//     options: [],
//     highlighted_option: -1,
//     role: null
//   }
  
//   const imperiusReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case CGL_IMPERIUS_SET_OPTIONS: return {
//         ...state,
//         options: action.payload
//       }
  
//       case CGL_IMPERIUS_HIGHLIGHT_OPTION: return {
//         ...state,
//         highlighted_option: action.payload
//       }
  
//       case CGL_IMPERIUS_REVEAL_ROLE: return {
//         ...state,
//         role: action.payload
//       }
  
//       case CGL_IMPERIUS_RESET: return initialState
  
//       default: return state
//     }
//   }
  
//   export default imperiusReducer
  