// @flow
import * as actionTypes from './actionTypes'
import Utils from './../utils'
import type { Stuff, StuffAction } from './../types'

function receiveStuff(json: { stuff: Stuff }): StuffAction {
  return { type: actionTypes.RECEIVE_STUFF, payload: json.stuff }
}

// TODO: find out how to type a returned function that returns a promise
export function fetchStuff(): Function {
  return dispatch => {
    return Utils.mockFetchStuff().then(json => dispatch(receiveStuff(json)))
  }
}
