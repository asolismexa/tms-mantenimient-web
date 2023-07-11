import axios from 'axios'

export const getToken = () => window.App?.token && `Bearer ${window.App.token}`

const api = axios.create({
  baseURL: import.meta.env['VITE_BASE_API_URL'],
})

api.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
      Authorization: getToken(),
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default api
