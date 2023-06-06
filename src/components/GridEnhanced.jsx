import { DataGrid } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { CustomPagination } from '@components/CustomPagination'

const DataGridEnhanced = (props) => {
  const {
    rows,
    pagination,
    columns,
    onPageChangeAction,
    onRowClickAction,
    itemSelected,
    loading,
    checkboxSelection,
    sorting,
    setSortingModel,
    error,
    columnVisibilityModel,
  } = props
  const dispatch = useDispatch()
  return (
    <div style={{ height: '81vh', width: '100%' }}>
      <DataGrid
        getRowHeight={() => 'auto'}
        page={pagination.current_page}
        pagination
        rowCount={pagination.total_items}
        hideFooter={false}
        rows={rows}
        columns={columns}
        paginationMode="server"
        sortingMode="server"
        columnVisibilityModel={columnVisibilityModel}
        getRowClassName={(params) => {
          let className =
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          const { row } = params
          if (row.is_consolidated_row) className += ' consolidated'
          return className
        }}
        onPageChange={(newPage) => {
          dispatch(onPageChangeAction({ newPage }))
        }}
        components={{
          Pagination: CustomPagination,
          ErrorOverlay: () => <div>Error</div>,
        }}
        componentsProps={{
          pagination: {
            pageCount: pagination.total_pages,
          },
        }}
        onSelectionModelChange={(itemId) => {
          dispatch(onRowClickAction(itemId))
        }}
        error={error}
        selectionModel={itemSelected}
        loading={loading}
        checkboxSelection={checkboxSelection}
        sortModel={sorting}
        onSortModelChange={(model) => {
          let modelSort = [...model]
          if (model.length === 0) {
            const { field, sort } = sorting[0]
            modelSort = [{ field, sort: sort === 'asc' ? 'desc' : 'asc' }]
          }
          dispatch(setSortingModel(modelSort))
          dispatch(onPageChangeAction({ newPage: 0 }))
        }}
      />
    </div>
  )
}

export { DataGridEnhanced }
