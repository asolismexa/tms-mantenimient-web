export const mapReportsResponse = (response) => response.map((report) => ({
  statusId: report.status_id,
  status: report.status,
  reportTypeId: report.report_type_id,
  reportType: report.report_type,
  number: report.number,
  driverId: report.driver_id,
  driver: report.driver,
  vehicleId: report.vehicle_id,
  vehicle: report.vehicle,
  vehicleTypeId: report.vehicle_type_id,
  vehicleType: report.vehicle_type,
  vehicleAssignedId: report.vehicle_assigned_id,
  vehicleAssigned: report.vehicle_assigned,
  cellId: report.cell_id,
  cell: report.cell,
  userId: report.user_id,
  user: report.user,
  time: report.time,
  createdOn: report.created_on,
  updatedOn: report.updated_on,
  createdById: report.created_by_id,
  createdBy: report.created_by,
  updatedById: report.updated_by_id,
  updatedBy: report.updated_by,
  latitude: report.latitude,
  longitude: report.longitude,
  evidences: report.evidences,
  observations: report.observations,
  geofenceId: report.geofence_id,
  geofence: report.geofence,
  address: report.address,
  location: report.location,
  assignedById: report.assigned_by_id,
  assignedBy: report.assigned_by,
  assignedOn: report.assigned_on,
  attendedById: report.attended_by_id,
  attendedBy: report.attended_by,
  attendedOn: report.attended_on,
  validatedById: report.validated_by_id,
  validatedBy: report.validated_by,
  validatedOn: report.validated_on,
  ot: report.ot,
  validatedSuccess: report.validated_success,
  shipmentId: report.shipment_id,
  hasEvidences: report.has_evidences,
  hasObservations: report.has_observations,
  processBy: report.process_by,
  processById: report.process_by_id,
  processOn: report.process_on,
  canceledBy: report.canceled_by,
  canceledById: report.canceled_by_id,
  canceledOn: report.canceled_on,
  odometer: report.odometer,
  lastObservation: report.last_observation,
  otDate: report.ot_date,
  otInitialDate: report.ot_initial_date,
  otPromiseDate: report.ot_promise_date,
  id: report.id,
  isConsolidatedRow: report.is_consolidated_row,
  totalRows: report.total_rows,
  rowColor: report.row_color
}))