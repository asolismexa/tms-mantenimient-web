import { useState } from 'react'
import CustomDataGrid from '@/components/custom/DataGrid'
import { Box, IconButton, Stack } from '@mui/material'
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
import { useSelector } from 'react-redux'
import { selectFilters } from '@/reducers/reportMonitorSlice'
import { setAggregatedRow } from '@/components/Reports/blueRow'

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
  const { reports, loading, pagination, setPagination, setRefresh } =
    useFetchReports({ pageSize: 10000, alive: true })
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
  const filters = useSelector(selectFilters)

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

  const handleRefreshReports = () => setRefresh((prev) => !prev)

  const onSuccessCreateReports = (resp) => {
    handleRefreshReports()
    for (const item of resp) {
      enqueueSnackbar(`Se creo con exito el reporte ${item}`, {
        variant: 'success',
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
      end: newEnd,
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

  const filteredReports = () => {
    const folio = filters.folio.trim()
    const status = filters.status
    const vehicle = filters.vehicle.trim()
    const vehicleType = filters.vehicleType
    const odometer = filters.odometer
    const driver = filters.driver.toUpperCase()
    const shipment = filters.shipment.toUpperCase()
    const ot = filters.ot.toUpperCase()
    const reportType = filters.reportType
    const user = filters.user.toLowerCase()
    const userAssign = filters.userAssign.toLowerCase()
    const userProcess = filters.userProcess.toLowerCase()
    const cell = filters.cell

    let filtered = []

    // By Folio
    filtered = reports.filter((report) => {
      return filters.folio === '' || report.id.toString().includes(folio)
    })

    // By Status
    filtered = filtered.filter((report) => {
      return status == 0 || report.status_id == status
    })

    // By Vehicle
    filtered = filtered.filter((report) => {
      return filters.vehicle === '' || report.vehicle.includes(vehicle)
    })

    // By Vehicle
    filtered = filtered.filter((report) => {
      return filters.vehicle === '' || report.vehicle.includes(vehicle)
    })

    // By Vehicle Type
    filtered = filtered.filter((report) => {
      return vehicleType == 0 || report.vehicle_type_id == vehicleType
    })

    // By Odometer
    filtered = filtered.filter((report) => {
      return (
        Boolean(!odometer) || report.odometer?.toString().includes(odometer)
      )
    })

    // By Driver
    filtered = filtered.filter((report) => {
      return filters.driver === '' || report?.driver?.includes(driver)
    })

    // By Shipment
    filtered = filtered.filter((report) => {
      const shipement_id = report?.shipment_id?.toString()
      return filters.shipment === '' || shipement_id?.includes(shipment)
    })

    // By OT
    filtered = filtered.filter((report) => {
      const ot_id = report?.ot?.toString()
      return filters.ot === '' || ot_id?.includes(ot)
    })

    // By Report Type
    filtered = filtered.filter((report) => {
      return reportType == 0 || report.report_type_id == reportType
    })

    // By User
    filtered = filtered.filter((report) => {
      return filters.user === '' || report?.user?.toLowerCase()?.includes(user)
    })

    // By User Assign
    filtered = filtered.filter((report) => {
      return (
        filters.userAssign === '' ||
        report?.assigned_by?.toLowerCase()?.includes(userAssign)
      )
    })

    // By Use Process
    filtered = filtered.filter((report) => {
      return (
        filters.userProcess === '' ||
        report?.process_by?.toLowerCase().includes(userProcess)
      )
    })

    // By Cell Id
    filtered = filtered.filter((report) => {
      return cell == 0 || report.cell_id == cell
    })

    return filtered
  }

  const getRows = () => {
    const reports = filteredReports()
    return [setAggregatedRow(reports), ...reports]
  }

  return (
    <Box sx={{ m: 2 }}>
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
      </Stack>
      <CustomDataGrid
        loading={loading}
        columns={reportsColumns}
        rows={getRows()}
        page={pagination.page + 1}
        pageCount={pagination.pageCount}
        onPageChange={handleOnPageChange}
        onRowDoubleClick={handleOpenDetailModal}
        rowHeight={65}
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
