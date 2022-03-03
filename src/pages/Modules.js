import { Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import DatagridTable from '../components/dashboard/common/DatagridTable'
import { DataHeader } from '../components/dashboard/common/DataHeader'
import { getModules, useModules } from '../services/userService'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BeatLoader } from 'react-spinners'
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ShowImage from '../components/dashboard/common/ShowImage'
import { Status } from '../components/dashboard/common/Status'
import Dropdown from '../components/dashboard/common/Dropdown'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FormDialog from '../components/dashboard/common/FormDialog'
import FormModel from '../components/dashboard/forms/model/FormModel'

export const Modules = () => {
  let perPage = 5;
  (localStorage.getItem("perPage")) && (perPage = localStorage.getItem("perPage"));
  let totalPages = 1;
  let rowsModules=[];
  
  const [paginationCounter, setPaginationCounter] = useState(1);
  const [perPaginationCounter, setPerPaginationCounter] = useState(perPage);

  const [activeCounter, setActiveCounter] = useState(0);
  const [inactiveCounter, setInactiveCounter] = useState(0);

  const isMounted = useRef(true)
  const {modulesList,isLoading,isError} = useModules(perPaginationCounter,paginationCounter);
                  
  const [openModal, setOpenModal] = React.useState(false);
  const [clickInfo, setClickInfo] = React.useState({row: {temaIndicador: ''}});




if (activeCounter == 0 && inactiveCounter == 0 && modulesList){
  setActiveCounter(modulesList.total - modulesList.totalInactivos)
    setInactiveCounter(modulesList.totalInactivos)
  }
  (modulesList) && (totalPages = modulesList.total_pages); 
  (modulesList) && (rowsModules = modulesList.data); 
  
  
  let rowsModulesEdited = [];
  rowsModules.map( data =>{
    rowsModulesEdited = [...rowsModulesEdited,{
      ...data,
      createdAt: ((data.createdAt).split('T')[0]),
      updatedAt: ((data.updatedAt).split('T')[0]),
      activo: (data.activo == 'SI') ? 'Activo' : 'Inactivo',
      actions: 'Acciones',
    }]
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
  const editable = true, headerClassName = 'dt-theme--header',sortable=false, headerAlign='center',align = 'center',filterable=false;
  const columnsModule = [
    {field: 'id',headerName: 'ID ',flex:0.1,editable,headerClassName,sortable,headerAlign, align,align},
    {field: 'codigo',headerName: 'Codigo ',flex:0.5,minWidth: 100, editable,headerClassName,sortable,headerAlign, align},
    {field: 'temaIndicador',headerName: 'Tema',flex:1,minWidth: 150,editable,headerClassName,sortable,headerAlign, align,
    renderCell: (params) => {
      return(
        <span className='dt-theme--text'>{params.row.temaIndicador}</span>
      )
    },
    },
    {field: 'createdAt',headerName: 'Creacion',flex:0.5,minWidth: 150,editable,headerClassName,sortable,headerAlign, align    },
    {field: 'updatedAt',headerName: 'Actualizacion',flex:0.5,minWidth: 150,editable,headerClassName,sortable,headerAlign, align},
    {field: 'urlImagen',headerName: 'Imagen',flex:0.5,minWidth: 100,editable,headerClassName,sortable,headerAlign, align,filterable,
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
    {field: 'color',headerName: 'Color',flex:0.5,minWidth: 100,editable,headerClassName,sortable,headerAlign, align,
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
  {field: 'observaciones',headerName: 'Observaciones',flex:1,minWidth: 200,editable,headerClassName,sortable,headerAlign, align,
    renderCell: (params) => {
      return(
        <span className='dt-theme--text'>{params.row.observaciones}</span>
      )
    },},
    {field: 'activo',headerName: 'Estado',flex:0.5,editable: true,minWidth: 100,headerClassName,sortable,headerAlign, align,
    renderCell: (params) => {
      return (
        <div>
          {
            (params.row.activo == 'Activo')
            ?<Status status='activo'/>
            :<Status status='inactivo'/>
         }
        </div>
      )
    },

    },
    {field: 'actions',headerName: 'Acciones',flex:0.5,editable: false,minWidth: 100,headerClassName,sortable,headerAlign, align,filterable,
    renderCell: (params) => {
      return (
        <div className='dt-btn-container'>
          <span className='dt-action-delete'> <DeleteOutlineIcon/> </span>
          <span className='dt-action-edit' onClick={() => {
            setOpenModal(prev => !prev)
            setClickInfo(params.row);
          }}> <ModeEditIcon/> </span>
        </div>
      )
    },

    },
  ]

  const dataTable = [
    columnsModule,
    rowsModulesEdited
  ]

  const dataModule = {
    topic: 'modulo',
    countEnable: activeCounter,
    countDisable: inactiveCounter,
  }

  return (
    <>

    <DataHeader data={dataModule} />
    <Box className='dt-table'>
    {
      (isLoading)
      ?<Box className='dt-loading'><BeatLoader size={15} color='#1976D2' /></Box>
      :
      <>
      <DatagridTable data={dataTable} />
      <Box className='dt-pagination'>
      <Box className='dt-pagination-options-container'>
        <span className='dt-pagination-option-corner' onClick={firstPage} ><FirstPageIcon /></span>
        <span className='dt-pagination-option' onClick={previousPage} ><ArrowBackIosIcon fontSize='15px' /></span>
        <span className='dt-pagination-number'>{`Página ${paginationCounter}/${totalPages}`}</span>
        <span className='dt-pagination-option' onClick={nextPage}><ArrowForwardIosIcon fontSize='15px'/></span>
        <span className='dt-pagination-option-corner' onClick={lastPage} ><LastPageIcon /></span>
      </Box>
      <Box className='dt-perPage-options-container'>
        <Dropdown data={{perPaginationCounter, setPerPaginationCounter, setPaginationCounter,perPage}} />
        <span className='dt-perPage-options--text'>Registros por pagina</span>
      </Box>
      </Box>
      </>
    }
    </Box>


    <FormDialog open={openModal} setOpenModal={setOpenModal} title={`Editar módulo ${clickInfo.temaIndicador}`}> 
      <FormModel data={clickInfo}/>
    </FormDialog>

    </>
  )
}
