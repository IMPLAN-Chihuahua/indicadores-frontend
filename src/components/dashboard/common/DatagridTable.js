import React from 'react';
import { DataGrid, GridToolbar, enUS, esES } from '@mui/x-data-grid';
import './common.css'

const DatagridTable = ({data}) => {
    const [columns,rows,modalEdit] = data;
    const [openModal, setOpenModal] = React.useState(false);

    return (
      <>
      <DataGrid
        rows={rows}
        autoHeight
        columns={columns}
        disableSelectionOnClick
        hideFooter = {true}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },        
        }}
        />
    </>
    )
}


export default DatagridTable;