import { createStore } from 'redux'
import testReducer from './test/testReducer'

const store = createStore(testReducer)

export default store