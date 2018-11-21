// @flow
const UPDATE_FIELD = 'searchpage/UPDATE_FIELD'
const FIELD_CHANGED = 'FIELD_CHANGED'

export const searchState = {
  consoles: '',
  ageRange: '',
  symptoms: '',
  genders: '',
  nameSearchField: '',
  selectedSaveSearch: ''
}

export default function reducer(state = searchState, action) {
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
