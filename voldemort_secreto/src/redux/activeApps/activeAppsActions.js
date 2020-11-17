import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DESACTIVE_CHANGE_NICK
} from './activeAppsTypes'

export const activateChangeNick = () => {
  return {
    type: APPS_ACTIVATE_CHANGE_NICK,
  }
}

export const deactivateChangeNick = () => {
  return {
    type: APPS_DESACTIVE_CHANGE_NICK,
  }
}
