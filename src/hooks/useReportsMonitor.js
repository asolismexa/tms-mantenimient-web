import { useEffect } from 'react'
import { useReportsMonitorStore } from '@/store/reportsMonitor'

export function useReportsMonitor () {
  const [reports, loading, error, syncMonitor] = useReportsMonitorStore((state) => [
    state.reports,
    state.loading,
    state.error,
    state.syncMonitor
  ])

  useEffect(() => {
    syncMonitor()
  }, [syncMonitor])

  useEffect(() => {
    const intervalId = setInterval(syncMonitor, 120000)
    return () => {
      clearInterval(intervalId)
    }
  }, [syncMonitor])

  return { reports, loading, error, syncMonitor }
}
