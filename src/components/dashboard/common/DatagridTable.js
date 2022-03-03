import React from 'react';
import { DataGrid, GridToolbar, enUS, esES } from '@mui/x-data-grid';
import './common.css'
import FormModel from '../forms/model/FormModel';
import FormModal from './FormModal';

const DatagridTable = ({data}) => {
    const [columns,rows,modalEdit] = data;

    const [clickInfo, setClickInfo] = React.useState({row: {temaIndicador: ''}});
    const handleClick = (params) => {
      if(params.field != 'urlImagen'){
        setOpenModal(prev => !prev)
        setClickInfo(params.row);
      }else {
        console.log('test');
      }
    };

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
        // components={{ Toolbar: GridToolbar }}
        onCellClick={handleClick}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },        
        }}
        />
        <FormModal open={openModal} setOpenModal={setOpenModal} title={`Editar módulo ${clickInfo.temaIndicador}`}> 
          <FormModel data={clickInfo}/>
        </FormModal>
    </>
    )
}


export default DatagridTable;