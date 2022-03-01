import { Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import DatagridTable from '../components/dashboard/common/DatagridTable'
import { DataHeader } from '../components/dashboard/common/DataHeader'
import { getModules, useModules } from '../services/userService'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BeatLoader } from 'react-spinners'
import { blue } from '@mui/material/colors'
import FormModal from '../components/dashboard/common/FormModal'

export const Modules = () => {

  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => setOpenModal(prev => !prev);

  const [paginationCounter, setPaginationCounter] = useState(1);
  const isMounted = useRef(true)
  
  const {modulesList,isLoading,isError} = useModules(paginationCounter);
  
  let rowsModules=[];
  let dataModule = {
    topic: 'modulo',
    countEnable: '-',
    countDisable: '-',
  };
  
  (modulesList) && (rowsModules = modulesList.data); 
  
 
  (modulesList) && (dataModule = {
    topic: 'modulo',
    countEnable: (modulesList.total - modulesList.totalInactivos),
    countDisable: modulesList.totalInactivos,
  });


  useEffect(() => {
    return () =>{
      isMounted.current = false;
    }
  }, [])
  
  
  const nextPage = () => {
    if(paginationCounter < ((dataModule.countEnable + dataModule.countDisable)/10)){
      setPaginationCounter(paginationCounter+1)
    }
  } 
  const previousPage = () => {
    if(paginationCounter > 1){
      setPaginationCounter(paginationCounter-1)
    }
  } 
  
  const columnsModule = [
    {field: 'id',headerName: 'ID ',width:100,editable: true,headerClassName: 'dt-theme--header'},
    {field: 'codigo',headerName: 'Codigo ',width:100,editable: true,headerClassName: 'dt-theme--header'},
    {field: 'temaIndicador',headerName: 'Tema',width:250,editable: true,headerClassName: 'dt-theme--header'},
    {field: 'createdAt',headerName: 'Creacion',width:200,editable: true,headerClassName: 'dt-theme--header'    },
    {field: 'updatedAt',headerName: 'Actualizacion',width:200,editable: true,headerClassName: 'dt-theme--header'},
    {field: 'urlImagen',headerName: 'Imagen',width:200,editable: true,headerClassName: 'dt-theme--header'},
    {field: 'color',headerName: 'Color',width:70,editable: true,headerClassName: 'dt-theme--header'},
    {field: 'observaciones',headerName: 'Observaciones',width:400,editable: true,headerClassName: 'dt-theme--header'},
    {field: 'activo',headerName: 'Estado',width:100,editable: true,headerClassName: 'dt-theme--header'},
  ]

  const dataTable = [
    columnsModule,
    rowsModules
]

  return (
    <>

      <Button onClick={handleModal}>Click me</Button>
      <Button onClick={handleModal}>Click me</Button>
      <FormModal open={openModal} setOpenModal={setOpenModal} title={'Editar módulo'}>
        <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
          Hello worldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaworldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaworldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaworldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaworldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </Typography>
      </FormModal> 

    <DataHeader data={dataModule} />
    <Box className='dt-table'>
    {
      (isLoading)
      ?<Box className='dt-loading'><BeatLoader size={15} color='#1976D2' /></Box>
      :
      <>
      <Box className='dt-pagination'>
      <Box className='dt-pagination-options-container'>
        <span className='dt-pagination-option' onClick={previousPage} ><ArrowBackIosIcon fontSize='15px' /></span>
        <span className='dt-pagination-number'>{`página ${paginationCounter}`}</span>
        <span className='dt-pagination-option' onClick={nextPage}><ArrowForwardIosIcon fontSize='15px'/></span>
      </Box>
      </Box>
      <DatagridTable data={dataTable} />
      </>
    }
    </Box>
    </>
  )
}
