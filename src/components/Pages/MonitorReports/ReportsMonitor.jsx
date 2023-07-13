import { useState } from 'react'
import CustomDataGrid from '@/components/custom/DataGrid'
import { Box, Alert, IconButton, TextField, Stack } from '@mui/material'
import useFetchReports from '@/hooks/useFetchReports'
import { NoteAdd, Refresh } from '@mui/icons-material'
import ModalCreateReports from './ModalCreateReports'
import FormCreateReport from './FormCreateReport'
import ModalAddItems from './ModalAddItems'
import TableCreateReports from './TableCreateReports'
import RowReportItem from './RowReportItem'
import { useFetchReportDetail } from '@/hooks/fetchReportDetail'
import ModalDetailReport from './ModalDetailReport'
import { useCreateReports } from '@/hooks/useCreateReports'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { reportsColumns } from '@/components/Reports/columns'

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
  const { enqueueSnackbar } = useSnackbar()
  const { reports, loading, error, pagination, setPagination, setRefresh } =
    useFetchReports({ pageSize: 100 })
  const {
    reportDetail,
    loadingReportDetail,
    setReportId,
    openDetail,
    closeDetail,
    openModalDetail,
    refreshReportDetail,
  } = useFetchReportDetail()
  const [tab, setTab] = useState(0)

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
  const [filter, setFilter] = useState('')

  const handleRefreshReports = () => setRefresh((prev) => !prev)

  const onSuccessCreateReports = (resp) => {
    console.log('onSuccessCreateReports')
    console.log(resp)
    handleRefreshReports()
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
  }
  const handleOpenDetailModal = ({ id }) => {
    setReportId(id)
    openDetail()
  }

  const handleSetDetailTab = (data) => {
    if (data.field === 'has_observations') {
      setTab(1)
      return
    }

    if (data.field === 'has_evidences') {
      setTab(2)
      return
    }

    setTab(0)
  }

  const filteredReports = () =>
    reports.filter((report) => {
      const filt = filter.toLowerCase().trim()
      return (
        report?.id?.toString().toLowerCase().includes(filt) ||
        report?.vehicle?.toLowerCase().includes(filt) ||
        report?.driver?.toLowerCase().includes(filt) ||
        report?.user?.toLowerCase().includes(filt) ||
        report?.shipment_id?.toString().toLowerCase().includes(filt) ||
        report?.ot?.toString().toLowerCase().includes(filt)
      )
    })

  return (
    <Box sx={{ m: 2 }}>
      {Boolean(error) && (
        <Alert sx={{ my: 1 }} severity="error">
          {error}
        </Alert>
      )}
      <Stack direction="row" spacing={3}>
        <IconButton
          onClick={onOpenCreateReportsModal}
          color="primary"
          size="large"
        >
          <NoteAdd />
        </IconButton>
        <IconButton
          onClick={() => {
            setRefresh((prev) => !prev)
          }}
          color="primary"
          size="large"
        >
          <Refresh />
        </IconButton>
        <TextField
          variant="standard"
          label="BUSCAR"
          margin="dense"
          size="small"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </Stack>
      <CustomDataGrid
        loading={loading}
        columns={reportsColumns}
        rows={filteredReports()}
        page={pagination.page + 1}
        pageCount={pagination.pageCount}
        onPageChange={handleOnPageChange}
        onRowDoubleClick={handleOpenDetailModal}
        getRowHeight={() => 'auto'}
        onCellDoubleClick={handleSetDetailTab}
        disableColumnSelector
        disableDensitySelector
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
