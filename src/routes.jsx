import { createBrowserRouter } from 'react-router-dom'
import ReportsPage from '@/components/Pages/Reports/ReportsPage'
import Root from '@components/Pages/Root'
import ErrorPage from './components/Pages/ErrorPage'
import { ReportsMonitor } from '@/components/Pages/ReportsMonitor'
import { OtPage } from './components/Pages/OtPage'

export const router = createBrowserRouter([
  {
    path: 'maintenance.web/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'ot',
        element: <OtPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'monitor',
        children: [
          {
            path: 'reports',
            element: <ReportsMonitor />,
          },
        ],
      },
    ],
  },
])

export const monitorPaths = [
  {
    id: 1,
    path: 'monitor/reports',
    label: 'REPORTE MTO',
  },
]

export const queryPaths = [
  {
    id: 1,
    path: 'reports',
    label: 'REPORTE MTO CERRADOS',
  },
  {
    id: 2,
    path: 'ot',
    label: 'ORDENES DE TRABAJO',
  },
]
