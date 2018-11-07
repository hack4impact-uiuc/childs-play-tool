import axios from 'axios'
import BACKEND_URL from './ApiConfig'

export const getGamesByName = name => {
  return axios
    .get(BACKEND_URL + '/search/games' + '?name=' + name)
    .then(response => {
      return response.data.result.games
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const getGames = (age, symptom, system, gender) => {
  return axios
    .get(
      BACKEND_URL +
        '/games' +
        '?age=' +
        age +
        '&symptom=' +
        symptom +
        '&system=' +
        system +
        '&gender=' +
        gender
    )
    .then(response => {
      return response.data.result.games
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const sendFile = file => {
  let data = new FormData()
  data.append('file', file)

  return axios
    .post(BACKEND_URL + '/games', data)
    .then(response => {
      return {
        type: 'UPLOAD_FILE_SUCCESS',
        response
      }
    })
    .catch(error => {
      return {
        type: 'UPLOAD_FILE_FAIL',
        error
      }
    })
}
