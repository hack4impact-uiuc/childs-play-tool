// @flow
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import reducer from './modules/reducer'
import { loadState, saveState } from './localStorage'

export const history = createHistory()
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunk, routerMiddleware(history)]
const composedMiddleware = compose(applyMiddleware(...middleware))
const persistedState = loadState()

const savePersistedState = store => () => {
        console.log(store.getState());
  saveState({ searches: store.getState().results.searches })
  saveState({ age: store.getState().searchpage.ageRange })

  /*
  { age: store.getState().searchpage.ageRange},
  { console: store.getState().searchpage.consoles},
  { gender: store.getState().searchpage.genders},
  { symptom: store.getState().searchpage.symptoms},
  */
}

export default function configureStore() {
  let store = createStore(reducer, persistedState, devtools(composedMiddleware))
  store.subscribe(savePersistedState(store))
  return store
}
