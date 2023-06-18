import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Alert, Grid, Tab, Tabs, Typography } from '@mui/material'
import TabPanel from '@/components/Core/TabPanel'
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'
import { selectReportDetail, closeDialog } from '@/reducers/reportDetail'
import { formatDate } from '@/utils/dates'

export default function DialogReportDetail() {
  const dispatch = useDispatch()
  const [tab, setTab] = useState(0)
  const { dialog, form, loading, error, selectedReport } =
    useSelector(selectReportDetail)

  const handleClose = () => {
    dispatch(closeDialog())
  }

  if (loading) return <LoadingBackdrop open />

  return (
    <div>
      <Dialog
        open={dialog.open}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Detalle de Reporte'}</DialogTitle>
        <DialogContent>
          <Tabs
            value={tab}
            onChange={(_, newValue) => {
              setTab(newValue)
            }}
          >
            <Tab label="Detalle" />
            <Tab label="Observaciones" />
            <Tab label="Evidencias" />
          </Tabs>
          {error && (
            <Alert sx={{ my: 1 }} severity="error">
              {error}
            </Alert>
          )}
          <TabPanel value={tab} index={0}>
            <Grid spacing={2} container>
              <Grid item xs={6}>
                <Typography variant="caption">Operador:</Typography>
                <Typography variant="body1">
                  {selectedReport?.driver}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Creado en:</Typography>
                <Typography variant="body1">
                  {formatDate(selectedReport?.time)}
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            Observaciones
          </TabPanel>
          <TabPanel value={tab} index={2}>
            Evidencias
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
