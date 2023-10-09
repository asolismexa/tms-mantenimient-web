export const initialAggregations = Object.freeze({
  totalCount: 0,
  vehicleCount: 0,
  vehicleTypeCount: 0,
  driversCount: 0,
  cellCount: 0,
  shipmentCount: 0,
  otCount: 0,
  statusCount: 0,
  reportTypeCount: 0,
  evidencesCount: 0,
  userCount: 0,
  userAssignCount: 0,
  userProcessCount: 0,
  usersFinishCount: 0,
  usersCancelsCount: 0,
  usersEvaluateCount: 0,
  evaluatedSuccess: 0,
  evaluatedFail: 0,
  evaluatedCount: 0,
})

export function getAggregations({ reports = [] }) {
  const aggregations = { ...initialAggregations }

  aggregations.totalCount = reports.length

  const vehicleSet = new Set(reports.map((r) => r.vehicle_id))
  aggregations.vehicleCount = vehicleSet.size

  const vehicleTypeSet = new Set(reports.map((r) => r.vehicle_type_id))
  aggregations.vehicleTypeCount = vehicleTypeSet.size

  const driverSet = new Set(
    reports.filter((r) => r.driver !== null).map((r) => r.driver_id),
  )
  aggregations.driversCount = driverSet.size

  const cellSet = new Set(
    reports.filter((r) => r.cell !== null).map((r) => r.cell_id),
  )
  aggregations.cellCount = cellSet.size

  const shipmentSet = new Set(
    reports.filter((r) => r.shipment_id !== null).map((r) => r.shipment_id),
  )
  aggregations.shipmentCount = shipmentSet.size

  const otSet = new Set(reports.filter((r) => r.ot !== null).map((r) => r.ot))
  aggregations.otCount = otSet.size

  const statusSet = new Set(reports.map((r) => r.status_id))
  aggregations.statusCount = statusSet.size

  const typesSet = new Set(reports.map((r) => r.report_type_id))
  aggregations.reportTypeCount = typesSet.size

  aggregations.evidencesCount = reports.filter((r) => r.has_evidences).length

  const usersSet = new Set(reports.map((r) => r.user_id))
  aggregations.userCount = usersSet.size

  const userProcessSet = new Set(
    reports.filter((r) => r.process_by_id !== null).map((r) => r.process_by_id),
  )
  aggregations.userProcessCount = userProcessSet.size

  const usersAssingSet = new Set(
    reports.filter((r) => r.assigned_by !== null).map((r) => r.assigned_by),
  )
  aggregations.userAssignCount = usersAssingSet.size

  const usersFinishSet = new Set(
    reports.filter((r) => r.attended_by !== null).map((r) => r.attended_by),
  )
  aggregations.usersFinishCount = usersFinishSet.size

  const usersCancelsSet = new Set(
    reports.filter((r) => r.canceled_by !== null).map((r) => r.canceled_by),
  )
  aggregations.usersCancelsCount = usersCancelsSet.size

  const usersEvalutesSet = new Set(
    reports.filter((r) => r.validated_by !== null).map((r) => r.validated_by),
  )
  aggregations.usersEvaluateCount = usersEvalutesSet.size

  aggregations.evaluatedSuccess = reports.filter(
    (r) => r.validated_success === true,
  ).length

  aggregations.evaluatedFail = reports.filter(
    (r) => r.validated_success === false,
  ).length

  aggregations.evaluatedCount = reports.filter(
    (r) => r.validated_success !== null,
  ).length

  return aggregations
}
