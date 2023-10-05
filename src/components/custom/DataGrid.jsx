import { Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomPagination from '../Core/Pagination'
import CustomExportToolbar from '@/components/custom/CustomExportToolbar'

function CustomDataGrid({
  rows,
  columns,
  page,
  pageCount,
  onPageChange,
  ...props
}) {
  return (
    <Grid
      sx={{
        width: '100%',
        padding: '0 !important',
        margin: '0 !important',
      }}
      container
      spacing={2}
    >
      <Grid
        sx={{
          padding: '0 !important',
          margin: '0 !important',
        }}
        item
        xs={12}
      >
        <DataGrid
          sx={{
            height: '70vh',
          }}
          rows={rows}
          columns={columns}
          density="comfortable"
          getRowHeight={() => 'auto'}
          paginationMode="server"
          slots={{
            toolbar: CustomExportToolbar,
            footer: () => null,
          }}
          getRowClassName={({ row, indexRelativeToCurrentPage }) => {
            let className =
              indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            if (row.isConsolidated) className += 'consolidated'
            return className
          }}
          localeText={{
            toolbarExport: 'Exportar',
            toolbarExportCSV: 'CSV',
          }}
          {...props}
        />
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
        item
        xs={12}
      >
        <CustomPagination
          page={page}
          onChange={onPageChange}
          count={pageCount}
        />
      </Grid>
    </Grid>
  )
}

export default CustomDataGrid
