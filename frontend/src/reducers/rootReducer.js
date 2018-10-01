// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import stuff from './stuff.reducer'
import colors from './colors.reducer'

const rootReducer = combineReducers({
  stuff,
  colors,
  router: routerReducer
})

export default rootReducer
