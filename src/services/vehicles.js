import api from '@/api/api'
import { getToken } from './reports'
import { mapVehicleDetail } from '@/utils/maps'

export const baseUrl = 'api/vehicles'
export const vehiclesBaseUrl = `${api.defaults.baseURL}/${baseUrl}`
export const groupsBaseUrl = `${vehiclesBaseUrl}/groups`
export const vehicleEventsUrl = `${vehiclesBaseUrl}/events`

function getBaseUrl () {
  return `${import.meta.env.VITE_BASE_API_URL}/${baseUrl}`
}

export const fetchVehicles = () => {
  return api.get(baseUrl)
}

export const getVehicleById = (id) => {
  return api.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: getToken()
    }
  })
}

export const fetchGroups = () => {
  return api.get(`${baseUrl}/groups`)
}

export async function fetchVehicleDetail (vehicleId) {
  try {
    const response = await fetch(`${getBaseUrl()}/${vehicleId}`, {
      headers: {
        Authorization: getToken()
      }
    })
    const data = await response.json()
    return mapVehicleDetail(data)
  } catch (error) {
    throw new Error('No se pudo recuperar la infomracion de la unidad', error)
  }
}
