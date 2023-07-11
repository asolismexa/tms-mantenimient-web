import { createBrowserRouter } from 'react-router-dom'
import ReportsPage from '@/components/Pages/Reports/ReportsPage'
import Root from '@components/Pages/Root'
import ErrorPage from './components/Pages/ErrorPage'
import ReportsMonitor from './components/Pages/MonitorReports/ReportsMonitor'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/reports',
        element: <ReportsPage />,
      },
      {
        path: '/monitor/reports',
        element: <ReportsMonitor />,
      },
    ],
  },
])
