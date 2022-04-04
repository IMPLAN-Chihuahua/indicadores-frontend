import { Box, Button, TextField, Container, Grid, FormGroup, FormControlLabel, Switch, CssBaseline, Typography, Alert, DialogTitle, DialogContent, DialogActions, Autocomplete, Checkbox, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, FormProvider } from "react-hook-form";
import ColorPicker from '../../common/ColorPicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { moduleSchema } from '../../../../utils/validator';
import FileInput from '../../../common/FileInput';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import './FormRelationship.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { height } from '@mui/system';
import { DataSelector } from '../../../common/dataSelector/DataSelector';
import { useAutocompleteInput } from '../../../../services/userService';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const FormRelationship = ({ data = 0, handleCloseModal }) => {
  /*
  mode: 
  UI = Usuario a indicadores
  IU = Indicador a usuarios
  */
    const onSubmit = data => alert(JSON.stringify(data));
    const [mode, setMode] = useState('Indicadores');
    
    const handleChangeMode = (mode) => {
      setMode(mode)
    }

    let itemListFull = []
    const {itemList, isLoading, isError} = useAutocompleteInput(
      mode
    );

    (itemList && mode == 'Indicadores') 
    ? itemList?.data.map((item)=>{
      itemListFull = [...itemListFull,{
        label: `${item.id}-${item.nombres} ${item.apellidoPaterno} ${item.apellidoMaterno}`
      }]
    })
    : itemList?.data.map((item)=>{
      itemListFull = [...itemListFull,{
        label: `${item.id}-${item.nombre}`
      }]
    })

    const [placeholderMode, setPlaceholderMode] = useState('Selecciona un usuario')
    
    useEffect(() => {
      itemListFull = []
    if (mode == 'Indicadores') {
      setPlaceholderMode('Selecciona un usuario')
    }else{
      setPlaceholderMode('Selecciona un indicador') 
    } 

    }, [mode])
    
    return (
        <>
            <DialogTitle>
            <div className='auth-title'>
              <div className='auth-title-left'>
              Autorizacion
              </div>
              <div className='auth-title-right'>
              <button className={`auth-title-btn${(mode == 'Indicadores')?'-active':``}`} onClick={() => handleChangeMode('Indicadores')}>Usuario a indicadores</button>
              <button className={`auth-title-btn${(mode == 'Usuarios')?'-active':``}`} onClick={() => handleChangeMode('Usuarios')}>Indicador a usuarios</button>
              </div>

            </div>
            </DialogTitle>
            <FormProvider >
                <Box
                    // component='form'
                    // onSubmit={(e) => e.preventDefault()}
                >
                    <DialogContent
                    >
                    <div className='auth-container'>
                    <div className='auth-content'>
                    <div className='auth-header'>


                     {
                  
                        <Autocomplete
                          disablePortal
                          className='auth-one'
                          options={itemListFull}
                 
                          renderInput={(params) => <TextField {...params} label={placeholderMode} />}
                        />
                   
                      }

                    <TextField
                    className='auth-date'
                    label="Fecha de expiracion"
                    type="date"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true,
                    }}

                  
                  />                    
                    </div>
                    <div className='auth-selection'>
                      {
                        (mode == 'Indicadores')
                        ?
                        <DataSelector topic={'Indicadores'}/>
                        :
                        <DataSelector topic={'Usuarios'}/>
                      }
                    </div>
                      </div>
                    </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancelar</Button>
                        <Button type='submit' variant='contained'>Guardar</Button>
                    </DialogActions>
                </Box>
            </FormProvider>
        </>
    )
}

export default FormRelationship;

