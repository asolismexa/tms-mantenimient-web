import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  TextField,
  Alert,
} from '@mui/material'
import AutoCompleteTypes from './AutoCompleteTypes'
import FileInput from '@/components/Core/FileInput'

function ModalAddItems({ open, form, setForm, onClose = null, onAdd = null }) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <DialogTitle>Agregar Falla</DialogTitle>
      <DialogContent>
        {form.error && <Alert severity="error">{form.error}</Alert>}
        <Box sx={{ p: 1 }}>
          <AutoCompleteTypes
            onChange={(_, value) => {
              setForm({ ...form, type: value })
            }}
            value={form.type}
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
        <Button onClick={onAdd}>Guardar</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalAddItems