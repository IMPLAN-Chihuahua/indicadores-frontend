import React from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import './common.css'

const DatagridTable = ({ data }) => {
  const [columns, rows, topic] = data;
  const navigate = useNavigate();
  return (
    <>
      <DataGrid
        editMode='row'
        rows={rows}
        autoHeight
        columns={columns}
        disableSelectionOnClick
        hideFooter={true}
        columnBuffer={2}
        columnThreshold={2}
        // onRowClick={(params) => {
        //   if (topic === 'indicador') {
        //     navigate(`/indicadores/${params.id}`, [navigate])
        //   }
        // }}
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