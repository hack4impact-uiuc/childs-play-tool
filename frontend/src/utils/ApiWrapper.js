import axios from 'axios'
import BACKEND_URL from './ApiConfig'
import { BACKEND_KEY } from '../keys'

export const getGamesByName = name => {
  return axios
    .get(BACKEND_URL + '/search/games' + '?name=' + name + '&key=' + BACKEND_KEY)
    .then(response => {
      return response.data.result.games
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const getGames = (age, symptom, system, gender) => {
  let requestString =
    BACKEND_URL + '/games' + '?age=' + age + '&symptom=' + symptom + '&key=' + BACKEND_KEY
  if (system && system.localeCompare('Console Type') != 0) {
    requestString = requestString + '&system=' + system
  }
  if (gender && gender.localeCompare('Character Gender') != 0) {
    requestString = requestString + '&gender=' + gender
  }
  return axios
    .get(requestString)
    .then(response => {
      return response.data.result.games
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const getAllGames = () => {
  let requestString = BACKEND_URL + '/games/all?key=' + BACKEND_KEY
  return axios
    .get(requestString)
    .then(response => {
      return response.data.result.games
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}

export const getIncompleteGames = () => {
  let requestString = BACKEND_URL + '/games/incomplete?key=' + BACKEND_KEY
  return axios
    .get(requestString)
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
  data.set('key', BACKEND_KEY)

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

export const editGame = (gameId, description, image) => {
  let data = new FormData()
  data.set('key', BACKEND_KEY)
  data.append('description', description)
  data.append('image', image)
  let requestString = BACKEND_URL + '/games/' + gameId
  return axios
    .put(requestString, data)
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

export const getUpdates = () => {
  let requestString = BACKEND_URL + '/updates?key=' + BACKEND_KEY
  return axios
    .get(requestString)
    .then(response => {
      return response.data.result.updates
    })
    .catch(error => {
      console.log('ERROR: ', error)
      return null
    })
}
