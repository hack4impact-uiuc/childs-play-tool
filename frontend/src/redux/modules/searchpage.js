// @flow
const UPDATE_FIELD = 'searchpage/UPDATE_FIELD'
const FIELD_CHANGED = 'FIELD_CHANGED'

const initialState = {
  consoles: '',
  ageRange: '',
  ailments: '',
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
