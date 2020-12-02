import {
  APPS_ACTIVATE_CHANGE_NICK,
  APPS_DEACTIVE_CHANGE_NICK,
  APPS_ACTIVATE_SELECT_DIRECTOR,
  APPS_DEACTIVE_SELECT_DIRECTOR,
  APPS_MAKE_SELECT_DIRECTOR_AVAILABLE,
  APPS_MAKE_SELECT_DIRECTOR_UNAVAILABLE,
  APPS_ENABLE_DISCARD_CARD,
  APPS_DISABLE_DISCARD_CARD,
  APPS_ACTIVATE_MINISTER_DC,
  APPS_DEACTIVATE_MINISTER_DC,
  APPS_ACTIVATE_DIRECTOR_DC,
  APPS_DEACTIVATE_DIRECTOR_DC,
  APPS_MAKE_CRUCIO_AVAILABLE,
  APPS_MAKE_CRUCIO_UNAVAILABLE,
  APPS_ACTIVATE_CRUCIO,
  APPS_DEACTIVE_CRUCIO,
  APPS_MAKE_AVADA_KEDAVRA_AVAILABLE,
  APPS_MAKE_AVADA_KEDAVRA_UNAVAILABLE,
  APPS_ACTIVATE_AVADA_KEDAVRA,
  APPS_DEACTIVATE_AVADA_KEDAVRA,
  APPS_MAKE_EXPELLIARMUS_AVAILABLE,
  APPS_MAKE_EXPELLIARMUS_UNAVAILABLE,
  APPS_ACTIVATE_EXPELLIARMUS,
  APPS_DEACTIVE_EXPELLIARMUS,
  APPS_VOTE_AVAILABLE,
  APPS_ACTIVATE_VOTE,
  APPS_VOTE_UNAVAILABLE,
  APPS_DEACTIVATE_VOTE
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

export const enableVote = () => {
  return {
    type: APPS_VOTE_AVAILABLE
  }
}

export const disableVote = () => {
  return {
    type: APPS_VOTE_UNAVAILABLE
  }
}

export const activateVote = () => {
  return {
    type: APPS_ACTIVATE_VOTE
  }
}

export const deactivateVote = () => {
  return {
    type: APPS_DEACTIVATE_VOTE
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

export const makeExpelliarmusAvailable = () => {
  return {
    type: APPS_MAKE_EXPELLIARMUS_AVAILABLE
  }
}

export const makeExpelliarmusUnavailable = () => {
  return {
    type: APPS_MAKE_EXPELLIARMUS_UNAVAILABLE
  }
}

export const activateExpelliarmus = () => {
  return {
    type: APPS_ACTIVATE_EXPELLIARMUS
  }
}

export const deactivateExpelliarmus = () => {
  return {
    type: APPS_DEACTIVE_EXPELLIARMUS
  }
}