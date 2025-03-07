import { DataGrid, esES } from '@mui/x-data-grid';
import './common.css'
import { setGlobalPerPage } from '../../../utils/objects';

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
      onPageChange={handlePageChange}
      onPageSizeChange={size => {
        setGlobalPerPage(size)
        handlePageSizeChange(size)
      }}
      disableSelectionOnClick
      checkboxSelection
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      {...settings}
    />
  )
}


export default DatagridTable;