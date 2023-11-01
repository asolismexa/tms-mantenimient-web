import { assingReportOt, assingReportDriver, fetchReportDetailById } from '@/services/reports'
import { create } from 'zustand'

/**
 * Report detail store
 */
export const useReportDetailStore = create((set) => ({
  report: null,
  loading: false,
  dialogTab: 0,
  errorMessage: null,
  isDetailDialogOpened: false,
  getReportDetail: (reportId) => {
    set({ loading: true })
    fetchReportDetailById(reportId)
      .then(report => set({ report }))
      .finally(() => set({ loading: false }))
  },
  openDialog: () => set({ isDetailDialogOpened: true }),
  closeDialog: () => set({ isDetailDialogOpened: false }),
  unselectReport: () => set({ report: null }),
  setDialogTab: (tabIndex) => set({ dialogTab: tabIndex }),
  assingOt: (otFolio, reportId) => {
    set({ loading: true })
    return assingReportOt(otFolio, reportId)
      .then(({ success, message }) => {
        if (!success) {
          set({ errorMessage: message })
          setTimeout(() => set({ errorMessage: null }), 7000)
          return
        }
        set({ errorMessage: null })
      })
      .finally(() => set({ loading: false }))
  },
  assignDriver: (driverId, reportId) => {
    set({ loading: true })
    return assingReportDriver(driverId, reportId)
      .then(({ success, message }) => {
        if (!success) {
          set({ errorMessage: message })
          setTimeout(() => set({ errorMessage: null }), 7000)
          return
        }
        set({ errorMessage: null })
      })
      .finally(() => set({ loading: false }))
  }
}))
