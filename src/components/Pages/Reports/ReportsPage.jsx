import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import reportsColumns from './ReportsGridColumns'
import { DataGrid, esES } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { IconButton, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectAuth } from '@/reducers/authSlice'
import Filters from './ReportsFilters'
import CreateReportForm from './CreateReportForm'
import CustomPagination from '@/components/Core/Pagination'
import { getReports } from '@/services/reports'
import { showForm } from '@/reducers/createReportFormSlice'
import { openDialog, fetchReportDetail } from '@/reducers/reportDetail'
import DialogReportDetail from './DialogReportDetail'

function ReportsPage() {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)
  const { token } = auth
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [pagination, setPagination] = useState({
    page: 1,
    start: 0,
    end: 20,
    step: 20,
  })

  const handleOpen = () => {
    dispatch(showForm())
  }

  useEffect(() => {
    const config = {
      params: {
        start: pagination.start,
        end: pagination.end,
      },
      headers: {
        sort: '-time',
      },
    }

    setLoading(true)
    getReports(config).then(({ data, error, resp }) => {
      if (error) return
      setLoading(false)
      setReports(data)
      setTotalPages(JSON.parse(resp.headers['x-pagination']).total_pages)
    })
  }, [pagination])

  const handleSearch = (form) => {
    setLoading(true)
    const params = {
      ...form,
      from_time: form.start_date,
      to_time: form.end_date,
      status_id: form.status ? form.status.id : null,
      type_id: form.type ? form.type.id : null,
      user: form.user ? form.user.id : null,
      driver: form.driver ? form.driver.id : null,
      vehicle: form.vehicle ? form.vehicle.id : null,
      start: pagination.start,
      end: pagination.end,
    }

    getReports({ params, headers: { sort: '-time' } }).then(
      ({ data, resp }) => {
        setLoading(false)
        setReports(data)
        setTotalPages(JSON.parse(resp.headers['x-pagination']).total_pages)
      },
    )
  }

  const handleChangePage = (_, value) => {
    if (pagination.page == value) return
    const start = (value - 1) * pagination.step
    const end = start + pagination.step
    setPagination({ ...pagination, start, end, page: value })
  }

  return (
    <div>
      <CreateReportForm />
      <DialogReportDetail />
      <Box sx={{ margin: 2 }}></Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Filters onSearch={handleSearch} token={token} />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={3.0}>
            <Grid item md="auto">
              <IconButton onClick={handleOpen} color="primary" size="large">
                <NoteAddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <DataGrid
            disableColumnFilter
            rows={reports}
            loading={loading}
            sx={{ height: 470 }}
            columns={reportsColumns}
            onRowDoubleClick={(row) => {
              dispatch(
                fetchReportDetail({
                  reportId: row.row.id,
                }),
              )
              dispatch(openDialog())
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            slots={{
              pagination: () => null,
              footer: () => null,
            }}
          />
          <CustomPagination
            page={pagination.page}
            count={totalPages}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default ReportsPage
