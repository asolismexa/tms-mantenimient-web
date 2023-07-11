import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import SendIcon from '@mui/icons-material/Send'
import {
  Grid,
  Alert,
  Box,
  Tab,
  Tabs,
  Typography,
  Link,
  Divider,
  TextField,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material'
import TabPanel from '@/components/Core/TabPanel'
import { formatDate } from '@/utils/dates'
import EvidencesList from '../Reports/EvidencesList'
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'
import ObservationsList from '../Reports/ObservationsList'
import {
  assignDriver,
  assignOt,
  attendReport,
  fetchReports,
  postReportObservation,
  uploadEvidence,
  validateReport,
} from '@/services/reports'
import { statusEnum } from '@/constants/reports'
import CheckLogo from '@/components/Core/CheckLogo'
import FileInput from '@/components/Core/FileInput'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import AutoCompleteDrivers from './AutoCompleteAsyncDrivers'
import axios from 'axios'

const initialValidateDialogState = {
  open: false,
  loading: false,
  reports: [],
}

export default function ModalDetailReport({
  report,
  open,
  handleClose,
  error,
  loading = true,
  refreshReport,
  refreshReports,
  createNewReport,
}) {
  const [tab, setTab] = useState(0)
  const [createNewReportDialog, setCreateNewReportDialog] = useState(false)
  const [observation, setObservation] = useState('')
  const [otField, setOtField] = useState(report?.ot || '')
  const [evidences, setEvidences] = useState([])
  const [validateDialog, setValidateDialog] = useState(
    initialValidateDialogState,
  )
  const [selectedDriver, setSelectedDriver] = useState(null)

  const handleChangeSelectedDriver = (_, value) => {
    if (report.status_id == 3) return
    setSelectedDriver(value)
  }

  const handleChangeAsignedDriver = () => {
    assignDriver(report.id, selectedDriver.id)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err))
      .finally(() => refreshReport())
  }

  const onClose = () => {
    handleClose()
    setTab(0)
    setObservation('')
    setEvidences([])
  }

  const openValidateDialog = () => {
    setValidateDialog((prev) => ({
      ...prev,
      open: true,
    }))
  }

  const closeValidateDialog = () => {
    setValidateDialog(initialValidateDialogState)
  }

  const handleAssignOt = () => {
    if (otField.trim() === '') return
    assignOt({
      reportId: report?.id,
      data: {
        ot_folio: parseInt(otField),
      },
    })
      .then(() => {
        refreshReport()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setOtField('')
      })
  }

  const handleAttended = () => {
    attendReport({ reportId: report?.id })
      .then(() => {
        refreshReport()
        refreshReports()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const ot = report?.ot || ''
    setOtField(ot.toString())
  }, [report])

  const handleCreateObservation = () => {
    if (observation.trim() === '') return
    postReportObservation({
      report_id: report.id,
      observation_text: observation,
    })
      .then(() => {
        refreshReport()
      })
      .catch((err) => {
        console.log(err)
      })
    setObservation('')
  }

  const handleOpenValidateDialog = () => {
    console.log(validateDialog)
    openValidateDialog()
    setValidateDialog((prev) => ({ ...prev, loading: true }))
    fetchReports({
      params: {
        status_id: statusEnum.ATENDIDO,
        ot_folio: report?.ot,
      },
    })
      .then((res) => {
        setValidateDialog((prev) => ({
          ...prev,
          reports: res.data,
        }))
      })
      .finally(() => {
        setValidateDialog((prev) => ({ ...prev, loading: false }))
      })
  }

  const validateReports = () => {
    setValidateDialog((prev) => ({ ...prev, loading: true }))
    validateReport({
      reportId: report?.id,
      data: {
        validated_success: true,
      },
    })
      .then(() => {
        refreshReport()
        refreshReports()
        closeValidateDialog()
      })
      .finally(() => {
        setValidateDialog((prev) => ({ ...prev, loading: false }))
      })
  }

  const validateIncorrectReports = (vehicle) => {
    setCreateNewReportDialog(false)
    setValidateDialog((prev) => ({ ...prev, loading: true }))
    validateReport({
      reportId: report?.id,
      data: {
        validated_success: false,
      },
    })
      .then(() => {
        refreshReports()
        handleClose()
        closeValidateDialog()
        if (!vehicle) return
        createNewReport({ vehicle })
      })
      .finally(() => {
        setValidateDialog((prev) => ({ ...prev, loading: false }))
      })
  }

  const handleUploadEvidences = () => {
    if (!evidences) return
    if (evidences?.length === 0) return
    uploadEvidence({ reportId: report?.id, data: evidences })
      .then(() => {
        refreshReport()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setEvidences([])
      })
  }

  if (loading) return <LoadingBackdrop open />

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Detalle de Reporte</DialogTitle>
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
            <Grid container>
              <Grid item xs={6}>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    Fecha Reportado
                  </Typography>
                  <Typography variant="body1">
                    {report && formatDate(report.time)}
                  </Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    Unidad
                  </Typography>
                  <Typography variant="body1">{report?.vehicle}</Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    OPERADOR
                  </Typography>
                  <Typography variant="body1">
                    {report?.driver ? (
                      report.driver
                    ) : (
                      <Stack
                        sx={{
                          mt: 1,
                        }}
                        spacing={1}
                        alignItems="start"
                      >
                        <AutoCompleteDrivers
                          value={selectedDriver}
                          onChange={handleChangeSelectedDriver}
                        />
                        {selectedDriver && (
                          <Button onClick={handleChangeAsignedDriver}>
                            Asignar Operador
                          </Button>
                        )}
                      </Stack>
                    )}
                  </Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    TIPO DE FALLA
                  </Typography>
                  <Typography variant="body1">{report?.report_type}</Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    Primera observacion:
                  </Typography>
                  <Typography variant="body1">
                    {report?.observations?.length > 0 &&
                      report.observations.slice().reverse()[0].observation_text}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    FOLIO
                  </Typography>
                  <Typography variant="body1">
                    {report?.number ? report.number : ''}
                  </Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    ESTATUS
                  </Typography>
                  <Typography variant="body1">{report?.status}</Typography>
                  {report?.validated_success !== null ? (
                    <CheckLogo checked={report?.validated_success} />
                  ) : null}
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    SOLICITUD
                  </Typography>
                  <Typography variant="body1">
                    {report?.shipment_id ||
                      'No hay solicitud asignada a esta unidad'}
                  </Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    Ubicacion
                  </Typography>
                  <Link
                    target="_blank"
                    href={`https://www.google.com/maps/search/?api=1&query=${report?.latitude}%2C${report?.longitude}`}
                  >
                    <Typography variant="body1">{report?.location}</Typography>
                  </Link>
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography fontWeight="bold" variant="caption">
                    ORDEN DE TRABAJO
                  </Typography>
                  <Typography fontWeight="bold" variant="caption"></Typography>
                  {report?.status_id !== statusEnum.VALIDADO &&
                  report?.status_id !== statusEnum.ATENDIDO ? (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        margin="dense"
                        size="small"
                        label="OT"
                        value={otField}
                        onChange={(e) => setOtField(e.target.value)}
                      />
                      <Button onClick={handleAssignOt}>Asignar</Button>
                    </Stack>
                  ) : (
                    <Typography variant="body1">{report?.ot}</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Box>
              {report?.status_id === statusEnum.ASIGNADO && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAttended}
                >
                  Marcar como atendido
                </Button>
              )}
              {report?.status_id === statusEnum.ATENDIDO && (
                <Button onClick={handleOpenValidateDialog}>
                  Validar Reporte
                </Button>
              )}
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Box
              sx={{ minHeight: '290px', maxHeight: '290px', overflow: 'auto' }}
            >
              <ObservationsList
                observations={report?.observations ? report?.observations : []}
              />
            </Box>
            {report?.status_id !== statusEnum.VALIDADO && (
              <Stack direction="row" spacing={1}>
                <TextField
                  multiline
                  rows={2}
                  fullWidth
                  size="small"
                  margin="none"
                  label="Nueva observacion"
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                />
                <IconButton size="small" onClick={handleCreateObservation}>
                  <SendIcon />
                </IconButton>
              </Stack>
            )}
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <EvidencesList evidences={report ? report.evidences : []} />
            <Stack direction="row" alignItems="center" spacing={2}>
              <FileInput
                label="Seleccionar evidencias"
                value={evidences}
                onChange={(val) => {
                  if (!val) return
                  console.log(val)
                  setEvidences([...val])
                }}
              />
              <IconButton
                disabled={evidences?.length === 0}
                color="primary"
                onClick={handleUploadEvidences}
              >
                <FileUploadIcon color="inherit" />
              </IconButton>
            </Stack>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog maxWidth="sm" fullWidth open={validateDialog.open}>
        <DialogTitle>
          Deseas validar la orden de trabajo {report?.ot}?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Los siguientes reportes seran validados:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={<Typography fontWeight="bold">FOLIO</Typography>}
              />
              <ListItemText
                primary={
                  <Typography fontWeight="bold">TIPO DE REPORTE</Typography>
                }
              />
              <ListItemText
                primary={<Typography fontWeight="bold">OT</Typography>}
              />
            </ListItem>
            {validateDialog.reports.map((report) => (
              <ListItem key={report?.id}>
                <ListItemText primary={report?.id} />
                <ListItemText primary={report?.report_type} />
                <ListItemText primary={report?.ot} />
              </ListItem>
            ))}
          </List>
          {validateDialog.loading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={validateReports}>Correcto</Button>
          <Button
            onClick={() => {
              setCreateNewReportDialog(true)
            }}
          >
            Incorrecto
          </Button>
          <Button onClick={closeValidateDialog}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={createNewReportDialog}>
        <DialogTitle>Deseas crear un nuevo reporte?</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              validateIncorrectReports({
                id: report?.vehicle_id,
                alias: report?.vehicle,
              })
            }}
          >
            Si
          </Button>
          <Button onClick={() => validateIncorrectReports()}>No</Button>
          <Button
            onClick={() => {
              setCreateNewReportDialog(false)
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
