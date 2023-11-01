import api from '@/api/api'
import { mapReport } from '@/utils/maps'

export const baseUrl = 'api/reports'
export const baseAliveUrl = 'api/reports/alive'
export const getToken = () => window.App?.token && `Bearer ${window.App.token}`
export function getBaseUrl () {
  return `${import.meta.env.VITE_BASE_API_URL}/${baseUrl}`
}

export const postReports = async (report) => {
  const resp = await api.post(baseUrl, report, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return resp
}

export const getReportById = async (reportId) => {
  const resp = await api.get(`${baseUrl}/${reportId}`)
  return resp.data
}

export const postReportObservation = async (data) => {
  const resp = await api.post(`${baseUrl}/observations`, data)
  return resp.data
}

export const fetchReportById = async (reportId) => {
  const resp = await api.get(`${baseUrl}/${reportId}`)
  return resp.data
}

export const assignOt = async ({ reportId, data }) => {
  const resp = await api.put(`${baseUrl}/${reportId}/assign-ot`, data)
  return resp.data
}

export const attendReport = async ({ reportId }) => {
  const resp = await api.put(`${baseUrl}/${reportId}/attended`)
  return resp.data
}

export const validateReport = async ({ reportId, data }) => {
  const resp = await api.put(`${baseUrl}/${reportId}/validated`, data)
  return resp.data
}

export const fetchReports = ({ params = {} }) => {
  const config = {
    params
  }

  return api.get(baseUrl, config)
}

export const uploadEvidence = async ({ reportId, data }) => {
  const formData = new FormData()
  formData.append('report_id', reportId)
  for (const evidence of data) {
    formData.append(evidence.name, evidence)
  }

  const resp = await api.post(`${baseUrl}/evidences`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return resp.data
}

export const assignDriver = async (reportId, driverId) => {
  const resp = await api.put(`${baseUrl}/${reportId}/assign-driver`, {
    driverId
  })
  return resp.data
}

export async function assignReportsToOt ({ ot, reports = [] }) {
  const assigned = []
  for (const report of reports) {
    try {
      const resp = await fetch(`${getBaseUrl()}/${report.id}/assign-ot`, {
        method: 'PUT',
        body: JSON.stringify({
          ot_folio: ot
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken()
        }
      })
      assigned.push({
        id: report.id,
        error: !resp.ok ? await resp.text() : null
      })
    } catch (error) {
      console.log('Ocurrio un error!')
    }
  }

  return assigned
}

/**
 * Creates a report
 * @param {Object} report the report to create
 * @returns the id of the created report
 */
export async function createReport (report) {
  try {
    const formdata = new FormData()
    formdata.append('vehicle_id', report.vehicleId)
    formdata.append('report_type_id', report.reportTypeId)
    formdata.append('observation', report.observation)
    formdata.append('driver_id', report.driverId ?? '')
    formdata.append('shipment_id', report.shipment ?? '')
    report.evidences.forEach((evidence) => {
      formdata.append('', evidence)
    })

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: getToken()
      },
      body: formdata,
      redirect: 'follow'
    }

    const response = await fetch(getBaseUrl(), requestOptions)
    return await response.json()
  } catch (error) {
    console.log('Error al crear reporte', error)
  }
}

/**
 * Posts the reports to the database
 * @param {Object} reports the reports to post.
 * @returns an array containing the ids of the created reports.
 */
export async function createReportsService (reports) {
  try {
    return await Promise.all(reports.map(report => createReport(report)))
  } catch (error) {
    console.log('Error al crear reportes', error)
  }
}

/**
 * Fetches the report data of the passed id.
 * @param {number} reportId the id of the report to retrieve.
 */
export async function fetchReportDetailById (reportId) {
  try {
    const response = await fetch(`${getBaseUrl()}/${reportId}`, {
      headers: {
        Authorization: getToken()
      }
    })
    return mapReport(await response.json())
  } catch (error) {
    throw new Error('No se pudo recuperar la informacion del reporte', error)
  }
}

/**
 * Updates a report to bind with the folio of the OT
 * @param {number} otFolio the folio of the ot to be assigned
 * @param {number} reportId the report to assing the ot
 * @returns an success and a message values
 */
export async function assingReportOt (otFolio, reportId) {
  try {
    const response = await fetch(`${getBaseUrl()}/${reportId}/assign-ot`, {
      method: 'PUT',
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ot_folio: otFolio
      })
    })

    return { success: response.ok, message: await response.text() }
  } catch (error) {
    throw new Error('No se pudo asignar la OT', error)
  }
}

/**
 * Updates a report to bind with the folio of the OT
 * @param {number} otFolio the folio of the ot to be assigned
 * @param {number} reportId the report to assing the ot
 * @returns an success and a message values
 */
export async function assingReportDriver (driverId, reportId) {
  try {
    const response = await fetch(`${getBaseUrl()}/${reportId}/assign-driver`, {
      method: 'PUT',
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        driverId
      })
    })

    return { success: response.ok, message: await response.text() }
  } catch (error) {
    throw new Error('No se pudo asignar el operador', error)
  }
}
