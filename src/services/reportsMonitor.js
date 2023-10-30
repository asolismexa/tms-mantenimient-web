import { mapReportsResponse } from '@/utils/maps'

const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}/reports/monitor`
const getToken = () => window.App?.token && `Bearer ${window.App.token}`

export async function fetchReportsMonitor () {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        Authorization: getToken()
      }
    })

    const data = await response.json()
    return mapReportsResponse(data)
  } catch (error) {
    return []
  }
}
