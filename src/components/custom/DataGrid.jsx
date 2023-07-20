import { Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomPagination from '../Core/Pagination'

function CustomDataGrid({
  rows,
  columns,
  page,
  pageCount,
  onPageChange,
  slots,
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
          paginationMode="server"
          pagination
          sx={{
            width: '100%',
            height: '80vh',
          }}
          columns={columns}
          rows={rows}
          slots={{
            ...(slots ? slots : {}),
            pagination: () => null,
          }}
          hideFooter={false}
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
