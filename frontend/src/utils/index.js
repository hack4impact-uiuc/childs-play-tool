// @flow
import type { Stuff } from './../types'

function mockFetchStuff(): Promise<{ stuff: Stuff }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ stuff: ['thing1', 'thing2', 'thing3'] })
    }, Math.random() * 50)
  })
}

export default {
  mockFetchStuff
}
