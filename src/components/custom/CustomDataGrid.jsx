import CustomExportToolbar from '@/components/custom/CustomExportToolBar'
import { DataGrid } from '@mui/x-data-grid'

/**
 * Custom DataGrid
 */
function CustomDataGrid ({
  rows = [],
  columns = [],
  loading = false,
  rowCount = 0,
  pageNumber = 1,
  totalPages = 1,
  onPaginationChange,
  ...props
}) {
  return (
    <DataGrid
      columnHeaderHeight={70}
      rows={rows}
      columns={columns}
      loading={loading}
      density="comfortable"
      rowCount={rowCount}
      getRowHeight={() => 'auto'}
      paginationMode="server"
      slots={{
        toolbar: CustomExportToolbar
      }}
      getRowClassName={({ row, indexRelativeToCurrentPage }) => {
        let className = indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        if (row.isConsolidated) className += 'consolidated'
        return className
      }}
      localeText={{
        toolbarExport: 'Exportar',
        toolbarExportCSV: 'CSV'
      }}
      {...props}
    />
  )
}

export default CustomDataGrid
