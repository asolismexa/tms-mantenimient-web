import { useState, useEffect } from 'react'
import {
  Alert,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material'
import SelectAsync from '@/components/Core/SelectAsync'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuth } from '@/reducers/authSlice'
import {
  setForm,
  setError,
  resetForm,
  createReport,
  selectCreateReportForm,
} from '@/reducers/createReportFormSlice'
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'
import FileInput from '@/components/Core/FileInput'

function CreateReportForm() {
  const dispatch = useDispatch()
  const { token } = useSelector(selectAuth)
  const [evidences, setEvidences] = useState([])
  const form = useSelector(selectCreateReportForm)

  useEffect(() => {
    if (!form.showForm) setEvidences([])
  }, [form.showForm])

  const handleOnSelectFiles = (files) => {
    if (files.length > 5) {
      dispatch(setError('Solo se pueden subir 5 archivos'))
      setEvidences([])
      return
    }
    setEvidences(files)
    dispatch(setError(null))
  }

  const handleSubmit = () => {
    if (form.loading) return
    if (form.type === null) {
      dispatch(setError('Debe seleccionar un tipo de reporte'))
      return
    }
    if (form.vehicle === null) {
      dispatch(setError('Debe seleccionar una unidad'))
      return
    }
    if (form.driver === null) {
      dispatch(setError('Debe seleccionar un operador'))
      return
    }

    if (form.observation.trim() === '') {
      dispatch(
        setError(
          'Debes colocar una observacion indicando el motivo del reporte',
        ),
      )
      return
    }

    if (evidences.length === 0) {
      dispatch(setError('Debe seleccionar al menos un archivo'))
      return
    }

    let location = null
    navigator.geolocation.getCurrentPosition(
      (position) => {
        location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        dispatch(createReport({ form, evidences, token, location }))
      },
      (error) => {
        console.log(error)
        dispatch(setError('No se pudo obtener la ubicacion del dispositivo'))
      },
    )
  }

  if (form.loading) return <LoadingBackdrop open={form.loading} />

  return (
    <Dialog open={form.showForm} fullWidth>
      <DialogContent>
        <SelectAsync
          label="Tipo de Reporte"
          url="/api/reports/types"
          headers={{ Authorization: `Bearer ${token}` }}
          onChange={(event, newValue) => {
            dispatch(setForm({ type: newValue }))
          }}
          value={form.type}
        />
        <SelectAsync
          label="UNIDAD"
          url="/api/vehicles"
          nameKey="alias"
          headers={{ Authorization: `Bearer ${token}` }}
          onChange={(_, newValue) => {
            dispatch(setForm({ vehicle: newValue }))
          }}
          value={form.vehicle}
        />
        <SelectAsync
          label="OPERADOR"
          url="/api/drivers"
          headers={{ Authorization: `Bearer ${token}` }}
          onChange={(_, newValue) => {
            dispatch(setForm({ driver: newValue }))
          }}
          value={form.driver}
        />
        <TextField
          fullWidth
          label="Observacion"
          multiline
          size="small"
          margin="dense"
          rows={3}
          onChange={({ target }) => {
            dispatch(setForm({ observation: target.value }))
          }}
          value={form.observation}
          variant="outlined"
        />
        <FileInput
          multiple
          label="Subir Evidencias"
          value={evidences}
          onChange={handleOnSelectFiles}
        />
        <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
          *Maximo 5 archivos
        </Typography>
        {form.error && <Alert severity="error">{form.error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            backgroundColor: '#f44336',
          }}
          size="small"
          onClick={() => {
            dispatch(resetForm())
          }}
        >
          Cancelar
        </Button>
        <Button disabled={form.loading} onClick={handleSubmit}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateReportForm
