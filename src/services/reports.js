import api from '@/api/api'

const baseUrl = 'api/reports'
export const getReports = async ({ params, headers }) => {
  const config = {
    params,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
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

export const postReports = async ({ data, headers }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      ...headers,
    },
  }
  try {
    const resp = await api.post(baseUrl, data, config)
    return { data: resp.data, resp, error: null }
  } catch (error) {
    return { data: null, resp: null, error: error }
  }
}

export const getReportById = async (reportId) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
  }

  try {
    const resp = await api.get(`${baseUrl}/${reportId}`, config)
    return { data: resp.data, resp, error: null }
  } catch (error) {
    return { data: null, resp: null, error: error }
  }
}
