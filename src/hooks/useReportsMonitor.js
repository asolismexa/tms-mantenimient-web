import { useState, useEffect } from 'react'
import { fetchReportsMonitor } from '@/services/reports'

export function useReportsMonitor () {
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState([])

  const syncMonitor = () => {
    setLoading(true)
    fetchReportsMonitor()
      .then(setReports)
      .finally(() => setLoading(true))
  }

  useEffect(() => {
    syncMonitor()
  }, [])

  return { reports, loading, syncMonitor }
}
