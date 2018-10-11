import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import counter from './counter'
import searchpage from './searchpage'

export default combineReducers({
  routing: routerReducer,
  counter,
  searchpage
})
