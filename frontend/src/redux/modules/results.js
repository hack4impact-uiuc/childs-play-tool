// @flow
const SAVE_SEARCH = 'results/SAVE_SEARCH'
const UPDATE_RESULTS = 'results/UPDATE_RESULTS'

export const resultsState = {
  games: {},
  searches: []

  /*
  HARD-CODED TEST DATA
  {
    Switch: [
      {
        name: 'Mario Kart',
        summary: 'A racing game',
        description: 'A racing game where the most important skill is luck',
        tags: [
          { type: 'age', tag: '0-5' },
          { type: 'system', tag: 'Switch' },
          { type: 'symptom', tag: 'Pain' }
        ]
      }
    ],
    That: [
      {
        name: 'Childs Play',
        summary: 'Best team',
        description: 'Best team to ever exist ever',
        tags: [
          { type: 'age', tag: 'Bounce' },
          { type: 'system', tag: 'that' },
          { type: 'symptom', tag: 'shit' }
        ]
      }
    ],
    XBox: [
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '3' },
          { type: 'system', tag: 'xbox' },
          { type: 'symptom', tag: 'debug' },
          { type: 'misc', tag: 'test' }
        ]
      },
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '3' },
          { type: 'system', tag: 'xbox' },
          { type: 'symptom', tag: 'debug' }
        ]
      },
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '3' },
          { type: 'system', tag: 'xbox' },
          { type: 'symptom', tag: 'debug' }
        ]
      },
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '3' },
          { type: 'system', tag: 'xbox' },
          { type: 'symptom', tag: 'debug' }
        ]
      },
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '3' },
          { type: 'system', tag: 'xbox' },
          { type: 'symptom', tag: 'debug' }
        ]
      }
    ]
  }
  */
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
