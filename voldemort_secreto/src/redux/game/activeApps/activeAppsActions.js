import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DEACTIVE_CHANGE_NICK,
  APPS_ACTIVATE_SELECT_DIRECTOR,
  APPS_DEACTIVE_SELECT_DIRECTOR,
  APPS_MAKE_CRUCIO_AVAILABLE,
  APPS_MAKE_CRUCIO_UNAVAILABLE,
  APPS_ACTIVATE_CRUCIO,
  APPS_DEACTIVE_CRUCIO,
  APPS_ENABLE_DISCARD_CARD,
  APPS_DISABLE_DISCARD_CARD,
  APPS_ACTIVATE_MINISTER_DC,
  APPS_DEACTIVATE_MINISTER_DC,
  APPS_ACTIVATE_DIRECTOR_DC,
  APPS_DEACTIVATE_DIRECTOR_DC
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

export const enableDiscardCard = () => {
  return {
    type: APPS_ENABLE_DISCARD_CARD
  }
}

export const disableDiscardCard = () => {
  return {
    type: APPS_DISABLE_DISCARD_CARD
  }
}

export const activateDiscardCardMinister = () => {
  return {
    type: APPS_ACTIVATE_MINISTER_DC
  }
}

export const deactivateDiscardCardMinister = () => {
  return {
    type: APPS_DEACTIVATE_MINISTER_DC
  }
}

export const activateDiscardCardDirector = () => {
  return {
    type: APPS_ACTIVATE_DIRECTOR_DC
  }
}

export const deactivateDiscardCardDirector = () => {
  return {
    type: APPS_DEACTIVATE_DIRECTOR_DC
  }
}

