import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import socketMiddleware from '../redux/socket/socketMiddleware'

const middlewareEnhancer = composeWithDevTools(applyMiddleware(logger, thunk, socketMiddleware))

const store = createStore(rootReducer, middlewareEnhancer)

export default store
