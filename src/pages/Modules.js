import { Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import DatagridTable from '../components/dashboard/common/DatagridTable'
import { DataHeader } from '../components/dashboard/common/DataHeader'
import {useModules } from '../services/userService'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BeatLoader } from 'react-spinners
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ShowImage from '../components/dashboard/common/ShowImage'
import { Status } from '../components/dashboard/common/Status'
import FormModal from '../components/dashboard/common/FormModal'

export const Modules = () => {

  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => setOpenModal(prev => !prev);

  const [paginationCounter, setPaginationCounter] = useState(1);
  const isMounted = useRef(true)
  
  const {modulesList,isLoading,isError} = useModules(paginationCounter);
  
  let totalPages = 1;
  let rowsModules=[];
  let dataModule = {
    topic: 'modulo',
    countEnable: '-',
    countDisable: '-',
  };

  (modulesList) && (totalPages = modulesList.total_pages); 
  (modulesList) && (rowsModules = modulesList.data); 
  
  (modulesList) && (dataModule = {
    topic: 'modulo',
    countEnable: (modulesList.total - modulesList.totalInactivos),
    countDisable: modulesList.totalInactivos,
  });
  
  let rowsModulesEdited = [];
  rowsModules.map( data =>{
    rowsModulesEdited = [...rowsModulesEdited,{
      ...data,
      createdAt: ((data.createdAt).split('T')[0]),
      updatedAt: ((data.updatedAt).split('T')[0])
    }]
  });
  console.log(rowsModulesEdited)
  useEffect(() => {
    return () =>{
      isMounted.current = false;
    }
  }, [])
  
  
  const nextPage = () => {
    if(paginationCounter < totalPages){
      setPaginationCounter(paginationCounter+1)
    }
  } 
  const previousPage = () => {
    if(paginationCounter > 1){
      setPaginationCounter(paginationCounter-1)
    }
  } 
  const firstPage = () => {
    if(paginationCounter > 1){
      setPaginationCounter(1)
    }
  } 
  const lastPage = () => {
    if(paginationCounter < totalPages) {
      setPaginationCounter(totalPages)
    }
  } 
  const editable = true, headerClassName = 'dt-theme--header',sortable=false, headerAlign='center',align = 'center';
  const columnsModule = [
    {field: 'id',headerName: 'ID ',width: 0,editable,headerClassName,sortable,headerAlign, align,align},
    {field: 'codigo',headerName: 'Codigo ',width:100,editable,headerClassName,sortable,headerAlign, align},
    {field: 'temaIndicador',headerName: 'Tema',width:150,editable,headerClassName,sortable,headerAlign, align},
    {field: 'createdAt',headerName: 'Creacion',width:150,editable,headerClassName,sortable,headerAlign, align    },
    {field: 'updatedAt',headerName: 'Actualizacion',width:150,editable,headerClassName,sortable,headerAlign, align},
    {field: 'urlImagen',headerName: 'Imagen',width:150,editable,headerClassName,sortable,headerAlign, align,
    renderCell: (params) => {
      return (
        <ShowImage data={{
          title: params.row.temaIndicador ,
          url: params.row.urlImagen, 
        } 
        }/>
      )
    },
    },
    {field: 'color',headerName: 'Color',width:100,editable,headerClassName,sortable,headerAlign, align,
    renderCell: (params) => {
      return (
        <div className='params-color'>
        <div className='params-color--circle' style={{
          backgroundColor:params.row.color,
          border: '1px solid rgb(0,0,0,0.2)',
          }}></div>
        </div>
      )
    },
    },
    {field: 'observaciones',headerName: 'Observaciones',width:400,editable,headerClassName,sortable,headerAlign, align},
    {field: 'activo',headerName: 'Estado',width:150,editable,headerClassName,sortable,headerAlign, align,
    renderCell: (params) => {
      return (
        <div>
          {
            (params.row.activo == 'SI')
            
            ?<Status status='activo'/>
            :<Status status='inactivo'/>
         }
        </div>
      )
    },

    },
  ]

  const dataTable = [
    columnsModule,
    rowsModulesEdited
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
    <Box className='dt-table-container'>
    <Box className='dt-table'>
    {
      (isLoading)
      ?<Box className='dt-loading'><BeatLoader size={15} color='#1976D2' /></Box>
      :
      <>
      <Box className='dt-pagination'>
      <Box className='dt-pagination-options-container'>
        <span className='dt-pagination-option-corner' onClick={firstPage} ><FirstPageIcon /></span>
        <span className='dt-pagination-option' onClick={previousPage} ><ArrowBackIosIcon fontSize='15px' /></span>
        <span className='dt-pagination-number'>{`Página ${paginationCounter}/${totalPages}`}</span>
        <span className='dt-pagination-option' onClick={nextPage}><ArrowForwardIosIcon fontSize='15px'/></span>
        <span className='dt-pagination-option-corner' onClick={lastPage} ><LastPageIcon /></span>
      </Box>
      </Box>
      <DatagridTable data={dataTable} />

      </>
    }
    </Box>
    </Box>
    </>
  )
}
