/**
 * Maps a report response object to a simplified report object.
 * @param {Object} response - The report response object.
 * @returns {Object} The simplified report object.
 */
export const mapReport = (response) => ({
  statusId: response.status_id,
  status: response.status,
  reportTypeId: response.report_type_id,
  reportType: response.report_type,
  number: response.number,
  driverId: response.driver_id,
  driver: response.driver,
  driverStatusId: response?.driver_status_id,
  driverStatus: response?.driver_status,
  vehicleId: response.vehicle_id,
  vehicle: response.vehicle,
  vehicleStatus: response.vehicle_status,
  vehicleStatusId: response.vehicle_status_id,
  vehicleTypeId: response.vehicle_type_id,
  vehicleType: response.vehicle_type,
  vehicleAssignedId: response.vehicle_assigned_id,
  vehicleAssigned: response.vehicle_assinged,
  vehicleCurrentLocation: response.vehicle_current_location,
  vehicleCurrentLocationId: response.vehicle_current_location_id,
  cellId: response.cell_id,
  cell: response.cell,
  userId: response.user_id,
  user: response.user,
  time: response.time,
  createdOn: response.created_on,
  updatedOn: response.updated_on,
  createdById: response.created_by_id,
  createdBy: response.created_by,
  updatedById: response.updated_by_id,
  updatedBy: response.updated_by,
  latitude: response.latitude,
  longitude: response.longitude,
  evidences: response?.evidences?.map((evidence) => ({
    id: evidence.id,
    reportId: evidence.report_id,
    createdAt: evidence.created_on,
    link: evidence.mediaLink
  })) ?? [],
  observations: response?.observations?.map((obs) => ({
    id: obs.id,
    reportId: obs.reportId,
    userId: obs.userId,
    user: obs.user,
    observationText: obs.observation_text,
    createdAt: obs.time
  })) ?? [],
  geofenceId: response.geofence_id,
  geofence: response.geofence,
  address: response.address,
  location: response.location,
  assignedById: response.assigned_by_id,
  assignedBy: response.assigned_by,
  assignedOn: response.assigned_on,
  attendedById: response.attended_by_id,
  attendedBy: response.attended_by,
  attendedOn: response.attended_on,
  validatedById: response.validated_by_id,
  validatedBy: response.validated_by,
  validatedOn: response.validated_on,
  ot: response.ot,
  validatedSuccess: response.validated_success,
  shipmentId: response.shipment_id,
  hasEvidences: response.has_evidences,
  hasObservations: response.has_observations,
  processBy: response.process_by,
  processById: response.process_by_id,
  processOn: response.process_on,
  canceledBy: response.canceled_by,
  canceledById: response.canceled_by_id,
  canceledOn: response.canceled_on,
  odometer: response.odometer,
  lastObservation: response.last_observation,
  otDate: response.ot_date,
  otInitialDate: response.ot_initial_date,
  otPromiseDate: response.ot_promise_date,
  id: response.id,
  isConsolidatedRow: response.is_consolidated_row,
  totalRows: response.total_rows,
  rowColor: response.row_color
})

/**
 * Maps the response from the server to an array of reports.
 * @param {Array} response - The response from the server.
 * @returns {Array} An array of mapped reports.
 */
export const mapReportsResponse = (response) => response.map((report) => mapReport(report))

/**
 * Maps a vehicle detail response to a simplified object.
 *
 * @param {Object} response - The vehicle detail response object.
 * @returns {Object} The simplified vehicle object.
 */
export const mapVehicleDetailResponse = (response) => ({
  id: response.id,
  alias: response.alias,
  configuration: response.performance_type,
  configurationId: response.performance_type_id,
  type: response.type,
  typeId: response.type_id,
  driverId: response.driver_id,
  driver: response.driver,
  shipment: response.shipment,
  doorTypeId: response.door_type_id,
  doorType: response.door_type,
  year: response.model_year
})

/**
 * Maps a vehicle, driver, and current shipment to a simplified object.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.vehicle - The vehicle object.
 * @param {Object} options.driver - The driver object.
 * @param {Object} options.shipmentsCurrent - The current shipment object.
 * @returns {Object} The mapped object.
 */
export const mapVehicleDetail = ({ vehicle, driver, shipmentsCurrent }) => ({
  id: vehicle?.id,
  alias: vehicle?.alias,
  type: vehicle?.type,
  typeId: vehicle.type_id,
  configuration: vehicle?.performance_type,
  configurationId: vehicle?.performance_type_id,
  feature: vehicle.freight_type,
  doorId: vehicle.door_type_id,
  doorType: vehicle.door_type,
  driver: driver?.driver,
  driverId: driver?.driver_id,
  shipment: shipmentsCurrent?.shipment_id,
  year: vehicle?.model_year
})
