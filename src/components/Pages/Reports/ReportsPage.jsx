import CustomDataGrid from '@/components/custom/DataGrid'
import {
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  Grid,
} from '@mui/material'
import { dateTimeToString, fromStringToDate } from '@/utils/dates'
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
import { useGridApiRef } from '@mui/x-data-grid'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { createSearchColumns } from '@/components/columns/reports/searchColumns'
import { getAggregations } from '@/utils/reportsAggregations'

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
              value={filters.status}
              extendOptions={[
                {
                  id: 8,
                  name: '[CERRADOS]',
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
              ampm={false}
              onChange={(val) => handleChangeDate('from_time', val)}
              value={getDateValue(filters.from_time)}
              disabled={!filters.status}
            />
            <DateTimePicker
              fullWidth
              format="DD / MM / YYYY"
              label="FECHA FIN"
              margin="dense"
              ampm={false}
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
            columns={createSearchColumns({
              aggregations: getAggregations({ reports }),
            })}
            rows={reports}
            rowHeight={65}
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
