// @flow
const INCREMENT = 'counter/INCREMENT'
const RESET = 'counter/RESET'
const SET = 'counter/SET'

const initialState = {
  count: 0
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }
    case RESET:
      return {
        ...state,
        count: 0
      }
    case SET:
      return {
        ...state,
        count: action.value
      }
    default:
      return state
  }
}

export const increment = () => ({
  type: INCREMENT
})

export const reset = () => ({
  type: RESET
})

export const set = value => ({
  type: SET,
  value
})
