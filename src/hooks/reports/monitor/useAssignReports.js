import { useState, useEffect } from 'react'

export function useAssignReports({ ids = [], reports = [] }) {
  const [selectedReports, setSelectedReports] = useState(ids)

  useEffect(() => {
    const idsSet = new Set(ids)
    setSelectedReports(reports.filter((report) => idsSet.has(report.id)))
  }, [ids, reports])

  return { selectedReports }
}
