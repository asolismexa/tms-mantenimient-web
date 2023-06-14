import axios from 'axios'
import { logOutUser } from '@/reducers/authSlice'
import { store } from '@/store'

const api = axios.create({
  baseURL: import.meta.env['VITE_BASE_API_URL'],
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status == 401) {
      console.log('Unauthorized')
      store.dispatch(logOutUser())
    }

    return Promise.reject(error)
  },
)

export default api
