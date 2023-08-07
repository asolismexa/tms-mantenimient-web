import { Stack, Typography, Button } from '@mui/material'
import { useRouteError, Link } from 'react-router-dom'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'

const errorMessages = {
  404: 'La página que buscas no existe!',
  500: 'Error al cargar la página contacte al administrador',
}

function ErrorPage() {
  const error = useRouteError()

  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography
        component="span"
        variant="h3"
        fontWeight="bold"
        color="secondary"
      >
        {errorMessages[error.status]}
      </Typography>
      <Link to="maintenance.web/">
        <Button>
          <ArrowLeftIcon />
          <Typography variant="body1">Volver</Typography>
        </Button>
      </Link>
    </Stack>
  )
}

export default ErrorPage
