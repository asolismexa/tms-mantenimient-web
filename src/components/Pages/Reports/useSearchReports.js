import { useState } from 'react'
import { baseUrl as baseReportsUrl } from '@/services/reports'
import api from '@/api/api'

export const useSearchReports = ({ params = {}, pageSize = 1000 }) => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 0,
    start: 0,
    end: pageSize,
    pageCount: 0,
    pageSize: pageSize,
  })

  const searchReports = async () => {
    setLoading(true)
    try {
      const response = await api.get(baseReportsUrl, {
        params: {
          start: pagination.start,
          end: pagination.end,
          ...params,
        },
        headers: {
          sort: '-time',
        },
      })
      const data = response.data
      const totalPages = JSON.parse(
        response.headers['x-pagination'],
      ).total_pages
      setPagination((prev) => ({ ...prev, pageCount: totalPages }))
      setReports(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { reports, loading, error, searchReports, pagination, setPagination }
}
