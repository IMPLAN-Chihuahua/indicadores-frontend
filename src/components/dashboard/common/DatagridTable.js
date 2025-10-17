import { DataGrid, esES } from '@mui/x-data-grid';
import './common.css'


const DatagridTable = (props) => {
  const { columns, rows, handlePageChange,
    handlePageSizeChange, perPage, page, isLoading, total, ...settings } = props
  return (
    <DataGrid
      sx={{ background: 'white' }}
      loading={isLoading}
      editMode='row'
      paginationMode='server'
      rows={rows}
      columns={columns}
      rowsPerPageOptions={[5, 10, 20, 25, 50, 100]}
      pageSize={perPage}
      page={page - 1}
      rowCount={total}
      onPageChange={(page) => {
        if (isNaN(parseInt(page))) return;
        handlePageChange(parseInt(page) === 0 ? 1 : parseInt(page) + 1)
      }}
      onPageSizeChange={size => {
        if (isNaN(parseInt(size))) return;
        handlePageSizeChange(parseInt(size))
      }}
      disableSelectionOnClick
      checkboxSelection
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      {...settings}
    />
  )
}


export default DatagridTable;