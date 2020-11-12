
const initialState = {
  on_lobby: true,
  on_game: false,
  turn_step: -1,
  player_id: -1,
  player_number: -1,
  chat_blocked: false,
  current_director: -1,
  current_minister: -1,
  player_array: [],
  election_counter: 0,
  cards_in_deck: 17,
  proclaimed_phoenix: 0,
  proclaimed_death_eater: 0,
  actions : []
}

// Endpoint refresh state

/*other_player = {
  nick: str,
  player_number: int,
  connected: bool,
  role: int,  // [UNKNOWN ... and the others],
  is_alive: bool,
  is_candidate: bool, 
  vote: int
}*/

/*
Todos los jugadores
- si está muerto //*DONE
- nombre //*DONE
- si es director, ministro o candidato a director //*DONE
- si fue el anterior ministro o director //? MAYBE..
- ver orden de jugador //*DONE
- Mortífagos: saben quiénes son entre ellos //*DONE
- "que acción hizo" (votos) //?DUNNO
- si está conectado //*DONE
*/
