// @flow
const SAVE_SEARCH = 'results/SAVE_SEARCH'

const initialState = {
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
  searches: [{ name: 'test', search: 'test' }]
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SEARCH:
      return {
        ...state,
        searches: state.searches.concat({
          name: action.payload.field,
          search: action.payload.value
        })
      }
    default:
      return state
  }
}

export const saveSearch = (field, value) => ({
  type: SAVE_SEARCH,
  payload: {
    field,
    value
  }
})
