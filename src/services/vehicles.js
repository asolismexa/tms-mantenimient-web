import api from '@/api/api'
import { getToken } from './reports'

export const baseUrl = 'api/vehicles'
export const vehiclesBaseUrl = `${api.defaults.baseURL}/${baseUrl}`

export const fetchVehicles = () => {
  return api.get(baseUrl)
}

export const getVehicleById = (id) => {
  return api.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  })
}
