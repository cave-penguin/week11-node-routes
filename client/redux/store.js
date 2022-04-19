import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import { io } from 'socket.io-client'

import rootReducer from './reducers'

const initialState = {}

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const middleWare = [thunk]
const composeEnhansers = composeFunc(applyMiddleware(...middleWare))

const store = createStore(rootReducer(), initialState, composeEnhansers)

// let socket

// const initSocket = () => {
//     socket = io('http://localhost/ws')
//     // eslint-disable-next-line no-console
//     console.log(socket)
// }

// initSocket()

export default store
