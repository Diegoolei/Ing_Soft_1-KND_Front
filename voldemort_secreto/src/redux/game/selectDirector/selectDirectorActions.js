// Implementations on construction
import store from '../store'
import axios from 'axios'
import {
    BASE_URL,
    BASE_WS_URL,
    API_ENDPOINT_GAME_INFO,
    API_ENDPOINT_WEBSOCKET,
    API_ENDPOINT_GAME,
    API_ENDPOIT_SELECT_DIRECTOR
} from '.../API_Types'

import { GAME_COMPONENT, MAIN_MENU_COMPONENT } from '../componentController/componentControllerTypes'

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

export const selectMyDirector = candidate_nick => {
    const state = store.getState()
    const token = state.session.authToken
    const uri = BASE_URL+API_ENDPOINT_GAME+String(game_id)+API_ENDPOIT_SELECT_DIRECTOR
    return dispatch => {
        axios.post(uri,
            {
                headers: { 'Authorization': token.token_type + " " + token.access_token }
            }
            ).then(response => {
                console.log("-Response :" + JSON.stringify(response.data))
                dispatch(cleanState())
            })
            .catch(error => {
                let errMsg
                try{
                    errorMsg= error.response.data.detail
                }
                catch(err){
                    errorMsg= "Something went wrong:: " + err
                }
                console.log("-Response :" + JSON.stringify(errorMsg))
            })
     }
}