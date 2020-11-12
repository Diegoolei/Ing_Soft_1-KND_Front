
//export const BASE_URL = 'https://jsonplaceholder.typicode.com/'
export const BASE_URL = 'http://127.0.0.1:8000'

// Here we save the names of the endpoints and parameters passed for ease of change if the API changes

//ENDPOINTS
export const API_ENDPOINT_REGISTER = '/users/'
export const API_ENDPOINT_LOGIN = '/login'
export const API_ENDPOINT_PROFILE_INFO = '/users/'

//export const API_ENDPOINT_LOBBY = '/lobby/'
//export const API_ENDPOINT_GAME = '/games/'
export const API_ENDPOINT_LIST_LOBBIES = '/lobby/list_lobbies/'
export const API_ENDPOINT_LIST_GAMES = '/lobby/list_games/'


//FORMS
  // REGISTER BODY:
export const API_IN_REGISTER_EMAIL = 'userIn_email'
export const API_IN_REGISTER_USERNAME = 'userIn_username'
export const API_IN_REGISTER_PASSWORD = 'userIn_password'
//export const API_IN_REGISTER_PHOTO = 'userIn_photo'


  //LOGIN BODY:
export const API_IN_LOGIN_EMAIL = 'username'
export const API_IN_LOGIN_PASSWORD = 'password'

//LOBBY BODY:
  // CREATE LOBBY:

/* lobbyIn_name: str, lobbyIn_max_players: Optional[int], lobbyIn_min_players: Optional[int] */
