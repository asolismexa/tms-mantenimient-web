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
import LabelValue from '@/components/Core/LabelValue'
import { useFetchVehicle } from '@/hooks/useFetchVehicle'
import { setError } from '@/reducers/createReportFormSlice'
import { mettersToKilometers } from '@/utils/numbers'

const initialValidateDialogState = {
  open: false,
  loading: false,
  reports: [],
}

const emtpy = () => {}
export default function ModalDetailReport({
  report,
  open,
  handleClose = emtpy,
  error,
  loading = true,
  refreshReport = emtpy,
  refreshReports = emtpy,
  createNewReport = emtpy,
  tab,
  setTab,
}) {
  const vehicleData = useFetchVehicle(report?.vehicle_id)
  const [errorMessage, setErrorMessage] = useState(null)
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
    setError(null)
    setErrorMessage(null)
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
    setErrorMessage(null)
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
        setErrorMessage(err?.response?.data)
      })
      .finally(() => {
        setOtField('')
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

  const getVehicleFeatures = () => {
    if (vehicleData.vehicle?.freight_type_id != -1) {
      return `${vehicleData.vehicle?.freight_type} 
                  ,${vehicleData.vehicle?.door_type}
                  ,${vehicleData.vehicle?.model_year}`
    }

    return vehicleData?.vehicle.performance_type
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
        <DialogTitle>Detalle de Reporte #{report?.id}</DialogTitle>
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
              <Grid item xs={12}>
                <LabelValue
                  label="FOLIO:"
                  value={report?.id ? report.id : ''}
                />
              </Grid>

              <Grid item xs={6}>
                <LabelValue
                  label="FECHA REPORTADO:"
                  value={report && formatDate(report.time)}
                />

                <LabelValue label="UNIDAD:" value={report?.vehicle} />

                {report?.vehicle_assinged && (
                  <LabelValue
                    label="UNIDAD ASIGNADA:"
                    value={report?.vehicle_assinged}
                  />
                )}

                <LabelValue
                  label="OPERADOR:"
                  value={
                    report?.driver ? (
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
                    )
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <LabelValue label="ESTATUS:" value={report?.status} />
                {vehicleData?.vehicle && (
                  <LabelValue
                    label="CARACTERISTICAS"
                    value={getVehicleFeatures()}
                  />
                )}

                {report?.odometer && (
                  <LabelValue
                    label="ODOMETRO:"
                    value={mettersToKilometers(
                      report?.odometer ? report?.odometer : 0,
                    )}
                  />
                )}

                {report?.validated_success !== null && (
                  <LabelValue
                    label="EVALUADO:"
                    value={
                      report?.validated_success !== null ? (
                        <CheckLogo checked={report?.validated_success} />
                      ) : null
                    }
                  />
                )}

                {report?.shipment_id && (
                  <LabelValue label="SOLICITUD:" value={report?.shipment_id} />
                )}

                <LabelValue
                  label="UBICACION:"
                  value={
                    <Link
                      target="_blank"
                      href={`https://www.google.com/maps/search/?api=1&query=${report?.longitude}%2C${report?.latitude}`}
                    >
                      <Typography variant="body1">
                        {report?.location}
                      </Typography>
                    </Link>
                  }
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Box>
              <Grid container>
                <Grid item xs={6}>
                  <LabelValue
                    label="TIPO DE FALLA:"
                    value={report?.report_type}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LabelValue
                    label="ORDEN DE TRABAJO:"
                    value={
                      !report?.ot &&
                      report?.status_id !== statusEnum.VALIDADO &&
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
                      )
                    }
                  />
                </Grid>
              </Grid>

              <LabelValue
                label="PRIMERA OBSERVACION:"
                value={
                  report?.observations?.length > 0 &&
                  report.observations.slice().reverse()[0].observation_text
                }
              />
              {report?.status_id === statusEnum.ATENDIDO && report?.ot && (
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
          {Boolean(errorMessage) && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
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
