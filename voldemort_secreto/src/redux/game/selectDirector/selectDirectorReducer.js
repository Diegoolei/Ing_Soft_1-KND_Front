// import {
//   CGL_SD_SET_CANDIDATES,
//   CGL_SD_ACTIVATE_SELECT_CANDIDATE,
//   CGL_SD_DEACTIVATE_SELECT_CANDIDATE,
//   CGL_SD_RESET
// } from './selectDirectorTypes'

// const initialState = {
//   candidates: [],
//   is_component_active: false
// }

// const selectDirectorReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CGL_SD_SET_CANDIDATES:
//       return{
//         ...state,
//         candidates: action.payload
//       }

//     case CGL_SD_ACTIVATE_SELECT_CANDIDATE:
//       return{
//         ...state,
//         is_component_active: true
//       }

//     case CGL_SD_DEACTIVATE_SELECT_CANDIDATE: 
//       return {
//         ...state,
//         is_component_active: false
//       }

//     case CGL_SD_RESET: return initialState

//     default: return state
//   }
// }

// export default selectDirectorReducer