import { useFilters } from '@/hooks/useFilters'
import { setFilters } from '@/reducers/reportMonitorSlice'
import { useState, useEffect } from 'react'

export function useFilterReports({ initialFilters, reports }) {
  const { filters, onFilterChange } = useFilters({
    initialState: initialFilters,
  })
  const [filteredReports, setFilteredReports] = useState([])

  const getFilteredReports = () => {
    const folio = filters.folio.trim()
    const vehicle = filters.vehicle.trim()
    const vehicleType = filters.vehicleType
    const odometer = filters.odometer
    const driver = filters.driver.toUpperCase()
    const cell = filters.cell
    const shipment = filters.shipment.toUpperCase()
    const ot = filters.ot.toUpperCase()
    const status = filters.status
    const reportType = filters.reportType
    // const user = filters.user.toLowerCase()
    // const userAssign = filters.userAssign.toLowerCase()
    // const userProcess = filters.userProcess.toLowerCase()

    let filtered = [...reports]

    // By Folio
    filtered = reports.filter((report) => {
      return filters.folio === '' || report.id.toString().includes(folio)
    })

    // By Vehicle
    filtered = filtered.filter((report) => {
      return filters.vehicle === '' || report.vehicle.includes(vehicle)
    })

    // By Vehicle Type
    filtered = filtered.filter((report) => {
      return vehicleType == 0 || report.vehicle_type_id == vehicleType
    })

    // By Odometer
    filtered = filtered.filter((report) => {
      return (
        Boolean(!odometer) || report.odometer?.toString().includes(odometer)
      )
    })

    // By Cell Id
    filtered = filtered.filter((report) => {
      return cell == 0 || report.cell_id == cell
    })

    //By Status
    filtered = filtered.filter((report) => {
      return status == 0 || report.status_id == status
    })

    // By Driver
    filtered = filtered.filter((report) => {
      return filters.driver === '' || report?.driver?.includes(driver)
    })

    // By Shipment
    filtered = filtered.filter((report) => {
      const shipement_id = report?.shipment_id?.toString()
      return filters.shipment === '' || shipement_id?.includes(shipment)
    })

    // By OT
    filtered = filtered.filter((report) => {
      const ot_id = report?.ot?.toString()
      return filters.ot === '' || ot_id?.includes(ot)
    })

    // // By Report Type
    // filtered = filtered.filter((report) => {
    //   return reportType == 0 || report.report_type_id == reportType
    // })

    // // By User
    // filtered = filtered.filter((report) => {
    //   return filters.user === '' || report?.user?.toLowerCase()?.includes(user)
    // })

    // // By User Assign
    // filtered = filtered.filter((report) => {
    //   return (
    //     filters.userAssign === '' ||
    //     report?.assigned_by?.toLowerCase()?.includes(userAssign)
    //   )
    // })

    // // By Use Process
    // filtered = filtered.filter((report) => {
    //   return (
    //     filters.userProcess === '' ||
    //     report?.process_by?.toLowerCase().includes(userProcess)
    //   )
    // })

    setFilteredReports([...filtered])
  }

  const clearFilters = () => setFilters({ ...initialFilters })

  useEffect(getFilteredReports, [filters, reports])

  return { filters, onFilterChange, clearFilters, filteredReports }
}
