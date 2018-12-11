const hostname = window && window.location && window.location.hostname
let backend_url

if (hostname === 'childs-play.herokuapp.com') {
  backend_url = 'https://childs-play-backend.herokuapp.com'
} else {
  backend_url = 'http://localhost:8080'
}

export default backend_url
