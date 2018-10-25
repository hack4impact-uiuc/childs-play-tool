// @flow
const SAVE_SEARCH = 'results/SAVE_SEARCH'

export const resultsState = {
  games: {
    Switch: [
      {
        title: 'Mario Kart',
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
        title: 'Childs Play',
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
        title: 'Test',
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
        title: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '3' },
          { type: 'system', tag: 'xbox' },
          { type: 'symptom', tag: 'debug' }
        ]
      },
      {
        title: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '3' },
          { type: 'system', tag: 'xbox' },
          { type: 'symptom', tag: 'debug' }
        ]
      },
      {
        title: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '3' },
          { type: 'system', tag: 'xbox' },
          { type: 'symptom', tag: 'debug' }
        ]
      },
      {
        title: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '3' },
          { type: 'system', tag: 'xbox' },
          { type: 'symptom', tag: 'debug' }
        ]
      }
    ]},
  searches: [{ value: 'testName', searchResults: 'testResults' }]
}

export default function reducer(state = resultsState, action) {
  switch (action.type) {
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
