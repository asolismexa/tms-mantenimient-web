import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField, Button } from '@mui/material'
import TmsLogo from './TmsLogo'
import { useSelector, useDispatch } from 'react-redux'
import { closeLoginDialog } from '@/reducers/loginDialogSlicing'
import LoadingBackdrop from './LoadingBackdrop'

function LoginDialog() {
  const dispatch = useDispatch()
  const loadingDialog = useSelector((state) => state.loginDialog)
  const handleClose = () => {
    dispatch(closeLoginDialog())
  }

  if (loadingDialog.loading) {
    return <LoadingBackdrop open={true} />
  }

  return (
    <Dialog fullWidth={true} open={loadingDialog.open}>
      <DialogTitle>
        <TmsLogo />
        Iniciar Sesion
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Entrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginDialog
