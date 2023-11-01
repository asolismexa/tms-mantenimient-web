import { getToken } from '@/services/reports'
const baseUrl = `${import.meta.env.VITE_BASE_API_URL}/api/reports/observations`

/**
 * Creates a new report observation
 * @param {ReportObservation} reportObservation
 * @typedef {Object} ReportObservation
 * @property {number} reportId - The report id
 * @property {string} observationText - The content of the observation
 */
export async function createNewReportObservation (reportObservation) {
  try {
    const resp = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({
        report_id: reportObservation.reportId,
        observation_text: reportObservation.observationText
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      }
    })

    const data = await resp.json()

    return data
  } catch (error) {
    console.log(error)
  }
}
