// @flow
const SAVE_SEARCH = 'results/SAVE_SEARCH'
const UPDATE_RESULTS = 'results/UPDATE_RESULTS'
const GET_SAVED_SEARCH = 'results/GET_SAVED_SEARCH'

export const resultsState = {
  searches: [],
  games: {
    // default test data
    // 'Nintendo Switch': [
    //   {
    //     name: 'Mario Kart',
    //     summary: 'A racing game',
    //     description: 'A racing game where the most important skill is luck',
    //     tags: [{ type: 'age', tag: '12 and Under' }, { type: 'symptom', tag: 'Pain' }]
    //   }
    // ],
    // That: [
    //   {
    //     name: 'Childs Play',
    //     summary: 'Best team',
    //     description: 'Best team to ever exist ever',
    //     tags: [{ type: 'age', tag: 'Bounce' }, { type: 'symptom', tag: 'shit' }]
    //   }
    // ],
    // 'Xbox One': [
    //   {
    //     name: 'Test',
    //     summary: 'A test',
    //     description: 'A test',
    //     tags: [
    //       { type: 'age', tag: '13 and Older' },
    //       { type: 'symptom', tag: 'Cognitive Impairment' },
    //       { type: 'misc', tag: 'debug' }
    //     ]
    //   },
    //   {
    //     name: 'Test',
    //     summary: 'A test',
    //     description: 'A test',
    //     tags: [{ type: 'age', tag: '12 and Under' }, { type: 'symptom', tag: 'Sadness' }]
    //   },
    //   {
    //     name: 'Test',
    //     summary: 'A test',
    //     description: 'A test',
    //     tags: [{ type: 'age', tag: '12 and Under' }, { type: 'symptom', tag: 'Bored (Long Term)' }]
    //   },
    //   {
    //     name: 'Test',
    //     summary: 'A test',
    //     description: 'A test',
    //     tags: [{ type: 'age', tag: '12 and Under' }, { type: 'symptom', tag: 'Bored (Short Term)' }]
    //   },
    //   {
    //     name: 'Test',
    //     summary: 'A test',
    //     description: 'A test',
    //     tags: [
    //       { type: 'age', tag: '12 and Under' },
    //       { type: 'symptom', tag: 'Anxiety/Hyperactivity' }
    //     ]
    //   }
    // ]
  }
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
        games: state.searches.find(({ value }) => value === action.value).searchResults.results
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
