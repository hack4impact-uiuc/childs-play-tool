// change to actual values from database
import { loadState }  from '../redux/localStorage'

const savedState = loadState()
const Constants = {
  consoles: [{ value: 'Wii' }, { value: 'iPhone' }, { value: 'XBOX' }],
  ageRange: [{ value: '2 and under' }, { value: '2 to 5' }, { value: '5 and over' }],
  symptoms: [{ value: 'sad' }, { value: 'angry' }, { value: 'upset' }],
  savedSearches: savedState.searches
}

export default Constants
