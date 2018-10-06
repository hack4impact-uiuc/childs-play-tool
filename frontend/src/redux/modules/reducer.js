import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import counter from './counter'

export default combineReducers({
  routing: routerReducer,
  counter
})
