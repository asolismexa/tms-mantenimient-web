import { useState } from 'react'
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
import { createReportsService } from '@/services/reports'
import { useSnackbar } from 'notistack'
import { SnackbarDismissAction } from '@/components/SnackbarDismissAction'
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'

export function CreateReportDetailDialog () {
  const {
    isDialogOpen,
    closeDialog,
    vehicle,
    loadingVehicleDetail,
    selectVehicle,
    detail,
    newReports: newReportsItems
  } = useCreateReportsStore(state => state)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const hasReportsItems = newReportsItems.length > 0

  const handleOnChange = (_, newValue) => {
    if (!newValue) return selectVehicle(null)
    const mappedValue = mapVehicleDetailResponse(newValue)
    selectVehicle(mappedValue)
  }

  const handleCreateNewReports = async () => {
    if (!hasReportsItems) return
    setLoading(true)
    const ids = await createReportsService(newReportsItems)
    ids?.forEach((reportId) => enqueueSnackbar(`Se creo el reporte ${reportId}`, {
      key: reportId,
      persist: true,
      variant: 'success',
      action: (snackbarId) => (
        <SnackbarDismissAction onClick={() => closeSnackbar(snackbarId)} />
      )
    }))
    selectVehicle(null)
    setLoading(false)
  }

  const handleClose = () => {
    closeDialog()
    selectVehicle(null)
    closeSnackbar()
  }

  if (loading) return <LoadingBackdrop open/>

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
      <Button
        sx={{ opacity: hasReportsItems ? 1 : 0.5 }}
        onClick={handleCreateNewReports}
        disabled={!hasReportsItems}
      >
          GUARDAR
      </Button>
      <Button onClick={handleClose}>CANCELAR</Button>
    </DialogActions>

  </Dialog>
  )
}
