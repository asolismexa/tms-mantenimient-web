/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react'

const initialFilters = {
  folio: '',
  vehicle: '',
  odometer: '',
  driver: '',
  cell: 0,
  vehicleType: '',
  shipment: '',
  ot: '',
  status: '',
  reportType: 0,
  hasEvidences: false,
  user: '',
  assignedBy: '',
  processBy: '',
  vehicleCurrentLocationId: 0
}

export function useReportsMonitorFilters ({ reports }) {
  const [filters, setFilters] = useState({ ...initialFilters })

  const onFilterChange = (filterName, newValue) => {
    setFilters({ ...filters, [filterName]: newValue })
  }

  const clearFilters = () => setFilters({ ...initialFilters })

  const [filteredReports, setFilteredReports] = useState([])

  const getFilteredReports = () => {
    const folio = filters.folio.trim()
    const vehicle = filters.vehicle.trim().toUpperCase()
    const vehicleType = filters.vehicleType
    const odometer = filters.odometer
    const driver = filters.driver.toUpperCase()
    const cell = filters.cell
    const shipment = filters.shipment.toUpperCase()
    const ot = filters.ot.toUpperCase()
    const status = filters.status
    const reportType = filters.reportType
    const hasEvidencesFilter = filters.hasEvidences
    const user = filters.user.toLowerCase()
    const assignedBy = filters.assignedBy.toLowerCase()
    const processBy = filters.processBy.toLowerCase()

    let filtered = [...reports]

    // By Folio
    filtered = reports.filter((report) => {
      return filters.folio === '' || report.id.toString().includes(folio)
    })

    // By Vehicle
    filtered = filtered.filter((report) => {
      return filters.vehicle.toUpperCase() === '' || report.vehicle.includes(vehicle)
    })

    // By Vehicle Type
    filtered = filtered.filter((report) => {
      return vehicleType == 0 || report.vehicleTypeId == vehicleType
    })

    // By Odometer
    filtered = filtered.filter((report) => {
      return (
        Boolean(!odometer) || report.odometer?.toString().includes(odometer)
      )
    })

    // By Driver
    filtered = filtered.filter((report) => {
      return filters.driver === '' || report?.driver?.includes(driver)
    })

    // By Cell Id
    filtered = filtered.filter((report) => {
      return cell == 0 || report.cellId == cell
    })

    // By Status
    filtered = filtered.filter((report) => {
      return status == 0 || report.statusId == status
    })

    // By Shipment
    filtered = filtered.filter((report) => {
      const shipmentId = report?.shipmentId?.toString()
      return filters.shipment == '' || shipmentId?.includes(shipment)
    })

    // By OT
    filtered = filtered.filter((report) => {
      const otId = report?.ot?.toString()
      return filters.ot == '' || otId?.includes(ot)
    })

    // By Report Type
    filtered = filtered.filter((report) => {
      return reportType == 0 || report.reportTypeId == reportType
    })

    // Has Evidence
    if (hasEvidencesFilter) {
      filtered = filtered.filter((report) => {
        return report.hasEvidences
      })
    }

    // By User
    filtered = filtered.filter((report) => {
      return filters.user === '' || report?.user?.toLowerCase()?.includes(user)
    })

    // By User Assign
    filtered = filtered.filter((report) => {
      return (
        filters.assignedBy === '' ||
        report?.assignedBy?.toLowerCase()?.includes(assignedBy)
      )
    })

    // By User Process
    filtered = filtered.filter((report) => {
      return (
        filters.processBy === '' ||
        report?.processBy?.toLowerCase().includes(processBy)
      )
    })

    // By terminal Id
    filtered = filtered.filter((report) => {
      console.log(filters.vehicleCurrentLocationId)
      return (
        filters.vehicleCurrentLocationId == 0 ||
        report.vehicleCurrentLocationId == filters.vehicleCurrentLocationId
      )
    })

    setFilteredReports([...filtered])
  }

  useEffect(getFilteredReports, [filters, reports])

  return { filters, onFilterChange, clearFilters, filteredReports }
}
