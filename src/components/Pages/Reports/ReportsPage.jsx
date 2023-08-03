import CustomDataGrid from '@/components/custom/DataGrid'
import {
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  Grid,
} from '@mui/material'
import CheckLogo from '@/components/Core/CheckLogo'
import {
  formatDate,
  utcToLocal,
  dateTimeToString,
  fromStringToDate,
} from '@/utils/dates'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectReportsQuery,
  setFilters,
  setDetailTab,
  resetFilters,
  searchReports,
  fetchReportDetail,
  resetDetail,
} from '@/reducers/reportsQuerySlice'
import AutoCompleteStatus from '../MonitorReports/AutoCompleteStatus'
import AutoCompleteTypes from '../MonitorReports/AutoCompleteTypes'
import AutoCompleteVehicles from '../MonitorReports/AutoCompleteVehicles'
import AutoCompleteDrivers from '../MonitorReports/AutoCompleteAsyncDrivers'
import { DateTimePicker } from '@mui/x-date-pickers'
import ModalDetailReport from '../MonitorReports/ModalDetailReport'
import ModalCreateReports from '../MonitorReports/ModalCreateReports'
import FormCreateReport from '../MonitorReports/FormCreateReport'
import TableCreateReports from '../MonitorReports/TableCreateReports'
import RowReportItem from '../MonitorReports/RowReportItem'
import { useSnackbar } from 'notistack'
import { useCreateReports } from '@/hooks/useCreateReports'
import ModalAddItems from '../MonitorReports/ModalAddItems'
import { NoteAdd } from '@mui/icons-material'
import { mettersToKilometers } from '@/utils/numbers'
import { useGridApiRef } from '@mui/x-data-grid'
import SaveAltIcon from '@mui/icons-material/SaveAlt'

const inputStyles = {
  width: '100%',
  inputProps: {
    size: 'small',
  },
}

const createFormInitialState = {
  vehicle: null,
  driver: null,
  shipment: null,
  items: [],
}

const addItemFormInitialState = {
  type: null,
  observation: '',
  evidences: [],
  error: null,
}

function ReportsMonitor() {
  const gridRef = useGridApiRef()
  console.log(gridRef)
  const { filters, reports, loadingReports, detail } =
    useSelector(selectReportsQuery)
  const dispatch = useDispatch()
  const {
    formCreateReport,
    setFormCreateReport,
    formAddItem,
    setFormAddItem,
    loadingCreateReport,
    openCreateModal,
    openAddItemModal,
    closeAddReportItemModal,
    onOpenAddItemModal,
    onAddReportItem,
    onDeleteReportItem,
    onOpenCreateReportsModal,
    onCloseCreateReportsModal,
    onCreateReports,
    createError,
  } = useCreateReports({ createFormInitialState, addItemFormInitialState })
  const { enqueueSnackbar } = useSnackbar()

  const handleChangeFilter = (filter, value) => {
    dispatch(setFilters({ ...filters, [filter]: value }))
  }

  const handleCleanFilters = () => {
    dispatch(resetFilters())
  }

  const handleSearchReports = () => {
    dispatch(searchReports())
  }

  const handleChangeDate = (filter, date) => {
    // Convert date to UTC
    const utcDate = dateTimeToString(date)
    dispatch(setFilters({ ...filters, [filter]: utcDate }))
  }

  const handleChangeDetailTab = (tab) => {
    dispatch(setDetailTab(tab))
  }

  const handleOnCloseDetail = () => {
    dispatch(resetDetail())
  }

  const getDateValue = (date) => {
    if (date) {
      return new fromStringToDate(date)
    }
    return null
  }

  const handleSelectReport = ({ id }) => {
    dispatch(fetchReportDetail(id))
  }

  const onSuccessCreateReports = (resp) => {
    console.log('onSuccessCreateReports')
    console.log(resp)
    for (const item of resp) {
      enqueueSnackbar(`Se creo con exito el reporte ${item.data}`, {
        variant: 'success',
      })
    }
  }

  const onFailureCreateReports = (err) => {
    console.log('onErrorCreateReports')
    console.log(err)
  }

  return (
    <div
      style={{
        padding: '0 1rem',
      }}
    >
      <Typography variant="h6">Reportes</Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Stack direction="row" spacing={3} alignItems="center">
            <IconButton
              onClick={onOpenCreateReportsModal}
              color="primary"
              size="large"
            >
              <NoteAdd />
            </IconButton>
            <IconButton
              color="primary"
              size="large"
              onClick={() => {
                gridRef.current.exportDataAsCsv()
              }}
            >
              <SaveAltIcon />
            </IconButton>
          </Stack>
          <Stack sx={{ mt: 1 }} spacing={1}>
            <Button fullWidth onClick={handleSearchReports}>
              BUSCAR
            </Button>
            <Button fullWidth size="small" onClick={handleCleanFilters}>
              LIMPIAR FILTROS
            </Button>
            <TextField
              fullWidth
              label="FOLIO"
              margin="dense"
              size="small"
              onChange={(e) => handleChangeFilter('folio', e.target.value)}
              value={filters.folio}
            />
            <AutoCompleteStatus
              onChange={(_, value) => handleChangeFilter('status', value)}
              exclude={[6]}
              value={filters.status}
              extendOptions={[
                {
                  id: 8,
                  name: 'CERRADOS',
                },
              ]}
            />
            <AutoCompleteTypes
              {...inputStyles}
              onChange={(_, value) => handleChangeFilter('type', value)}
              value={filters.type}
            />
            <TextField
              fullWidth
              label="OT"
              margin="dense"
              size="small"
              onChange={(e) => handleChangeFilter('ot', e.target.value)}
              value={filters.ot}
            />
            <AutoCompleteVehicles
              {...inputStyles}
              onChange={(_, value) => handleChangeFilter('vehicle', value)}
              value={filters.vehicle}
            />
            <AutoCompleteDrivers
              {...inputStyles}
              onChange={(_, value) => handleChangeFilter('driver', value)}
              value={filters.driver}
            />
            <DateTimePicker
              fullWidth
              format="DD / MM / YYYY"
              label="FECHA INICIO"
              margin="dense"
              size="small"
              onChange={(val) => handleChangeDate('from_time', val)}
              value={getDateValue(filters.from_time)}
              disabled={!filters.status}
            />
            <DateTimePicker
              fullWidth
              format="DD / MM / YYYY"
              label="FECHA FIN"
              margin="dense"
              size="small"
              onChange={(val) => handleChangeDate('to_time', val)}
              value={getDateValue(filters.to_time)}
              disabled={!filters.status}
            />
          </Stack>
        </Grid>
        <Grid item xs={10}>
          <CustomDataGrid
            loading={loadingReports}
            getRowHeight={() => 'auto'}
            columns={columns}
            rows={reports}
            disableColumnSelector
            disableDensitySelector
            onRowDoubleClick={handleSelectReport}
            apiRef={gridRef}
          />
        </Grid>
      </Grid>
      <ModalDetailReport
        open={detail.open}
        loading={detail.loading}
        tab={detail.tab}
        handleClose={handleOnCloseDetail}
        report={detail.report}
        setTab={handleChangeDetailTab}
        refreshReport={() => {
          dispatch(fetchReportDetail(detail.report.id))
        }}
        createNewReport={onOpenCreateReportsModal}
      />
      <ModalCreateReports
        loading={loadingCreateReport}
        open={openCreateModal}
        handleClose={onCloseCreateReportsModal}
        handleCreate={() => {
          onCreateReports({
            onSuccess: onSuccessCreateReports,
            onFailure: onFailureCreateReports,
          })
        }}
        error={createError}
      >
        <FormCreateReport form={formCreateReport} setForm={setFormCreateReport}>
          {formCreateReport.vehicle && (
            <TableCreateReports
              items={formCreateReport.items}
              onAddItem={onOpenAddItemModal}
            >
              {formCreateReport.items.map((item) => (
                <RowReportItem
                  key={item.id}
                  report={item}
                  onDelete={onDeleteReportItem}
                />
              ))}
            </TableCreateReports>
          )}
        </FormCreateReport>
      </ModalCreateReports>
      <ModalAddItems
        open={openAddItemModal}
        form={formAddItem}
        setForm={setFormAddItem}
        onClose={closeAddReportItemModal}
        onAdd={onAddReportItem}
      />
    </div>
  )
}

