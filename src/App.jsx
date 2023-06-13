import { ThemeProvider } from '@mui/material'
import theme from './theme'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
