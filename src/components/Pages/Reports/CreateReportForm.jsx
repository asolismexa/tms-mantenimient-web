import { useRef, useState } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material'
import SelectAsync from '@/components/Core/SelectAsync'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
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

function CreateReportForm({ open, handleClose }) {
  const dispatch = useDispatch()
  const { token } = useSelector(selectAuth)
  const form = useSelector(selectCreateReportForm)
  const fileInput = useRef(null)
  const [evidences, setEvidences] = useState([])

  const handleOnSelectFiles = ({ target }) => {
    const selectedFiles = [...target.files]
    if (selectedFiles.length > 5) {
      dispatch(setError('Solo se pueden subir 5 archivos'))
      setEvidences([])
      return
    }
    setEvidences(selectedFiles)
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
    <Dialog open={open} fullWidth>
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
          onChange={(event, newValue) => {
            dispatch(setForm({ vehicle: newValue }))
          }}
          value={form.vehicle}
        />
        <SelectAsync
          label="OPERADOR"
          url="/api/drivers"
          headers={{ Authorization: `Bearer ${token}` }}
          onChange={(event, newValue) => {
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
        <Button
          sx={{ my: 1 }}
          variant="contained"
          color="primary"
          onClick={() => {
            fileInput.current.click()
          }}
        >
          Subir Evidencias
        </Button>
        <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
          *Maximo 5 archivos
        </Typography>
        <List>
          {evidences.map((file) => (
            <ListItem key={file.name}>
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              {
                <ListItemText variant="caption" color="text.secondary">
                  {file.name}
                </ListItemText>
              }
            </ListItem>
          ))}
        </List>
        <input
          type="file"
          multiple
          max={5}
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={handleOnSelectFiles}
        />
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
            setEvidences([])
            fileInput.current.value = ''
            handleClose()
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
