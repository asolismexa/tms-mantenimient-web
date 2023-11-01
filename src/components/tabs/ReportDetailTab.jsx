import LabelValue from '@/components/Core/LabelValue'
import { useReportDetailStore } from '@/store/reportDetailStore'
import { formatDate } from '@/utils/dates'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { mettersToKilometers } from '@/utils/numbers'
import { LocationLink } from '@/components/LocationLink'
import { AssignOtInput } from '@/components/AssignOtInput'
import { AssingDriverInput } from '@/components/AssignDriverInput'

export function ReportDetailTab () {
  const report = useReportDetailStore(state => state.report)
  const firstObservation = report.observations[0]?.observationText
  const hasOt = report.ot !== null && report.ot !== undefined
  const hasDriver = report.driver !== null && report.driver !== undefined

  if (!report) return (<Typography>No se ah seleccionado ningun reporte</Typography>)

  return (
    <Box sx={{ width: '100%' }}>

      <Box display='flex'>
        <Box flex={1}>
          <LabelValue label='FOLIO:' value={report.id} />
          <LabelValue label='FECHA REPORTADO:' value={formatDate(report.time)} />
          <LabelValue label='UNIDAD:' value={report.vehicle} />
          { report.vehicleAssigned && <LabelValue label='UNIDAD ASIGNADA:' value={report.vehicleAssigned} /> }
          { hasDriver && <LabelValue label='OPERADOR:' value={report.driver} /> }
          { !hasDriver && <AssingDriverInput /> }
        </Box>

        <Box flex={1}>
          <LabelValue label='ESTATUS:' value={report.status} />
          <LabelValue label='CARACTERISTICAS:' value={formatDate(report.time)} />
          <LabelValue label='ODOMETRO:' value={mettersToKilometers(report.odometer ?? 0)} />
          { report.shipmentId && <LabelValue label='SOLICITUD:' value={report.shipmentId} /> }
          <LabelValue label='UBICACION REPORTADO:' value={(
            <LocationLink lat={report.latitude} lon={report.longitude}>
              {report.location}
            </LocationLink>
          )} />
        </Box>
      </Box>

      <Divider>
        <Typography variant='caption'>INFORMACION DE FALLA</Typography>
      </Divider>

      <Box display='flex'>
        <Box flex={1}>
          <LabelValue label='TIPO DE FALLA:' value={report.reportType} />
        </Box>
        <Box flex={1}>
          { hasOt && <LabelValue label='ORDEN DE TRABAJO' value={report.ot} /> }
          { !hasOt && <AssignOtInput /> }
          { hasOt && <LabelValue label='ORDEN DE TRABAJO' value={formatDate(report.otPromiseDate)} /> }
        </Box>
      </Box>

      <LabelValue label='PRIMERA OBSERVACION:' value={firstObservation} />
    </Box>
  )
}
