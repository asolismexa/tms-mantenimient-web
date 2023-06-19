import api from '@/api/api'

const baseUrl = 'api/reports'
const getToken = () => `Bearer ${JSON.parse(localStorage.getItem('token'))}`
const baseHeaders = {
  'Content-Type': 'application/json',
  Authorization: getToken(),
}

export const getReports = async ({ params, headers }) => {
  const config = {
    params,
    headers: {
      ...baseHeaders,
      ...headers,
    },
  }
  try {
    const resp = await api.get(baseUrl, config)
    return { data: resp.data, resp, error: null }
  } catch (error) {
    return { data: null, resp: null, error: error }
  }
}

export const postReports = async ({ data }) => {
  const config = {
    headers: {
      ...baseHeaders,
      'Content-Type': 'multipart/form-data',
    },
  }
  const resp = await api.post(baseUrl, data, config)
  return { data: resp.data, resp }
}

export const getReportById = async (reportId) => {
  let config = {
    headers: {
      ...baseHeaders,
    },
  }

  try {
    const resp = await api.get(`${baseUrl}/${reportId}`, config)
    return { data: resp.data, resp, error: null }
  } catch (error) {
    return { data: null, resp: null, error: error }
  }
}

export const postReportObservation = async (data) => {
  let config = {
    headers: {
      ...baseHeaders,
    },
  }

  try {
    const resp = await api.post(`${baseUrl}/observations`, data, config)
    return { data: resp.data, resp, error: null }
  } catch (error) {
    return { data: null, resp: null, error: error }
  }
}
