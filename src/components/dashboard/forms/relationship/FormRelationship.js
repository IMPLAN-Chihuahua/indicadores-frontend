import { Box, Button, TextField, DialogTitle, DialogContent, DialogActions, Autocomplete} from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {FormProvider, useForm} from "react-hook-form";
import { DataSelector } from '../../../common/dataSelector/DataSelector';
import { useAutocompleteInput } from '../../../../services/userService';
import { DataContext } from '../../../common/dataSelector/DataContext';
import { dataReducer } from '../../../common/dataSelector/dataReducer';
import { authSchema } from '../../../../utils/validator';
import {yupResolver} from '@hookform/resolvers/yup' 
import './FormRelationship.css'
/*
mode: 
UI = Usuario a indicadores
IU = Indicador a usuarios
*/
const FormRelationship = ({ data = 0, handleCloseModal }) => {
    const init = () => {
      return []
    } 
    const [dataList, dispatch] = React.useReducer(dataReducer, [], init)
    const [mode, setMode] = useState('Indicadores');
    const [listAlert, setListAlert] = useState(false);
    const { register, handleSubmit, formState: { errors }, clearErrors} = useForm(
      {resolver: yupResolver(authSchema)}
    );
    
    const onSubmit = data => {
        if(dataList.length <= 0){
          setListAlert(true)
        }else{
          setListAlert(false)
          const dataAuth = {
            ...data,
            list: dataList,
          }
          console.log(dataAuth)
          handleCloseModal()
          // alert.success('Autorización creada exitosamente');
        }
    };
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

    useEffect(() => {
      setListAlert(false)
    }, [dataList])
    

    return (
        <>
          <DataContext.Provider value={dataList}>
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
                    component='div'
                    // onSubmit={handleSubmit(onSubmit)}
                >
                    <DialogContent>
                    <div className='auth-container'>
                    <div className='auth-content'>
                    <div className='auth-header'>
                    <div className='auth-header-container'>
                     {
                       <Autocomplete
                          onChange= {() => {clearErrors("one")}}
                          key={mode}
                          name= 'one'
                          type='text'
                          disablePortal
                          className='auth-one'
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={itemListFull}
                          renderInput={(params) => <TextField {...params}
                          label={placeholderMode}
                          error= {(errors.one?.message) ? true : false} 
                          helperText= {errors.one?.message}
                          {...register('one')}  
                          />}
                          />
                        }
                      </div>
                      <div 
                      className='auth-date-container'
                      style={{
                        display: 'flex'
                      }}>
                          <TextField
                          name='expirationDate'
                          className='auth-date'
                          type="date"
                          label="Fecha de expiracion"
                          defaultValue= {new Date().toISOString().split('T')[0]}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error= {(errors.expirationDate?.message) ? true : false} 
                          helperText= {errors.expirationDate?.message}
                          {...register('expirationDate')}  
                          />     
                          <TextField
                          name='expirationDate'
                          className='auth-date'
                          type="date"
                          label="Fecha de expiracion"
                          defaultValue= {new Date().toISOString().split('T')[0]}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error= {(errors.expirationDate?.message) ? true : false} 
                          helperText= {errors.expirationDate?.message}
                          {...register('expirationDate')}  
                          />     
                          </div>
                    </div>
                    <div className='auth-selection'>
                      {
                        (mode == 'Indicadores')
                        ?
                        <>
                        <DataSelector topic={'Indicadores'} dispatch={dispatch}/>
                        {(listAlert) && <p className='msj-error'>*No has hecho ninguna asignación</p>
                        }
                        </>
                        :
                        <DataSelector topic={'Usuarios'} dispatch={dispatch}/>
                      }
                    </div>
                      </div>
                    </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancelar</Button>
                        <Button type='submit' variant='contained' onClick={handleSubmit(onSubmit)} >Guardar</Button>
                    </DialogActions>
                </Box>
            </FormProvider>
            </DataContext.Provider>
        </>
    )
}

export default FormRelationship;

