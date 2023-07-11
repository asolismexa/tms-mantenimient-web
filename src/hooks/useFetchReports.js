import { useState, useEffect } from 'react'
import { baseUrl as baseReportsUrl } from '@/services/reports'
import api from '@/api/api'

const useFetchReports = ({ pageSize = 1000 }) => {
  const [refreshData, setRefresh] = useState(false)
  const [reports, setReports] = useState([])
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 0,
    start: 0,
    end: pageSize,
    pageCount: 0,
    pageSize: pageSize,
  })

  useEffect(() => {
    const fetchReports = () => {
      setloading(true)
      api
        .get(baseReportsUrl, {
          params: {
            start: pagination.start,
            end: pagination.end,
          },
          headers: {
            sort: '-time',
          },
        })
        .then((res) => {
          setReports(res.data)
          const totalPages = JSON.parse(res.headers['x-pagination']).total_pages
          setPagination((prev) => ({ ...prev, pageCount: totalPages }))
          setError('')
        })
        .catch((err) => {
          setError(err.message)
        })
        .finally(() => {
          setloading(false)
        })
    }

    fetchReports()
    const reportsInterval = setInterval(fetchReports, 60000)

    return () => clearInterval(reportsInterval)
  }, [pagination.end, pagination.start, refreshData])

  return { reports, loading, error, pagination, setPagination, setRefresh }
}

export default useFetchReports
