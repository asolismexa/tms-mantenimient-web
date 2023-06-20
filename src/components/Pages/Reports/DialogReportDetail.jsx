import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import SendIcon from '@mui/icons-material/Send'
import {
  Alert,
  Box,
  CircularProgress,
  DialogContentText,
  Grid,
  IconButton,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import TabPanel from '@/components/Core/TabPanel'
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'
import {
  selectReportDetail,
  closeDialog,
  openConfirmDialog,
  setForm,
  createReportObservation,
  closeConfirmDialog,
  updateReportStatus,
} from '@/reducers/reportDetail'
import { formatDate } from '@/utils/dates'
import EvidencesList from './EvidencesList'
import ObservationsList from './ObservationsList'
import { statusEnum } from '@/constants/reports'

export default function DialogReportDetail() {
  const dispatch = useDispatch()
  const [tab, setTab] = useState(0)
  const {
    dialog,
    confirmDialog,
    form,
    loading,
    error,
    selectedReport,
    loadingObservations,
  } = useSelector(selectReportDetail)
  const bottomAnchor = useRef(null)

  const handleClose = () => {
    dispatch(closeDialog())
  }

  const handleCreateObservation = () => {
    if (form.observation.trim() === '') return
    dispatch(
      createReportObservation({
        report_id: selectedReport.id,
        observation_text: form.observation,
      }),
    )
  }

  const handleFinishReport = ( ) => {
    dispatch(
      setForm({
        status: statusEnum.ATENDIDO,
      }),
    )
    dispatch(
      openConfirmDialog({
        title: `Estas seguro que deseas finalizar el reporte?`,
        message:
          'No podras cambiar el estatus una vez finalizado',
      }),
    )
  }

  useEffect(() => {
    bottomAnchor?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedReport, tab])

  if (loading) return <LoadingBackdrop open />

  return (
    <div>
      <Dialog open={confirmDialog.open}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(closeConfirmDialog())
            }}
          >
            Cancelar
          </Button>
          <Button
            autoFocus
            onClick={() => {
              dispatch(updateReportStatus({ status: form.status }))
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

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
              <Grid item xs={6}>
                <Typography variant="caption">Unidad:</Typography>
                <Typography variant="body1">
                  {selectedReport?.vehicle}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Creado Por:</Typography>
                <Typography variant="body1">{selectedReport?.user}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Estatus:</Typography>
                <Typography variant="body1">
                  {selectedReport?.status}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Ubicacion:</Typography>
                {selectedReport && (
                  <Link
                    sx={{ display: 'block' }}
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedReport.latitude}%2C${selectedReport.longitude}`}
                    variant="body1"
                    target="_blank"
                  >
                    Ver en maps
                  </Link>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Tipo:</Typography>
                <Typography variant="body1">
                  {selectedReport?.report_type}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Folio:</Typography>
                {selectedReport?.status_id === statusEnum.REPORTADO ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      size="small"
                      margin="dense"
                      placeholder="Ej: 185951"
                      value={form.folio}
                      onChange={({ target }) => {
                        dispatch(
                          setForm({
                            folio: target.value,
                          }),
                        )
                      }}
                    />
                    <Button
                      onClick={() => {
                        if (form.folio.trim() == '') return
                        dispatch(
                          setForm({
                            status: statusEnum.ASIGNADO,
                          }),
                        )
                        dispatch(
                          openConfirmDialog({
                            title: `Deseas asignar el folio ${form.folio} a este reporte?`,
                            message:
                              'No podras cambiar el folio una vez que este asignado',
                          }),
                        )
                      }}
                    >
                      Asignar Folio
                    </Button>
                  </Stack>
                ) : (
                  <Typography variant="body1">
                    {selectedReport?.number}
                  </Typography>
                )}
              </Grid>
              {selectedReport?.status_id === statusEnum.ASIGNADO ? (
                <Grid item xs={12}>
                  <Button
                    onClick={handleFinishReport}
                    fullWidth
                  >
                    Finalizar Reporte
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Box
              sx={{ minHeight: '290px', maxHeight: '290px', overflow: 'auto' }}
            >
              {loadingObservations ? (
                <CircularProgress />
              ) : (
                <ObservationsList
                  observations={
                    selectedReport ? selectedReport.observations : []
                  }
                />
              )}
              <div id="bottom-anchor" ref={bottomAnchor}></div>
            </Box>
            <Stack direction="row" spacing={1}>
              <TextField
                multiline
                rows={2}
                fullWidth
                size="small"
                margin="none"
                onChange={({ target }) => {
                  dispatch(
                    setForm({
                      observation: target.value,
                    }),
                  )
                }}
                value={form.observation}
                label="Nueva observacion"
              />
              <IconButton onClick={handleCreateObservation} size="small">
                <SendIcon />
              </IconButton>
            </Stack>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <EvidencesList
              evidences={selectedReport ? selectedReport.evidences : []}
            />
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
