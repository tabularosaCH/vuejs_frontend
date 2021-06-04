import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.timeout = 5000
// axios.defaults.withCredentials = true

createApp(App)
  .use(store)
  .use(router, axios) // .use(router, axios)
  .mount('#app')
