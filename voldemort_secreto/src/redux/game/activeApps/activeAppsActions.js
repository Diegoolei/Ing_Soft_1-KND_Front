import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DEACTIVE_CHANGE_NICK,
  APPS_ACTIVATE_SELECT_DIRECTOR,
  APPS_DEACTIVE_SELECT_DIRECTOR,
  APPS_MAKE_CRUCIO_AVAILABLE,
  APPS_MAKE_CRUCIO_UNAVAILABLE,
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

export const makeCrucioAvailable = () => {
  return {
    type: APPS_MAKE_CRUCIO_AVAILABLE
  }
}

export const makeCrucioUnavailable = () => {
  return {
    type: APPS_MAKE_CRUCIO_UNAVAILABLE
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