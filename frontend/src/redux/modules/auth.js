import { ADMIN_KEY } from '../../keys'

const LOGIN = 'auth/login'

const initialState = {
  authenticated: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authenticated: action.value === ADMIN_KEY
      }
    default:
      return state
  }
}

export const login = value => ({
  type: LOGIN,
  value
})