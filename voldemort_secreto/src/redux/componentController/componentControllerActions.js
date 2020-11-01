import { CHANGE_SCREEN } from './componentControllerTypes'

export const changeScreen = componentName => {
  return {
    type : CHANGE_SCREEN,
    payload : componentName
  }
}