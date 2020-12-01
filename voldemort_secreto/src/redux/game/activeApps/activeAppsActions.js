import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DEACTIVE_CHANGE_NICK,
  APPS_ACTIVATE_SELECT_DIRECTOR,
  APPS_DEACTIVE_SELECT_DIRECTOR,
  APPS_MAKE_SELECT_DIRECTOR_AVAILABLE,
  APPS_MAKE_SELECT_DIRECTOR_UNAVAILABLE,
  APPS_MAKE_CRUCIO_AVAILABLE,
  APPS_MAKE_CRUCIO_UNAVAILABLE,
  APPS_ACTIVATE_CRUCIO,
  APPS_DEACTIVE_CRUCIO,
  APPS_MAKE_AVADA_KEDAVRA_AVAILABLE,
  APPS_MAKE_AVADA_KEDAVRA_UNAVAILABLE,
  APPS_ACTIVATE_AVADA_KEDAVRA,
  APPS_DEACTIVATE_AVADA_KEDAVRA
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

export const makeSelectDirectorAvailable = () => {
  return {
    type: APPS_MAKE_SELECT_DIRECTOR_AVAILABLE
  }
}

export const makeSelectDirectorUnavailable = () =>{
  return {
    type: APPS_MAKE_SELECT_DIRECTOR_UNAVAILABLE
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

export const makeAvadaKedavraAvailable = () => {
  return {
    type: APPS_MAKE_AVADA_KEDAVRA_AVAILABLE
  }
}

export const makeAvadaKedavraUnavailable = () => {
  return {
    type: APPS_MAKE_AVADA_KEDAVRA_UNAVAILABLE
  }
}

export const activateAvadaKedavra = () => {
  return {
    type: APPS_ACTIVATE_AVADA_KEDAVRA
  }
}

export const deactivateAvadaKedavra = () => {
  return {
    type: APPS_DEACTIVATE_AVADA_KEDAVRA
  }
}
