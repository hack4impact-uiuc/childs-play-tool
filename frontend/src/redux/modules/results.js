// @flow
const UPDATE_RESULTS = 'results/UPDATE_RESULTS'
const initialState = {
  games: {
    Switch: [
      {
        name: 'Mario Kart',
        summary: 'A racing game',
        description: 'A racing game where the most important skill is luck',
        tags: [{ type: 'age', tag: '12 and Under' }, { type: 'symptom', tag: 'Pain' }]
      }
    ],
    That: [
      {
        name: 'Childs Play',
        summary: 'Best team',
        description: 'Best team to ever exist ever',
        tags: [{ type: 'age', tag: 'Bounce' }, { type: 'symptom', tag: 'shit' }]
      }
    ],
    XBox: [
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '13 and Older' },
          { type: 'symptom', tag: 'Cognitive Impairment' },
          { type: 'misc', tag: 'debug' }
        ]
      },
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [{ type: 'age', tag: '12 and Under' }, { type: 'symptom', tag: 'Sadness' }]
      },
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [{ type: 'age', tag: '12 and Under' }, { type: 'symptom', tag: 'Bored (Long Term)' }]
      },
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [{ type: 'age', tag: '12 and Under' }, { type: 'symptom', tag: 'Bored (Short Term)' }]
      },
      {
        name: 'Test',
        summary: 'A test',
        description: 'A test',
        tags: [
          { type: 'age', tag: '12 and Under' },
          { type: 'symptom', tag: 'Anxiety/Hyperactivity' }
        ]
      }
    ]
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_RESULTS:
      return {
        ...state,
        games: action.value
      }
    default:
      return state
  }
}

export const updateResults = value => ({
  type: UPDATE_RESULTS,
  value
})
