import { Box, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomPagination from '../Core/Pagination'
import CustomExportToolbar from '@/components/custom/CustomExportToolbar'

function CustomDataGrid ({
  rows,
  columns,
  page,
  pageCount,
  onPageChange,
  ...props
}) {
  return (
    <Box sx={{ height: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          density="comfortable"
          paginationMode="server"
          slots={{
            toolbar: CustomExportToolbar,
            footer: () => null
          }}
          getRowClassName={({ row, indexRelativeToCurrentPage }) => {
            let className =
              indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            if (row.isConsolidated) className += 'consolidated'
            return className
          }}
          localeText={{
            toolbarExport: 'Exportar',
            toolbarExportCSV: 'CSV'
          }}
          {...props}
        />
        <CustomPagination
          page={page}
          onChange={onPageChange}
          count={pageCount}
        />
    </Box>
  )
}

export default CustomDataGrid
