let backend_url

if (process.env.NODE_ENV === "production") {
  backend_url = 'https://childs-play-backend.herokuapp.com'
} else {
  backend_url = 'http://localhost:8080'
}

export default backend_url
