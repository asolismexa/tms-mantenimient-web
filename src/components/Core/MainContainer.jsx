import { Container } from '@mui/material'

export default function MainContainer({ children }) {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        mt: '4.5rem',
        overflow: 'auto',
        borderRadius: '1rem',
      }}
    >
      {children}
    </Container>
  )
}
