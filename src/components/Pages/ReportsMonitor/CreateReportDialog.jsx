import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Stack
} from '@mui/material'
import AutoCompleteVehicles from '@/components/Pages/MonitorReports/AutoCompleteVehicles'
import { useCreateReportsStore } from '@/store/createReports'
import { mapVehicleDetailResponse } from '@/utils/maps'
import { useVehicleDetail } from '@/hooks/useVehicleDetail'
import { PerformanceType } from '@/components/Pages/ReportsMonitor/PerformanceType'
import { VehicleDetail } from '@/components/Pages/ReportsMonitor/VehicleDetail'

export function CreateReportDetailDialog () {
  const {
    isDialogOpen,
    closeDialog,
    vehicle,
    setVehicle
  } = useCreateReportsStore(state => state)
  const { vehicleDetail } = useVehicleDetail(vehicle?.id)

  const handleOnChange = (_, newValue) => {
    if (!newValue) return setVehicle(null)
    const mappedValue = mapVehicleDetailResponse(newValue)
    setVehicle(mappedValue)
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isDialogOpen}
      onClose={closeDialog}
    >
    <DialogTitle>CREAR REPORTES</DialogTitle>

    <DialogContent>
      <Box sx={{ py: 1 }}>

        <Stack direction='row' gap={2}>
          <AutoCompleteVehicles
            value={vehicle}
            onChange={handleOnChange}
          />
          <PerformanceType detail={vehicleDetail} />
        </Stack>

        <VehicleDetail detail={vehicleDetail} />

      </Box>
    </DialogContent>

    <DialogActions>
      <Button>GUARDAR</Button>
      <Button onClick={closeDialog}>CANCELAR</Button>
    </DialogActions>
  </Dialog>
  )
}
