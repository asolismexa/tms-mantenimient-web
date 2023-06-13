import { useState, useEffect } from 'react'
import axios from 'axios'
import reportsColumns from './ReportsGridColumns'
import { DataGrid, esES } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { IconButton, Box } from '@mui/material'

function ReportsPage() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    axios
      .get('https://localhost:44348/api/reports', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTQ5MSIsImV4cCI6MTY4NjcxMjE1MCwiaXNzIjoiaHR0cDovL3Rtcy5sb2dzeXMuY29tLm14IiwiYXVkIjoibG9nc3lzIn0._R46g8RiP-8n3LH96MJMrA1GXHPQMj9ycSgF0yZNnWg',
        },
      })
      .then((response) => {
        setReports(response.data)
      })
  }, [])

  return (
    <div>
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
