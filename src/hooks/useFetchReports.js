import { useState, useEffect } from 'react'
import { baseUrl as baseReportsUrl, getToken } from '@/services/reports'
import api from '@/api/api'

const useFetchReports = (params = null) => {
  const [reports, setReports] = useState([])
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)

  useEffect(() => {
    api
      .get(baseReportsUrl, {
        params,
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        setReports(res.data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setloading(false)
      })
  }, [params])

  return { reports, loading, error }
}

export default useFetchReports
