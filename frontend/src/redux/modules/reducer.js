import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import counter from './counter'
<<<<<<< HEAD
import results from './results'
=======
import searchpage from './searchpage'
>>>>>>> 801b68ded5b3a1120a1508353a0dc7d9031fb753

export default combineReducers({
  routing: routerReducer,
  counter,
<<<<<<< HEAD
  results
=======
  searchpage
>>>>>>> 801b68ded5b3a1120a1508353a0dc7d9031fb753
})
