import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import counter from './counter'
import results from './results'

export default combineReducers({
  routing: routerReducer,
  counter,
  results
})
