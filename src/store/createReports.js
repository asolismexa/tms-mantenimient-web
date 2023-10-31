import { fetchVehicleDetail } from '@/services/vehicles'
import { create } from 'zustand'

const initialState = {
  vehicle: null,
  detail: null,
  isDialogOpen: false,
  isDialogAddNewReportItemOpen: false,
  loadingVehicleDetail: false,
  newReports: []
}

export const useCreateReportsStore = create((set) => ({
  ...initialState,
  openDialog: () => {
    set({ isDialogOpen: true })
  },
  closeDialog: () => {
    set({ isDialogOpen: false })
  },
  selectVehicle: (vehicle) => {
    if (!vehicle) {
      set({ vehicle: null, detail: null })
      return
    }
    set({ vehicle, loadingVehicleDetail: true })
    fetchVehicleDetail(vehicle.id)
      .then((data) => set({ detail: data }))
      .finally(() => set({ loadingVehicleDetail: false }))
  },
  addNewReportItem: (newReport) => {
    set((state) => ({ newReports: [...state.newReports, newReport] }))
  },
  removeNewReportItem: (itemId) => set((state) => {
    const newReports = state.newReports.filter((item) => item.id !== itemId)
    return { ...state, newReports }
  }),
  openNewReportItemDialog: () => {
    set({ isDialogAddNewReportItemOpen: true })
  },
  closeNewReportItemDialog: () => {
    set({ isDialogAddNewReportItemOpen: false })
  },
  resetState: () => {
    set(structuredClone(initialState))
  }
}))
