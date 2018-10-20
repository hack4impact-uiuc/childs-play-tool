// @flow
const UPDATE_RESULTS = 'results/UPDATE_RESULTS'
const initialState = {
  games: ''
  
  /*
  {
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
    ]
  }
  */
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_RESULTS:
      return {
        ...state,
        games: state.games.append(action.payload.value)
      }
    default:
      return state
    }
}

export const updateResults = (field, value) => ({
  type: UPDATE_RESULTS,
  payload: {
    field,
    value
  }
})