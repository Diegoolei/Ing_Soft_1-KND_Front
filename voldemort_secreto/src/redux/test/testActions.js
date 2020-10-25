import { RUN_TEST, RESET_TEST } from './testTypes'

export const runTest = () => {
  return {
    type: RUN_TEST
  }
}

export const resetTest = () => {
  return {
    type: RESET_TEST
  }
}