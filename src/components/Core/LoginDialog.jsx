import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField, Button, Alert } from '@mui/material'
import TmsLogo from './TmsLogo'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBackdrop from './LoadingBackdrop'
import { loginUser, selectAuth } from '@/reducers/authSlice'

function LoginDialog() {
  const dispatch = useDispatch()
  const { loading, user, token, error } = useSelector(selectAuth)
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const handleLogin = () => {
    if (form.username.trim() === '' || form.password.trim() === '') {
      return
    }

    dispatch(
      loginUser({
        username: form.username.trim(),
        password: form.password.trim(),
      }),
    )
  }

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    })
  }

  if (loading) {
    return <LoadingBackdrop open />
  }

  return (
    <Dialog fullWidth={true} open={!user || !token}>
      <DialogTitle>
        <TmsLogo />
        Iniciar Sesion
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="usernames"
          name="username"
          label="Nombre de usuario"
          type="text"
          onChange={handleChange}
          value={form.username}
          fullWidth
        />
        <TextField
          autoFocus
          id="password"
          margin="normal"
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          value={form.password}
          fullWidth
        />
        {error && (
          <Alert sx={{ mt: 0.5 }} severity="error">
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin}>Entrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginDialog
