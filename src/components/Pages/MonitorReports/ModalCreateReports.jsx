import LoadingBackdrop from '@/components/Core/LoadingBackdrop'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from '@mui/material'

function ModalCreateReports({
  loading,
  open,
  handleClose,
  handleCreate,
  children,
  error,
}) {
  if (loading) {
    return <LoadingBackdrop open />
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open}>
      <DialogTitle>Crear Reportes</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreate}>Guardar</Button>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalCreateReports
