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
  evaluatedCount: 0
})

export function getAggregations ({ reports = [] }) {
  const aggregations = { ...initialAggregations }

  aggregations.totalCount = reports.length

  const vehicleSet = new Set(reports.map((r) => r.vehicleId))
  aggregations.vehicleCount = vehicleSet.size

  const vehicleTypeSet = new Set(reports.map((r) => r.vehicleTypeId))
  aggregations.vehicleTypeCount = vehicleTypeSet.size

  const driverSet = new Set(
    reports.filter((r) => r.driver !== null).map((r) => r.driverId)
  )
  aggregations.driversCount = driverSet.size

  const cellSet = new Set(
    reports.filter((r) => r.cell !== null).map((r) => r.cellId)
  )
  aggregations.cellCount = cellSet.size

  const shipmentSet = new Set(
    reports.filter((r) => r.shipmentId !== null).map((r) => r.shipmentId)
  )
  aggregations.shipmentCount = shipmentSet.size

  const otSet = new Set(reports.filter((r) => r.ot !== null).map((r) => r.ot))
  aggregations.otCount = otSet.size

  const statusSet = new Set(reports.map((r) => r.statusId))
  aggregations.statusCount = statusSet.size

  const typesSet = new Set(reports.map((r) => r.reportTypeId))
  aggregations.reportTypeCount = typesSet.size

  aggregations.evidencesCount = reports.filter((r) => r.hasEvidences).length

  const usersSet = new Set(reports.map((r) => r.userId))
  aggregations.userCount = usersSet.size

  const userProcessSet = new Set(
    reports.filter((r) => r.processById !== null).map((r) => r.processById)
  )
  aggregations.userProcessCount = userProcessSet.size

  const usersAssingSet = new Set(
    reports.filter((r) => r.assignedBy !== null).map((r) => r.assignedBy)
  )
  aggregations.userAssignCount = usersAssingSet.size

  const usersFinishSet = new Set(
    reports.filter((r) => r.attendedBy !== null).map((r) => r.attendedBy)
  )
  aggregations.usersFinishCount = usersFinishSet.size

  const usersCancelsSet = new Set(
    reports.filter((r) => r.canceledBy !== null).map((r) => r.canceledBy)
  )
  aggregations.usersCancelsCount = usersCancelsSet.size

  const usersEvalutesSet = new Set(
    reports.filter((r) => r.validatedBy !== null).map((r) => r.validatedBy)
  )
  aggregations.usersEvaluateCount = usersEvalutesSet.size

  aggregations.evaluatedSuccess = reports.filter(
    (r) => r.validatedSuccess === true
  ).length

  aggregations.evaluatedFail = reports.filter(
    (r) => r.validatedSuccess === false
  ).length

  aggregations.evaluatedCount = reports.filter(
    (r) => r.validatedSuccess !== null
  ).length

  return aggregations
}
