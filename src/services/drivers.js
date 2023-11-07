import api, { getToken } from '@/api/api'
import { mapDriverEvents } from '@/utils/maps'

const baseUrl = `${api.defaults.baseURL}/api/drivers`
export const DRIVER_EVENTS_URL = `${baseUrl}/events`

/**
 * Fetches driver events from the API.
 * @returns {Promise<Array>} An array of driver events.
 */
export async function fetchDriverEvents () {
  try {
    const options = {
      method: 'GET',
      headers: {
        Authorization: getToken()
      }
    }
    const response = await fetch(DRIVER_EVENTS_URL, options)
    return mapDriverEvents(await response.json())
  } catch (error) {
    console.error(error)
  }
}
