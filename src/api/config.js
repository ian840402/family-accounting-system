import axios from 'axios'
import router from 'vue-router'

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://family-accounting-system.herokuapp.com/'
  : 'http://localhost:27001/'

const axiosInstance = axios.create({
  baseURL,
  timeout: 10 * 1000
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = { Authorization: 'Bearer 596184' }
  return config
}, (error) => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  const { response } = error
  console.log(error)
  if (response.status === 404) {
    router.replace('/404')
  }
  return Promise.reject(error)
})

export default axiosInstance
