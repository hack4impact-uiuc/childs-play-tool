import axios from 'axios'
import BACKEND_URL from './ApiConfig'

function getGames(age, symptom, system) {
  return axios
    .get(BACKEND_URL + '/games' + '?age=' + age + '&symptom=' + symptom + '&system=' + system)
    .then(response => {
      return response.data.result.games
    })
    .catch(function(error) {
      console.log('ERROR: ', error)
      return null
    })
}

export { getGames }
