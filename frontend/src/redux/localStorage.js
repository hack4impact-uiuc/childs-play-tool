import { resultsState } from './modules/results'

const STATE_STORAGE = 'childs_play_state'

export const loadState = () => {
  try {

    const serializedState = localStorage.getItem(STATE_STORAGE)
    console.log(serializedState)
    if (serializedState === undefined || serializedState === null) {
      localStorage.setItem(STATE_STORAGE, resultsState)
      return { results: resultsState }
    }
    let savedState = JSON.parse(serializedState)
    resultsState.searches = savedState.results.searches
    // searchState.consoles = savedState.searchpage.consoles
    // searchState.ageRange = savedState.searchpage.ageRange
    // searchState.symptoms = savedState.searchpage.symptoms
    // searchState.genders = savedState.searchpage.genders
    //console.log(searchState)
    return { results: resultsState }
  } catch (err) {
    return { results: resultsState }
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STATE_STORAGE, serializedState)
  } catch (err) {
    console.log('Unable to save data to Local Storage')
  }
}
