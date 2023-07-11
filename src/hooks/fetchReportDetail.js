import { useState, useEffect } from 'react'
import { fetchReportById } from '@/services/reports'

export const useFetchReportDetail = () => {
  const [loadingReportDetail, setLoadingReport] = useState(false)
  const [reportDetail, setReportDetail] = useState(null)
  const [errorReportDetail, setErrorReport] = useState(null)
  const [reportId, setReportId] = useState(null)
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [refreshDetail, setRefreshDetail] = useState(false)

  const openDetail = () => setOpenModalDetail(true)
  const closeDetail = () => {
    setOpenModalDetail(false)
    setReportId(null)
    setReportDetail(null)
  }
  const refreshReportDetail = () => setRefreshDetail((prev) => !prev)

  useEffect(() => {
    if (!reportId) return
    setLoadingReport(true)
    fetchReportById(reportId)
      .then((data) => setReportDetail(data))
      .catch((err) => setErrorReport(err))
      .finally(() => setLoadingReport(false))
  }, [reportId, refreshDetail])

  return {
    reportDetail,
    loadingReportDetail,
    errorReportDetail,
    setReportId,
    openDetail,
    closeDetail,
    openModalDetail,
    refreshReportDetail,
  }
}
