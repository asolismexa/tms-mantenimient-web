import { useState } from 'react'
import CustomDataGrid from '@/components/custom/DataGrid'
import {
  Box,
  Alert,
  Grid,
  Button,
  Stack,
  TextField,
  IconButton,
} from '@mui/material'
import { formatDate, utcToLocal } from '@/utils/dates'
import { useFetchReportDetail } from '@/hooks/fetchReportDetail'
import ModalDetailReport from '../MonitorReports/ModalDetailReport'
import { SnackbarProvider } from 'notistack'
import { useSearchReports } from './useSearchReports'
import ReplayIcon from '@mui/icons-material/Replay'
import AutoCompleteVehicles from '../MonitorReports/AutoCompleteVehicles'

function ReportsMonitor() {
  const { reports, loading, searchReports, error, pagination, setPagination } =
    useSearchReports({ pageSize: 100 })
  const {
    reportDetail,
    loadingReportDetail,
    setReportId,
    openDetail,
    closeDetail,
    openModalDetail,
    refreshReportDetail,
  } = useFetchReportDetail()

  // Handle pagination of the reports
  const handleOnPageChange = (_, newPage) => {
    const newStart = (newPage - 1) * pagination.pageSize
    const newEnd = newPage * pagination.pageSize
    setPagination((prev) => ({
      ...prev,
      page: newPage - 1,
      start: newStart,
      end: newEnd,
    }))
    searchReports()
  }
  const handleOpenDetailModal = ({ id }) => {
    setReportId(id)
    openDetail()
  }

  const handleSearch = () => {
    searchReports()
  }

  return (
    <Box sx={{ m: 2 }}>
      {Boolean(error) && (
        <Alert sx={{ my: 1 }} severity="error">
          {error}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Stack direction="row">
            <Button fullWidth onClick={handleSearch}>
              BUSCAR
            </Button>
            <IconButton size="small">
              <ReplayIcon />
            </IconButton>
          </Stack>
          <Stack>
            <TextField fullWidth label="FOLIO" margin="dense" size="small" />
            <AutoCompleteVehicles
              inputProps={{
                fullWidth: true,
              }}
            />
            <TextField fullWidth label="FOLIO" margin="dense" size="small" />
            <TextField fullWidth label="FOLIO" margin="dense" size="small" />
            <TextField fullWidth label="FOLIO" margin="dense" size="small" />
            <TextField fullWidth label="FOLIO" margin="dense" size="small" />
            <TextField fullWidth label="FOLIO" margin="dense" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <CustomDataGrid
            loading={loading}
            columns={reportsColumns}
            rows={reports}
            page={pagination.page + 1}
            pageCount={pagination.pageCount}
            onPageChange={handleOnPageChange}
            onRowDoubleClick={handleOpenDetailModal}
            disableColumnSelector
            disableDensitySelector
          />
        </Grid>
      </Grid>
      <SnackbarProvider />
      <ModalDetailReport
        loading={loadingReportDetail}
        open={openModalDetail}
        handleClose={closeDetail}
        report={reportDetail}
        refreshReport={refreshReportDetail}
      />
    </Box>
  )
}

export default ReportsMonitor

const reportsColumns = [
  {
    field: 'number',
    headerName: 'FOLIO',
    width: 200,
  },
  {
    field: 'time',
    headerName: 'FECHA / HORA REPORTE',
    type: 'dateTime',
    width: 200,
    valueFormatter: ({ value }) => {
      return formatDate(value)
    },
    valueGetter: ({ value }) => {
      return value ? utcToLocal(value) : 'Sin fecha'
    },
  },
  {
    field: 'vehicle',
    headerName: 'UNIDAD',
  },
  {
    field: 'driver',
    headerName: 'OPERADOR',
    width: 260,
  },
  {
    field: 'shipment_id',
    headerName: 'SOLICITUD',
  },
  {
    field: 'ot',
    headerName: 'OT',
  },
  {
    field: 'status',
    headerName: 'ESTATUS',
    width: 100,
  },
  {
    field: 'report_type',
    headerName: 'TIPO FALLA',
    width: 200,
  },
  {
    field: 'has_observations',
    headerName: 'OBS',
    type: 'boolean',
    width: 100,
  },
  {
    field: 'has_evidences',
    headerName: 'EVID',
    type: 'boolean',
    width: 100,
  },
  {
    field: 'user',
    headerName: 'USUARIO',
    type: 'string',
    width: 130,
  },
  {
    field: 'assigned_on',
    headerName: 'FECHA ASIGNADO',
    type: 'dateTime',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
    valueGetter: ({ value }) => {
      value ? utcToLocal(value) : null
    },
  },
  {
    field: 'assigned_by',
    headerName: 'USUARIO ASIGNA',
    type: 'string',
    width: 100,
  },
  {
    field: 'attended_on',
    headerName: 'FECHA ATIENDE',
    type: 'dateTime',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
    valueGetter: ({ value }) => {
      value ? utcToLocal(value) : null
    },
  },
  {
    field: 'attended_by',
    headerName: 'USUARIO ATIENDE',
    type: 'string',
    width: 100,
  },
  {
    field: 'validated_on',
    headerName: 'FECHA VALIDA',
    type: 'dateTime',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
    valueGetter: ({ value }) => {
      return value ? utcToLocal(value) : null
    },
  },
  {
    field: 'validated_by',
    headerName: 'USUARIO VALIDA',
    type: 'string',
    width: 100,
  },
  {
    field: 'validated_success',
    headerName: 'VALIDADACION EXITOSA',
    type: 'boolean',
    width: 100,
    valueFormatter: ({ value }) => {
      console.log(value)
      return value
    },
  },
]
