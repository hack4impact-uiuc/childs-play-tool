import axios from 'axios'
const BACKEND_URL = 'http://localhost:8080/games'

function getGames(age, symptom, system) {
  return axios
    .get(BACKEND_URL + '?age=' + age + '&symptom=' + symptom + '&system=' + system)
    .then(response => {
      return response.data.result.games
    })
    .catch(function(error) {
      console.log('ERROR: ', error)
      return null
    })
}

export { getGames }
