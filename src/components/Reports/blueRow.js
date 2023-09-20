export const blueRow = {
  status_id: 1,
  status: 'REPORTADO',
  report_type_id: 3,
  report_type: 'SISTEMA ELÉCTRICO',
  number: '1432200923',
  driver_id: null,
  driver: null,
  vehicle_id: 467,
  vehicle: '0',
  vehicle_type_id: 1,
  vehicle_assigned_id: null,
  vehicle_assinged: null,
  cell_id: null,
  cell: null,
  user_id: 629,
  user: 'CH-ARO-MX - KARLA MARIA MARTINEZ SANCHEZ',
  time: null,
  created_on: null,
  updated_on: null,
  created_by_id: 629,
  created_by: 'kmartinezs',
  updated_by_id: null,
  updated_by: null,
  latitude: -99.23197,
  longitude: 19.76408,
  evidences: null,
  observations: null,
  geofence_id: 14477,
  geofence: 'TERMINAL MA TEOLOYUCAN',
  address: '',
  location: 'TERMINAL MA TEOLOYUCAN',
  assigned_by_id: null,
  assigned_by: null,
  assigned_on: null,
  attended_by_id: null,
  attended_by: null,
  attended_on: null,
  validated_by_id: null,
  validated_by: null,
  validated_on: null,
  ot: null,
  validated_success: null,
  shipment_id: null,
  has_evidences: false,
  has_observations: true,
  process_by: null,
  process_by_id: null,
  process_on: null,
  canceled_by: null,
  canceled_by_id: null,
  canceled_on: null,
  odometer: 0,
  last_observation: '',
  ot_date: null,
  ot_initial_date: null,
  ot_promise_date: null,
  id: 0,
  is_consolidated_row: false,
  total_rows: 0,
  row_color: 'blue',
}

export const setAggregatedRow = (reports = []) => {
  const aggregatedRow = {
    ...blueRow,
  }
  aggregatedRow.total_rows = reports.length

  // Get all unique vehicles
  const vehiclesSet = new Set()
  reports.forEach((report) => {
    vehiclesSet.add(report.vehicle)
  })
  aggregatedRow.vehicle = vehiclesSet.size

  aggregatedRow.odometer = ''

  // GET all unique drivers
  const driverSet = new Set()
  reports.forEach((report) => {
    if (!report.driver) return
    driverSet.add(report.driver)
  })
  aggregatedRow.driver = driverSet.size

  // Get all unique cell
  const cellSet = new Set()
  reports.forEach((report) => {
    if (!report.cell) return
    cellSet.add(report.cell)
  })
  aggregatedRow.cell = cellSet.size

  //Get all unique shipment
  const shipmentSet = new Set()
  reports.forEach((report) => {
    if (!report.shipment_id) return
    shipmentSet.add(report.shipment_id)
  })
  aggregatedRow.shipment_id = shipmentSet.size

  //Get all unique shipment
  const otSet = new Set()
  reports.forEach((report) => {
    if (!report.ot) return
    otSet.add(report.ot)
  })
  aggregatedRow.ot = otSet.size

  // Get all unique status count
  const statusSet = new Set()
  reports.forEach((report) => {
    statusSet.add(report.status_id)
  })
  aggregatedRow.status = statusSet.size

  // Get all report type count
  const reportTypeSet = new Set()
  reports.forEach((report) => {
    reportTypeSet.add(report.report_type_id)
  })
  aggregatedRow.report_type = reportTypeSet.size

  // Get count of reports with observations
  aggregatedRow.has_observations = reports.filter(
    (report) => report.has_observations,
  ).length

  // Get count of reports with evidences
  aggregatedRow.has_evidences = reports.filter(
    (report) => report.has_evidences,
  ).length

  // Get user unique count
  const userSet = new Set()
  reports.forEach((report) => {
    userSet.add(report.user)
  })
  aggregatedRow.user = userSet.size

  return aggregatedRow
}
