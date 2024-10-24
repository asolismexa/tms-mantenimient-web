import { useState } from 'react'
import CustomDataGrid from '@/components/custom/CustomDataGrid'
import Box from '@mui/material/Box'
import useFetchReports from '@/hooks/useFetchReports'
import ModalCreateReports from './ModalCreateReports'
import FormCreateReport from './FormCreateReport'
import ModalAddItems from './ModalAddItems'
import TableCreateReports from './TableCreateReports'
import RowReportItem from './RowReportItem'
import { useFetchReportDetail } from '@/hooks/fetchReportDetail'
import ModalDetailReport from './ModalDetailReport'
import { useCreateReports } from '@/hooks/useCreateReports'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { createMonitorColumns } from '@/components/columns/reports/monitorColumns'
import TollBar from '@/components/Pages/MonitorReports/TollBar'
import { useReportsMonitorFilters } from '@/hooks/useReportsMonitorFilters'
import { getAggregations } from '@/utils/reportsAggregations'
import { AssignReports } from '@/components/monitors/reports/AssignReports'

const createFormInitialState = {
  vehicle: null,
  driver: null,
  shipment: null,
  items: []
}

const addItemFormInitialState = {
  type: null,
  observation: '',
  evidences: [],
  error: null
}

const initialFilters = () => ({
  folio: '',
  vehicle: '',
  odometer: '',
  driver: '',
  cell: 0,
  vehicleType: '',
  shipment: '',
  ot: '',
  status: '',
  reportType: 0,
  hasEvidences: false,
  user: '',
  assignedBy: '',
  processBy: ''
})

function ReportsMonitor () {
  const { enqueueSnackbar } = useSnackbar()
  const { reports, loading, pagination, setPagination, setRefresh } =
    useFetchReports({ pageSize: 10000, alive: true })
  const {
    reportDetail,
    loadingReportDetail,
    setReportId,
    openDetail,
    closeDetail,
    openModalDetail,
    refreshReportDetail
  } = useFetchReportDetail()

  const [tab, setTab] = useState(0)

  const [selectedRows, setSelectedRows] = useState([])

  const { onFilterChange, filteredReports } = useReportsMonitorFilters({
    initialFilters,
    reports
  })

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
    createError
  } = useCreateReports({ createFormInitialState, addItemFormInitialState })

  const handleRefreshReports = () => setRefresh((prev) => !prev)

  const onSuccessCreateReports = (resp) => {
    handleRefreshReports()
    for (const item of resp) {
      enqueueSnackbar(`Se creo con exito el reporte ${item}`, {
        variant: 'success'
      })
    }
  }

  const onFailureCreateReports = (err) => {
    console.log(err)
  }

  // Handle pagination of the reports
  const handleOnPageChange = (_, newPage) => {
    const newStart = (newPage - 1) * pagination.pageSize
    const newEnd = newPage * pagination.pageSize
    setPagination((prev) => ({
      ...prev,
      page: newPage - 1,
      start: newStart,
      end: newEnd
    }))
  }
  const handleOpenDetailModal = ({ id, row }) => {
    if (row.row_color === 'blue') return
    setReportId(id)
    openDetail()
  }

  const handleSetDetailTab = (data) => {
    if (data.field === 'has_observations' || data.field == 'last_observation') {
      setTab(1)
      return
    }

    if (data.field === 'has_evidences') {
      setTab(2)
      return
    }

    setTab(0)
  }

  return (
    <Box sx={{
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      gap: 1
    }}>
      <p>Viejo Monitor</p>
      <CustomDataGrid
        loading={loading}
        columns={createMonitorColumns({
          onFilterChange,
          aggregations: getAggregations({ reports: filteredReports })
        })}
        rows={filteredReports}
        page={pagination.page + 1}
        pageCount={pagination.pageCount}
        disableColumnMenu
        onPageChange={handleOnPageChange}
        onRowDoubleClick={handleOpenDetailModal}
        onCellDoubleClick={handleSetDetailTab}
        rowCount={reports?.length ?? 0}
        disableRowSelectionOnClick
        checkboxSelection
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(newRowSelectionModel) =>
          setSelectedRows(newRowSelectionModel)
        }
        slots={{
          toolbar: () => (
            <TollBar
              reports={reports}
              selectedRows={selectedRows}
              onOpenCreateReportsModal={onOpenCreateReportsModal}
              setRefresh={setRefresh}
            >
              <AssignReports
                selectedRows={selectedRows}
                reports={reports}
                onAssign={setRefresh}
                onClose={() => setSelectedRows([])}
              />
            </TollBar>
          ),
          footer: () => null
        }}
      />
      <ModalCreateReports
        loading={loadingCreateReport}
        open={openCreateModal}
        handleClose={onCloseCreateReportsModal}
        handleCreate={() => {
          onCreateReports({
            onSuccess: onSuccessCreateReports,
            onFailure: onFailureCreateReports
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
        vehicleTypeId={formCreateReport?.vehicle?.type_id}
      />
      <ModalDetailReport
        loading={loadingReportDetail}
        open={openModalDetail}
        handleClose={closeDetail}
        report={reportDetail}
        refreshReport={refreshReportDetail}
        refreshReports={handleRefreshReports}
        createNewReport={onOpenCreateReportsModal}
        tab={tab}
        setTab={setTab}
      />
      <SnackbarProvider />
    </Box>
  )
}

export default ReportsMonitor
