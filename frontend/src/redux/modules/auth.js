import { ADMIN_KEY } from '../../keys'

const LOGIN = 'auth/login'
const LOAD_UPDATES = 'auth/load_updates'

const initialState = {
  authenticated: false,
  updates: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authenticated: action.value === ADMIN_KEY
      }
    case LOAD_UPDATES:
      return {
        ...state,
        updates: action.value
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
