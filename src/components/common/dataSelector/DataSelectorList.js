import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useContext } from 'react'
import { DataContext } from './DataContext';

const columns = [
    { id: 'id', label: '#', minWidth: 25 },
    { id: 'name', label: 'Nombre', minWidth: 50},
    { id: 'action', label: 'Remover', minWidth: 5 },
  ];
  const createData = (id, name, action) => {
    return {id,name,action};
  }

export const DataSelectorList = ({topic, dispatch}) => {
const dataList = useContext(DataContext)


const handleRemove = (id) => {
  dispatch({
    type: 'remove',
    payload: id
  })
}

let rows; 

if(topic == 'Indicadores'){
  rows = dataList.map( item => {
    return(
    createData(
        item.id,
        <div className='ds-col-2'>
        <span className='ds-name'>
        {item.nombre}
        </span>
        </div>
        ,
        <div className='ds-col-3'>
          <button className='dsl-btn-selection' onClick={() => handleRemove(item.id)}>
            <ClearIcon sx={{fontSize:'25px', color: 'white'}} />
          </button>
        </div>))
  })
}else{
  rows = dataList.map( item => {
    return(
    createData(
        item.id,
        <div className='ds-col-2'>
        <span className='ds-name'>
        {item.nombres} {item.apellidoPaterno} {item.apellidoMaterno}
        </span>
        </div>
        ,
        <div className='ds-col-3'>
          <button className='dsl-btn-selection' onClick={() => handleRemove(item.id)}>
            <ClearIcon sx={{fontSize:'25px', color: 'white'}} />
          </button>
        </div>))
  })

}

  return (
<div className='dsl-content-list'>
    <div className='dsl-header'>
        <p>{topic} seleccionados</p>
    </div>
    <div className='dsl-body'>
      {
        (dataList.length == 0)
        ?
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
        height: '100%',
      }}>
      <p style={{
        color: 'rgb(0,0,0,0.7)'
      }}>No se ha seleccionado ningun elemento</p>
      </div>
        :
     <TableContainer sx={{ maxHeight: 280 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='ds-table-header'>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, textAlign:'left', fontWeight: '600'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
             .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer> 
    }
    </div>

    
    
</div>
  )
}
