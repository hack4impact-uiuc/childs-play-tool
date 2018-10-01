// @flow
import initialState from './initialState'
import type { Colors, ColorsAction } from './../types'

export default function colors(
  state: Colors = initialState.colors,
  action: ColorsAction
) {
  switch (action.type) {
    default:
      return state
  }
}
