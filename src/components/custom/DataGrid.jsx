import { Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomPagination from '../Core/Pagination'

function CustomDataGrid({
  rows,
  columns,
  page,
  pageCount,
  onPageChange,
  ...props
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataGrid
          sx={{
            height: '400px',
            maxHeight: '400px',
          }}
          filterMode="server"
          disableColumnFilter
          columns={columns}
          rows={rows}
          slots={{
            pagination: () => null,
            footer: () => null,
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
