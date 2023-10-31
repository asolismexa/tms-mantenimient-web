import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Stack,
  CircularProgress
} from '@mui/material'
import AutoCompleteVehicles from '@/components/Pages/MonitorReports/AutoCompleteVehicles'
import { useCreateReportsStore } from '@/store/createReports'
import { mapVehicleDetailResponse } from '@/utils/maps'
import { PerformanceType } from '@/components/Pages/ReportsMonitor/PerformanceType'
import { VehicleDetail } from '@/components/Pages/ReportsMonitor/VehicleDetail'
import { NewReportsTable } from '@/components/Pages/ReportsMonitor/NewReportsTable'

export function CreateReportDetailDialog () {
  const {
    isDialogOpen,
    closeDialog,
    vehicle,
    loadingVehicleDetail,
    selectVehicle,
    detail
  } = useCreateReportsStore(state => state)

  const handleOnChange = (_, newValue) => {
    if (!newValue) return selectVehicle(null)
    const mappedValue = mapVehicleDetailResponse(newValue)
    selectVehicle(mappedValue)
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
          <PerformanceType detail={detail} />
        </Stack>

        { loadingVehicleDetail
          ? <CircularProgress sx={{ my: 2 }} />
          : <VehicleDetail detail={detail} />
        }

        {vehicle && <NewReportsTable />}

      </Box>

    </DialogContent>
    <DialogActions>
      <Button>GUARDAR</Button>
      <Button onClick={closeDialog}>CANCELAR</Button>
    </DialogActions>
  </Dialog>
  )
}
