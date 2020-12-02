
// Const
export const CGL_CHAT_MEMORY_LENGTH       = 50

// CGL == Current Game Lobby
// Actions
export const CGL_SET_LOBBY_INFORMATION    = 'CGL_SET_LOBBY_INFORMATION'
export const CGL_SET_GAME_IMFORMATION     = 'CGL_SET_GAME_IMFORMATION'
export const CGL_CLEAN_STATE              = 'CGL_CLEAN_STATE'
export const CGL_PLAYER_JOINED_LOBBY      = 'CGL_PLAYER_JOINED_LOBBY'
export const CGL_PLAYER_JOINED_GAME       = 'CGL_PLAYER_JOINED_GAME'
export const CGL_PLAYER_LEFT_LOBBY        = 'CGL_PLAYER_LEFT_LOBBY'
export const CGL_PROCLAIM_PHOENIX         = 'CGL_PROCLAIM_PHOENIX'
export const CGL_PROCLAIM_DEATH_EATER     = 'CGL_PROCLAIM_DEATH_EATER'
export const CGL_BLOCK_CHAT               = 'CGL_BLOCK_CHAT'
export const CGL_UNBLOCK_CHAT             = 'CGL_UNBLOCK_CHAT'
export const CGL_SWITCH_TO_GAME           = 'CGL_SWITCH_TO_GAME'
export const CGL_UPDATE_NICK              = 'CGL_UPDATE_NICK'
export const CGL_VOTE                     = 'CGL_VOTE'
export const CGL_SET_DECK_AMOUNT          = 'CGL_SET_DECK_AMOUNT'
export const CGL_SET_PLAYER_ROLE          = 'CGL_SET_PLAYER_ROLE'
export const CGL_SET_DIRECTOR             = 'CGL_SET_DIRECTOR'
export const CGL_SET_MINISTER             = 'CGL_SET_MINISTER'
export const CGL_SET_ELECTION_COUNTER     = 'CGL_SET_ELECTION_COUNTER'
export const CGL_SET_CURRENT_CANDIDATE    = 'CGL_SET_CURRENT_CANDIDATE'
export const CGL_SET_PLAYER_DEAD          = 'CGL_SET_PLAYER_DEAD'

// For when we need to wait before we consume an action
export const CGL_START_WAITING_FOR_USER   = 'CGL_START_WAITING_FOR_USER'
export const CGL_USER_DONE_WITH_ACTION    = 'CGL_USER_DONE_WITH_ACTION'

// For when we simply must show some text to the user informing something
export const CGL_LOG_ACTION               = 'CGL_LOG_ACTION'
export const CGL_CONSUME_LOG              = 'CGL_CONSUME_LOG'