export default ReportsMonitor

const columns = [
  {
    field: 'id',
    headerName: 'FOLIO',
    width: 100,
  },
  {
    field: 'time',
    headerName: 'FECHA / HORA REPORTE',
    type: 'dateTime',
    width: 120,
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
    width: 100,
  },
  {
    field: 'odometer',
    headerName: 'ODOMETRO',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return mettersToKilometers(value)
      return null
    },
  },
  {
    field: 'driver',
    headerName: 'OPERADOR',
    width: 100,
  },
  {
    field: 'shipment_id',
    headerName: 'SOLICITUD',
    width: 100,
  },
  {
    field: 'ot',
    headerName: 'OT',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'ESTATUS',
    width: 100,
  },
  {
    field: 'report_type',
    headerName: 'TIPO FALLA',
    width: 100,
  },
  {
    field: 'has_observations',
    headerName: 'OBS',
    type: 'boolean',
    width: 50,

    renderCell: ({ value }) => {
      if (value === null) return null
      return <CheckLogo checked={value} />
    },
  },
  {
    field: 'has_evidences',
    headerName: 'EVID',
    type: 'boolean',
    width: 50,
    renderCell: ({ value }) => {
      if (value === null) return null
      return <CheckLogo checked={value} />
    },
  },
  {
    field: 'user',
    headerName: 'USUARIO',
    type: 'string',
    width: 100,
  },
  {
    field: 'assigned_on',
    headerName: 'FECHA OT ASIGNADA',
    type: 'string',
    width: 120,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'assigned_by',
    headerName: 'USUARIO ASIGNA OT',
    type: 'string',
    width: 100,
  },
  {
    field: 'process_on',
    headerName: 'FECHA OT EN PROCESO',
    type: 'string',
    width: 120,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'process_by',
    headerName: 'USUARIO PROCESA OT',
    type: 'string',
    width: 100,
  },
  {
    field: 'attended_on',
    headerName: 'FECHA OT FINALIZADA',
    type: 'string',
    width: 120,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'attended_by',
    headerName: 'USUARIO FINALIZA OT',
    type: 'string',
    width: 100,
  },
  {
    field: 'canceled_on',
    headerName: 'FECHA OT CANCELADA',
    type: 'string',
    width: 100,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'canceled_by',
    headerName: 'USUARIO CANCELA OT',
    type: 'string',
    width: 100,
  },
  {
    field: 'validated_on',
    width: 100,
    headerName: 'FECHA OT EVALUADA',
    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'validated_by',
    headerName: 'USUARIO EVALUA OT',
  },
  {
    headerName: 'EVALUADO CORRECTO',
    field: 'validated_success',
    type: 'boolean',
    width: 100,
    renderCell: ({ value }) => {
      if (value === null) return null
      return <CheckLogo checked={value} />
    },
  },
  {
    field: 'ot_date',
    headerName: 'FECHA OT',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
  {
    field: 'ot_initial_date',
    headerName: 'FECHA INICIO OT',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
  {
    field: 'ot_promise_date',
    headerName: 'FECHA PROMESA OT',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
]
