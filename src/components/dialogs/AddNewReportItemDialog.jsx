import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  TextField,
  Alert
} from '@mui/material'
import AutoCompleteTypes from '@/components/Pages/MonitorReports/AutoCompleteTypes'
import FileInput from '@/components/Core/FileInput'
import { reportTypeBaseUrl } from '@/services/reportTypes'

const initialForm = {
  reportType: null,
  observation: '',
  evidences: []
}

export function AddNewReportItemDialog ({
  open,
  onClose = null,
  onAdd = null
}) {
  const [form, setForm] = useState(initialForm)
  const isValidForm = form.reportType && form.observation.trim() !== ''

  const handleAdd = () => {
    if (!isValidForm) return
    const newItem = {
      id: crypto.randomUUID(),
      reportTypeId: form.reportType?.id,
      type: form.reportType.name,
      observation: form.observation,
      evidences: form.evidences
    }
    onAdd(newItem)
    setForm({ ...initialForm })
  }

  const handleClose = () => {
    setForm({ ...initialForm })
    onClose()
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <DialogTitle>Agregar Falla</DialogTitle>
      <DialogContent>
        {form.error && <Alert severity="error">{form.error}</Alert>}
        <Box sx={{ p: 1 }}>
          <AutoCompleteTypes
            onChange={(_, value) => {
              setForm({ ...form, reportType: value })
            }}
            value={form.reportType}
            url={reportTypeBaseUrl}
          />
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Observaciones"
            margin="normal"
            value={form.observation}
            onChange={(e) => {
              setForm({ ...form, observation: e.target.value })
            }}
          />
          <FileInput
            multiple
            maxFiles={5}
            label="Subir evidencias"
            onChange={(files) => {
              setForm({ ...form, evidences: files })
            }}
            value={form.evidences}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button sx={{
          opacity: isValidForm ? 1.0 : 0.5
        }} onClick={handleAdd} disabled={!isValidForm}>Guardar</Button>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}
