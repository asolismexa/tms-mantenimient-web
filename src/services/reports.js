import api from '@/api/api'

export const baseUrl = 'api/reports'
export const getToken = () => window.App?.token && `Bearer ${window.App.token}`

export const getReports = async ({ params }) => {
  const config = {
    params,
  }

  try {
    const resp = await api.get(baseUrl, config)
    return { data: resp.data, resp, error: null }
  } catch (error) {
    return { data: null, resp: null, error: error }
  }
}

export const postReports = async (report) => {
  const resp = await api.post(baseUrl, report, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
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
    params,
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
      'Content-Type': 'multipart/form-data',
    },
  })

  return resp.data
}

export const assignDriver = async (reportId, driverId) => {
  const resp = await api.put(`${baseUrl}/${reportId}/assign-driver`, {
    driverId,
  })
  return resp.data
}
