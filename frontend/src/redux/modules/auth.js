// let ADMIN_KEY
// if (process.env.KEYS === 'production' && process.env.ADMIN_KEY.length > 1) {
  // ADMIN_KEY = 
// } else {
  // ADMIN_KEY = require('../../keys').ADMIN_KEY
// }

const LOGIN = 'auth/login'
const LOAD_UPDATES = 'auth/load_updates'
const LOAD = 'auth/begin_loading'

const initialState = {
  authenticated: false,
  updates: {},
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authenticated: action.value === process.env.ADMIN_KEY
      }
    case LOAD_UPDATES:
      return {
        ...state,
        updates: action.value
      }
    case LOAD:
      return {
        ...state,
        loading: action.value
      }
    default:
      return state
  }
}

export const login = value => ({
  type: LOGIN,
  value
})

export const loadUpdates = value => ({
  type: LOAD_UPDATES,
  value
})

export const beginLoading = () => ({
  type: LOAD,
  value: true
})

export const endLoading = () => ({
  type: LOAD,
  value: false
})
