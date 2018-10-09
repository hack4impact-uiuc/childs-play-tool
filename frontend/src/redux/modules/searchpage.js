// @flow
const UPDATE_FIELD = 'searchpage/UPDATE_FIELD'
const FIELD_CHANGED = 'FIELD_CHANGED'

const initialState = {
  consoleField: '',
  ageField: '',
  ailmentField: '',
  nameSearchField: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }
    default:
      return state
  }
}

export const updateField = (field, value) => ({
  type: UPDATE_FIELD,
  payload: {
    field,
    value
  }
})
//
// export function changedFormData(field, value) {
//   return dispatch => dispatch(formDataChanged(field, value))
// }
//
// export const updateField = value => ({
//   type: UPDATE_FIELD,
//   value
// })
