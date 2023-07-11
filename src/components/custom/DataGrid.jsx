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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataGrid
          paginationMode="server"
          pagination
          sx={{
            height: '450px',
            maxHeight: '450px',
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
