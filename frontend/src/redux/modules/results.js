// @flow
const SAVE_SEARCH = 'results/SAVE_SEARCH'
const UPDATE_RESULTS = 'results/UPDATE_RESULTS'
const GET_SAVED_SEARCH = 'results/GET_SAVED_SEARCH'

export const resultsState = {
  searches: [],
  games: {}
}

export default function reducer(state = resultsState, action) {
  switch (action.type) {
    case UPDATE_RESULTS:
      return {
        ...state,
        games: action.value
      }
    case SAVE_SEARCH:
      return {
        ...state,
        searches: state.searches.concat({
          value: action.payload.value,
          searchResults: action.payload.searchResults
        })
      }
    case GET_SAVED_SEARCH:
      return {
        ...state,
        games: state.searches.find(({ value }) => value === action.value).searchResults
      }
    default:
      return state
  }
}

export const saveSearch = (value, searchResults) => ({
  type: SAVE_SEARCH,
  payload: {
    value,
    searchResults
  }
})

export const updateResults = value => ({
  type: UPDATE_RESULTS,
  value
})

export const getSavedSearch = value => ({
  type: GET_SAVED_SEARCH,
  value
})
