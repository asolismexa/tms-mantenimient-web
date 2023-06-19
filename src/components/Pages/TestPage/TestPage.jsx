import CustomDataGrid from '@/components/custom/DataGrid'
import { Box, Typography, Alert } from '@mui/material'
import useFetchReports from '@/hooks/useFetchReports'
import { formatDate } from '@/utils/dates'
import dayjs from 'dayjs'
import { useState } from 'react'

function TestPage() {
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 15,
    start: 0,
    end: 15,
  })
  const { reports, loading, error } = useFetchReports({
    start: 0,
    end: 1,
  })

  //   console.log(pagination)
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h3">Tests</Typography>
      {Boolean(error) && (
        <Alert sx={{ my: 1 }} severity="error">
          {error}
        </Alert>
      )}
      <CustomDataGrid
        loading={loading}
        columns={reportsColumns}
        rows={reports}
        page={pagination.page}
        pageCount={5}
        onPageChange={(_, newPage) => {
          console.log('Selected Page', newPage)
          const newStart = (newPage - 1) * pagination.pageSize
          const newEnd = newPage * pagination.pageSize
          setPagination({
            start: newStart,
            end: newEnd,
            page: newPage,
          })
        }}
      />
    </Box>
  )
}

export default TestPage

const reportsColumns = [
  {
    field: 'time',
    headerName: 'Creado en',
    type: 'string',
    width: 150,
    valueFormatter: ({ value }) => {
      return formatDate(value)
    },
    valueGetter: ({ value }) => {
      return dayjs(value).utc()
    },
  },
  {
    field: 'driver',
    headerName: 'Operador',
    type: 'string',
    width: 200,
  },
]
