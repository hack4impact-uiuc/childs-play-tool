// @flow
const UPDATE_CONSOLE_FIELD = 'searchpage/UPDATE_CONSOLE_FIELD'

const initialState = {
  fieldvalue: "teststring"
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONSOLE_FIELD:
      return {
        ...state,
        consoleField: action.value
      }
    default:
      return state
  }
}

export const updateConsoleField = value => ({
  type: UPDATE_CONSOLE_FIELD,
  value
})
