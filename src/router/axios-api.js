
import axios from 'axios'
// import Cookies from 'js-cookie'

const getAPI = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
  }
  // withCredentials: false

})

export { getAPI }
