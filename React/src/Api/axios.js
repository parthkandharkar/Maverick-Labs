import axios from 'axios';
const instance = axios.create({
    // baseURL: 'http://192.168.0.221:8000'
    baseURL: 'http://localhost:8000'
  })

  instance.defaults.xsrfHeaderName = "x-csrftoken"
  instance.defaults.withCredentials = true


  export default instance