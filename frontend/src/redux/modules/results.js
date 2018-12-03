// @flow
const SAVE_SEARCH = 'results/SAVE_SEARCH'
const UPDATE_RESULTS = 'results/UPDATE_RESULTS'
const GET_SAVED_SEARCH = 'results/GET_SAVED_SEARCH'
const UPDATE_TAB = 'results/UPDATE_TAB'

export const resultsState = {
  searches: [],
  games: {},
  query: {},
  activeTab: '1'
}

export default function reducer(state = resultsState, action) {
  switch (action.type) {
    case UPDATE_RESULTS:
      return {
        ...state,
        games: action.value.games,
        query: action.value.query,
        activeTab: '1'
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
        games: state.searches.find(({ value }) => value === action.value).searchResults.results,
        query: state.searches.find(({ value }) => value === action.value).searchResults.query
      }
    case UPDATE_TAB:
      return {
        ...state,
        activeTab: action.value.activeTab
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

export const updateTab = value => ({
  type: UPDATE_TAB,
  value
})
