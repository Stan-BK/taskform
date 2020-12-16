import axios from 'axios'
import store from '../store/index'

const service = axios.create({})

service.interceptors.request.use(
  config => {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
    store.state.token && (config.headers.token = store.state.token)
    return config
  },err => {
    return Promise.reject(err)
  }
)

export default service