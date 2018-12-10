const hostname = window && window.location && window.location.hostname
let backend_url

if (hostname === 'h4i-childs-play.now.sh') {
  backend_url = 'https://childs-play-backend.herokuapp.com'
} else {
  backend_url = 'http://localhost:8080'
}

export default backend_url
