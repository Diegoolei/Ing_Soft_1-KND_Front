
//export const BASE_URL = 'http://190.xxx.xx.xx:8000'
//export const BASE_WS_URL = 'ws://190.xxx.xx.xx:8000'
export const BASE_URL = 'http://127.0.0.1:8000'
export const BASE_WS_URL = 'ws://127.0.0.1:8000'

//ENDPOINTS
export const API_ENDPOINT_REGISTER            = '/users/'
export const API_ENDPOINT_LOGIN               = '/login'
export const API_ENDPOINT_PROFILE_INFO        = '/users/'

export const API_ENDPOINT_LIST_LOBBIES        = '/lobby/list_lobbies/'
export const API_ENDPOINT_LIST_GAMES          = '/games/list_games/'
export const API_ENDPOINT_JOIN_LOBBY          = '/lobby/'
export const API_ENDPOINT_START_GAME          = '/lobby/'
export const API_ENDPOINT_LEAVE_LOBBY         = '/lobby/'
export const API_ENDPOINT_GAME_INFO           = '/games/'
export const API_ENDPOINT_WEBSOCKET           = '/websocket/'
export const API_ENDPOINT_LOBBY               = '/lobby/'
export const API_ENDPOINT_GAME                = '/games/'
export const API_ENDPOINT_SELECT_DIRECTOR     = '/select_director/'
export const API_ENDPOINT_VOTE                = '/select_director/vote'
export const API_ENDPOINT_SPELL               = '/spell'
export const API_ENDPOINT_AVADA_KEDAVRA       = '/avada_kedavra'
export const API_ENDPOINT_CRUCIO              = '/spell/crucio'
export const API_ENDPOINT_DISCARD_CARD        = '/discard_card/'
export const API_ENDPOINT_LOG                 = '/users/log'

//FORMS
  // REGISTER BODY:
export const API_IN_REGISTER_EMAIL            = 'userIn_email'
export const API_IN_REGISTER_USERNAME         = 'userIn_username'
export const API_IN_REGISTER_PASSWORD         = 'userIn_password'
//export const API_IN_REGISTER_PHOTO          = 'userIn_photo'

  //LOGIN BODY:
export const API_IN_LOGIN_EMAIL               = 'username'
export const API_IN_LOGIN_PASSWORD            = 'password'

//GAME BODY:
export const API_SELECT_DIRECTOR_NICK         = 'candidate_nick'
