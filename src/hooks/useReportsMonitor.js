import { useState, useEffect } from 'react'
import { fetchReportsMonitor } from '@/services/reportsMonitor'

export function useReportsMonitor () {
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState([])
  const [error, setError] = useState(null)

  const syncMonitor = () => {
    setLoading(true)
    setError(null)
    fetchReportsMonitor()
      .then(setReports)
      .catch(() => setError('Error al cargar el monitor'))
      .finally(() => setLoading(false))
  }

  useEffect(syncMonitor, [])

  useEffect(() => {
    const intervalId = setInterval(syncMonitor, 120000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return { reports, loading, error, syncMonitor }
}
