import { Container } from '@mui/material'

export default function MainContainer({ children }) {
  return (
    <Container
      component="main"
      sx={{
        height: '100vh',
        padding: '2rem',
        overflow: 'auto',
        borderRadius: '1rem',
      }}
    >
      {children}
    </Container>
  )
}
