import { assignReportsToOt } from '@/services/reports'
import { useState, useEffect } from 'react'

export function useAssignReports ({ ids = [], reports = [] }) {
  const [selectedReports, setSelectedReports] = useState(ids)
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState([])

  useEffect(() => {
    const idsSet = new Set(ids)
    setSelectedReports(reports.filter((report) => idsSet.has(report.id)))
  }, [ids, reports])

  const assingReports = async ({ ot }) => {
    setLoading(true)
    setResponses([])
    const assigned = await assignReportsToOt({
      ot,
      reports: selectedReports
    })
    setResponses(assigned)
    setLoading(false)
  }

  return {
    loading,
    responses,
    selectedReports,
    assingReports
  }
}
