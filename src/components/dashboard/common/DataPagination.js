import { Box } from '@mui/material'
import React, { useState } from 'react'
import Dropdown from './Dropdown'
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { getModules, useModules } from '../../../services/userService'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './common.css'

export const DataPagination = ({data}) => {
    const 
        {dataModule,
        paginationCounter,
        setPaginationCounter,
        perPaginationCounter,
        setPerPaginationCounter,
        totalPages,
        perPage}
     = data;
    
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

  return (
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
  )
}
