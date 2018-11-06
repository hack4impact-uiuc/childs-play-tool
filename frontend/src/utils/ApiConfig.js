const hostname = window && window.location && window.location.hostname
let backend_url

if (hostname === 'h4i-childs-play-frontend.now.sh') {
  backend_url = 'https://h4i-childs-play-backend.now.sh'
} else {
  backend_url = 'http://localhost:8080'
}

export default backend_url