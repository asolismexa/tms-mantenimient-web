import api from '@/api/api'
import { mapReportsResponse } from '@/utils/maps'

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

export async function fetchReportsMonitor () {
  try {
    const response = await fetch(`${getBaseUrl()}/alive`, {
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
