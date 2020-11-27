import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DEACTIVE_CHANGE_NICK,
  APPS_ACTIVATE_SELECT_DIRECTOR,
  APPS_DEACTIVE_SELECT_DIRECTOR,
  APPS_ACTIVATE_CRUCIO,
  APPS_DEACTIVE_CRUCIO,
} from './activeAppsTypes'

export const activateChangeNick = () => {
  return {
    type: APPS_ACTIVATE_CHANGE_NICK
  }
}

export const deactivateChangeNick = () => {
  return {
    type: APPS_DEACTIVE_CHANGE_NICK
  }
}

export const activateCrucio = () => {
  return {
    type: APPS_ACTIVATE_CRUCIO
  }
}

export const deactivateCrucio = () => {
  return {
    type: APPS_DEACTIVE_CRUCIO
  }
}

export const activateCandidateSelection = () => {
  return {
    type: APPS_ACTIVATE_SELECT_DIRECTOR
  }
}

export const deactivateCandidateSelection = () => {
  return {
    type: APPS_DEACTIVE_SELECT_DIRECTOR
  }
}