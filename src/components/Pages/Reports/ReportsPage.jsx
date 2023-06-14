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
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'

function ReportsPage() {
  const [reports, setReports] = useState([])
  const auth = useSelector(selectAuth)
  const { token } = auth

  useEffect(() => {
    api
      .get(`/api/reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReports(response.data)
      })
  }, [token])

  return (
    <div>
      {reports.length === 0 && <LoadingBackdrop open />}
      <Box sx={{ margin: 2 }}>
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
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              sorting: {
                sortModel: [{ field: 'created_on', sort: 'desc' }],
              },
            }}
            rows={reports}
            columns={reportsColumns}
            autoHeight
            checkboxSelection
            onRowDoubleClick={(row) => console.log(row)}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default ReportsPage
