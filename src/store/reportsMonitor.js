import { create } from 'zustand'
import { fetchReportsMonitor } from '@/services/reportsMonitor'

const initialState = {
  reports: [],
  selectedRows: [],
  loading: false,
  error: null
}

export const useReportsMonitorStore = create((set) => ({
  ...initialState,
  syncMonitor: async () => {
    set({ loading: true, error: null })
    try {
      const reports = await fetchReportsMonitor()
      set({ reports })
    } catch {
      set({ error: 'Error al cargar el monitor' })
    } finally {
      set({ loading: false })
    }
  },
  selectRows: (selectedRows) => set({ selectedRows })
}))
