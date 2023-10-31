import api from '@/api/api'
import { getToken } from './reports'
import { mapVehicleDetail, mapVehicleDetailResponse } from '@/utils/maps'

export const baseUrl = 'api/vehicles'
export const vehiclesBaseUrl = `${api.defaults.baseURL}/${baseUrl}`
export const groupsBaseUrl = `${vehiclesBaseUrl}/groups`

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
    if (!response.ok) throw new Error('No se pudo recuperar la infomracion de la unidad')
    const data = await response.json()
    return mapVehicleDetail(data)
  } catch {
    throw new Error('No se pudo recuperar la infomracion de la unidad')
  }
}
