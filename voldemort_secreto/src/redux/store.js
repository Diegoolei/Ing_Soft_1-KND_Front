import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import socketMiddleware from '../redux/socket/socketMiddleware'

const logger = createLogger({ collapsed: true })

const middlewareEnhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware, logger))

const store = createStore(rootReducer, middlewareEnhancer)

export default store
