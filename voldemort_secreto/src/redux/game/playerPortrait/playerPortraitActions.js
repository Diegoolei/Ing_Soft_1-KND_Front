import { CGL_PORTRAIT_ADD_PLAYER, CGL_PORTRAIT_SET_AMOUNT } from './playerPortraitTypes'

export const setAmountPlayers = amount => {
  return {
    type: CGL_PORTRAIT_SET_AMOUNT,
    payload: amount
  }
}

export const addToPortraitArray = player_info => {
  return {
    type: CGL_PORTRAIT_ADD_PLAYER,
    payload: player_info
  }
}

export const setPlayerPortraits = (player_array, cur_pl_nick) => {

  const pos_constructor = (nick, top = -1, left = -1, bottom = -1, right = -1) => {
    return {
      nick: nick,
      top: top,
      left: left,
      bottom: bottom,
      right: right
    }
  }

  const pos_bottom_left   = nick => pos_constructor(nick, 105, 0)
  const pos_bottom_middle = nick => pos_constructor(nick, 105, 40)
  const pos_bottom_right  = nick => pos_constructor(nick, 105, 80)

  const pos_top_left      = nick => pos_constructor(nick, -1, 0, 101)
  const pos_top_midleft   = nick => pos_constructor(nick, -1, 20, 101)
  const pos_top_middle    = nick => pos_constructor(nick, -1, 40, 101)
  const pos_top_midright  = nick => pos_constructor(nick, -1, 60, 101)
  const pos_top_right     = nick => pos_constructor(nick, -1, 80, 101)

  const pos_left_up       = nick => pos_constructor(nick, 0, -1, -1, 105)
  const pos_left_middle   = nick => pos_constructor(nick, 30, -1, -1, 105)
  const pos_left_down     = nick => pos_constructor(nick, -1, -1, 0, 105)

  const pos_right_up      = nick => pos_constructor(nick, 0, 105)
  const pos_right_middle  = nick => pos_constructor(nick, 30, 105)
  const pos_right_down    = nick => pos_constructor(nick, -1, 105, 0)

  const getPortraitInfo = (nick, amount_players, relative_position) => {
    switch (relative_position) {
      case 0: return pos_bottom_middle(nick)

      case 1:
        if(amount_players < 7) return pos_left_middle(nick)
        else return pos_bottom_left(nick)

      case 2:
        switch (amount_players) {
          case 5: return pos_top_midleft(nick)
          case 6: return pos_top_left(nick)        
          default:
            if(amount_players < 9) return pos_left_middle(nick)
            else return pos_left_down(nick)
        }
      
      case 3:
        switch (amount_players) {
          case 5: return pos_top_midright(nick)
          case 6: return pos_top_middle(nick)
          case 7: return pos_top_midleft(nick)
          case 8: return pos_top_left(nick)
          case 9: return pos_left_up(nick)
          case 10: return pos_left_up(nick)
          default: return pos_bottom_middle(nick)
        }
      
      case 4:
        switch (amount_players) {
          case 5: return pos_right_middle(nick)
          case 6: return pos_top_right(nick)
          case 7: return pos_top_midright(nick)
          case 8: return pos_top_middle(nick)
          case 9: return pos_top_midleft(nick)
          case 10: return pos_top_left(nick)
          default: return pos_bottom_middle(nick)
        }

      case 5:
        switch (amount_players) {
          case 6: return pos_right_middle(nick)
          case 7: return pos_right_middle(nick)
          case 8: return pos_top_right(nick)
          case 9: return pos_top_midright(nick)
          case 10: return pos_top_middle(nick)
          default: return pos_bottom_middle(nick)
        }
      
      case 6:
        switch (amount_players) {
          case 7: return pos_bottom_right(nick)
          case 8: return pos_right_middle(nick)
          case 9: return pos_right_up(nick)
          case 10: return pos_top_right(nick)
          default: return pos_bottom_middle(nick)
        }
      
      case 7:
        switch (amount_players) {
          case 8: return pos_bottom_right(nick)
          case 9: return pos_right_down(nick)
          case 10: return pos_right_up(nick)
          default: return pos_bottom_middle(nick)
        }

      case 8:
        switch (amount_players) {
          case 9: return pos_bottom_right(nick)
          case 10: return pos_right_down(nick)
          default: return pos_bottom_middle(nick)
        }
      
      case 9: return pos_bottom_right(nick)

      default: return pos_bottom_middle(nick)
    }
  }

  const cur_pl_num = player_array[cur_pl_nick].player_number
  let amount_players = 0
  for (let _ in player_array) amount_players++
  return dispatch => {
    dispatch(setAmountPlayers(amount_players))
    for (let nick in player_array) {
      const relative_position = (player_array[nick].player_number + amount_players - cur_pl_num) % amount_players
      const portraitInfo = getPortraitInfo(nick, amount_players, relative_position)
      dispatch(addToPortraitArray(portraitInfo))
    }
  }
}
