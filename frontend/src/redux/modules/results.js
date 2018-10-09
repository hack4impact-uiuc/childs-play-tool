// @flow

const initialState = {
  games: [
    {
      title: 'Mario Kart',
      summary: 'A racing game',
      description: 'A racing game where the most important skill is luck',
      tags: [
        { type: 'age', tag: '0-5' },
        { type: 'system', tag: 'Switch' },
        { type: 'ailment', tag: 'Pain' }
      ]
    },
    {
      title: 'Childs Play',
      summary: 'Best team',
      description: 'Best team to ever exist ever',
      tags: [
        { type: 'age', tag: 'Bounce' },
        { type: 'system', tag: 'that' },
        { type: 'ailment', tag: 'shit' }
      ]
    }
  ]
}

export default function reducer(state = initialState, action) {
  return state
}
