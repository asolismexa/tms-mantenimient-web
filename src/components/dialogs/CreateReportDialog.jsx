import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import AutoCompleteVehicles from '@/components/Pages/MonitorReports/AutoCompleteVehicles'
import { useCreateReportsStore } from '@/store/createReports'
import { PerformanceType } from '@/components/Pages/ReportsMonitor/PerformanceType'
import { VehicleDetail } from '@/components/Pages/ReportsMonitor/VehicleDetail'
import { NewReportsTable } from '@/components/tables/NewReportsTable'
import { createReportsService } from '@/services/reports'
import { useSnackbar } from 'notistack'
import { SnackbarDismissAction } from '@/components/SnackbarDismissAction'
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'
import { useReportsMonitorStore } from '@/store/reportsMonitor'

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
  const syncMonitor = useReportsMonitorStore(state => state.syncMonitor)

  const handleOnChange = (_, vehicle) => {
    if (!vehicle) return selectVehicle(null)
    selectVehicle(vehicle.id)
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
    setTimeout(syncMonitor, 3000)
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
      onClose={handleClose}
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
