import { useState, useEffect } from 'react'
import api from '@/api/api'
import reportsColumns from './ReportsGridColumns'
import { DataGrid, esES } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { IconButton, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectAuth } from '@/reducers/authSlice'
import Filters from './ReportsFilters'

function ReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const auth = useSelector(selectAuth)
  const { token } = auth

  useEffect(() => {
    setLoading(true)
    api
      .get(`/api/reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReports(response.data)
        setLoading(false)
      })
  }, [token])

  const handleSearch = (form) => {
    setLoading(true)
    console.log(form)
    api
      .get(`/api/reports`, {
        params: {
          ...form,
          from_time: form.start_date,
          to_time: form.end_date,
          status_id: form.status ? form.status.id : null,
          type_id: form.type ? form.type.id : null,
          user: form.user ? form.user.id : null,
          driver: form.driver ? form.driver.id : null,
          vehicle: form.vehicle ? form.vehicle.id : null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false)
        setReports(response.data)
      })
  }

  return (
    <div>
      <Box sx={{ margin: 2 }}></Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Filters onSearch={handleSearch} token={token} />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={3.0}>
            <Grid item md="auto">
              <IconButton color="primary" size="large">
                <NoteAddIcon />
              </IconButton>
            </Grid>
            <Grid item md="auto">
              <IconButton color="primary" size="large">
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
          <DataGrid
            loading={loading}
            sx={{ height: '100vh' }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              sorting: {
                sortModel: [{ field: 'created_on', sort: 'desc' }],
              },
            }}
            rows={reports}
            columns={reportsColumns}
            checkboxSelection
            onRowDoubleClick={(row) => console.log(row)}
            disableColumnFilter
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default ReportsPage
