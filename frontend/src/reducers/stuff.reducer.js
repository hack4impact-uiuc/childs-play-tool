// @flow
import initialState from './initialState'
import { RECEIVE_STUFF } from '../actions/actionTypes'
import type { Stuff, StuffAction } from './../types'

export default function stuff(
  state: Stuff = initialState.stuff,
  action: StuffAction
) {
  let newState
  switch (action.type) {
    case RECEIVE_STUFF:
      newState = action.payload
      return newState
    default:
      return state
  }
}
