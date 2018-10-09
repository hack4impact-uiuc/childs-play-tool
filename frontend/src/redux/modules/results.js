// @flow
const INCREMENT = 'counter/INCREMENT'
const RESET = 'counter/RESET'
const SET = 'counter/SET'

const initialState = {
  title: 'Mario Kart',
  summary: 'A racing game',
  description: 'A racing game where the most important skill is luck',
  tags: [
    { type: 'age', tag: '0-5' },
    { type: 'system', tag: 'Switch' },
    { type: 'ailment', tag: 'Pain' }
  ]
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
