// Implementations on construction
import store from '../store'
import axios from 'axios'
import {
     BASE_URL,
     BASE_WS_URL,
     API_ENDPOINT_GAME_INFO,
     API_ENDPOINT_WEBSOCKET
} from '../API_Types'

// /*Select Director (POST) /games/{game_id}/select_director/
// We need to ask everyone to vote for the candidate the Minister selected:

// { "TYPE": "REQUEST_VOTE", "PAYLOAD": candidate_nick}
// candidate_nick : string

// Send to: All players in game */
//   export const selectDirector = info =>{
//       return{
//           type: CGL_SELECT_DIRECTOR,
//           payload
//       }
//   }