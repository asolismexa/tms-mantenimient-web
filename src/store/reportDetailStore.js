import { fetchReportDetailById } from '@/services/reports'
import { create } from 'zustand'

/**
 * Report detail store
 */
export const useReportDetailStore = create((set) => ({
  report: null,
  loading: false,
  dialogTab: 0,
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
  setDialogTab: (tabIndex) => set({ defaultTab: tabIndex })
}))
