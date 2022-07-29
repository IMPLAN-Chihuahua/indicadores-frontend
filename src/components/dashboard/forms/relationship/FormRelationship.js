import { Button, TextField, DialogTitle, DialogContent, DialogActions, Autocomplete, Box, Typography } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DataSelector } from '../../../common/dataSelector/DataSelector';
import { setIndicatorsToUser, useAutocompleteInput } from '../../../../services/userService';
import { DataContext } from '../../../common/dataSelector/DataContext';
import { dataReducer } from '../../../common/dataSelector/dataReducer';
import { authSchema } from '../../../../utils/validator';
import { yupResolver } from '@hookform/resolvers/yup'
import './FormRelationship.css'
import { setUsersToIndicator } from '../../../../services/indicatorService';
import { useAlert } from '../../../../contexts/AlertContext';

const USER_TO_INDICADORES = 'INDICADORES_TO_USER';
const INDICADOR_TO_USERS = 'USERS_TO_INDICADOR';

const FormRelationship = ({ handleCloseModal }) => {
  const [dataList, dispatch] = useReducer(dataReducer, [])
  const [mode, setMode] = useState(USER_TO_INDICADORES);
  const [listAlert, setListAlert] = useState(false);
  const [placeholder, setPlaceholder] = useState()
  const alert = useAlert();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(authSchema)
  });

  const onSubmit = data => {
    if (dataList.length === 0) {
      setListAlert(true)
      return;
    }

    setListAlert(false)
    const { one, ...options } = data;
    const selectedOption = mode === INDICADOR_TO_USERS ? 'usuarios' : 'indicadores';
    const payload = {
      ...options,
      [selectedOption]: dataList.map(e => e.id),
    }
    console.log({ ...payload, id: one.id })
    return
    if (mode === USER_TO_INDICADORES) {
      setIndicatorsToUser(one.id, payload)
        .then(_ => alert.success('Indicador (es) asignado (s) exitosamente'))
        .catch(err => alert.error(err))

    } else {
      setUsersToIndicator(one.id, payload)
        .then(_ => alert.success('Usuario (s) asignado (s) exitosamente'))
        .catch(err => alert.error(err))
    }
  };

  const handleChangeMode = (mode) => {
    setMode(mode)
    reset({ one: null })
  };

  const { itemList } = useAutocompleteInput(mode === USER_TO_INDICADORES ? 'usuarios' : 'indicadores');

  useEffect(() => {
    if (mode === USER_TO_INDICADORES) {
      setPlaceholder('Selecciona un usuario')
    } else {
      setPlaceholder('Selecciona un indicador')
    }
  }, [mode])

  useEffect(() => {
    setListAlert(false)
  }, [dataList])

  return (
    <>
      <DataContext.Provider value={{ dataList, dispatch }}>
        <DialogTitle>
          <div className='auth-title'>
            <div className='auth-title-left'>
              Autorizacion
            </div>
            <div className='auth-title-right'>
              <button
                className={`auth-title-btn${(mode === USER_TO_INDICADORES) ? '-active' : ''}`}
                onClick={() => handleChangeMode(USER_TO_INDICADORES)}>Usuario a indicadores</button>

              <button
                className={`auth-title-btn${(mode === INDICADOR_TO_USERS) ? '-active' : ''}`}
                onClick={() => handleChangeMode(INDICADOR_TO_USERS)}>Indicador a usuarios</button>
            </div>
          </div>
        </DialogTitle>
        <Box
          component='form'
          noValidate
        >
          <DialogContent>
            {itemList &&
              <Controller
                name='one'
                control={control}
                defaultValue={null}
                render={({ field: props, fieldState: { error } }) => (
                  <Autocomplete
                    {...props}
                    type='text'
                    disablePortal
                    getOptionLabel={item => {
                      return mode && mode === USER_TO_INDICADORES
                        ? `${item.nombres} ${item.apellidoPaterno} ${item.apellidoMaterno || ''}`
                        : item.nombre
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={[...itemList.data]}
                    onChange={(_, data) => props.onChange(data)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={placeholder}
                        error={!!error}
                        fullWidth
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />}
            <Box sx={{ display: 'flex', mt: 3, columnGap: 2 }}>
              <Controller
                name='desde'
                control={control}
                defaultValue=''
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    type="date"
                    value={value}
                    onChange={onChange}
                    label="Fecha de inicio"
                    InputLabelProps={{ shrink: true }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                  />
                )}
              />
              <Controller
                name='hasta'
                control={control}
                defaultValue=''
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    type="date"
                    value={value}
                    onChange={onChange}
                    label="Fecha de expiración"
                    InputLabelProps={{ shrink: true }}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />

            </Box>
            <div className='auth-selection'>
              {
                <DataSelector 
                  topic={mode === USER_TO_INDICADORES ? 'Indicadores' : 'Usuarios'}
                />
              }
              {
                listAlert && (
                  <Typography
                    textAlign='center'
                    color='error'
                    variant='body2'>Selecciona elementos de la lista</Typography>
                )
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button variant='contained' onClick={handleSubmit(onSubmit)}>Guardar</Button>
          </DialogActions>
        </Box>
      </DataContext.Provider>
    </>
  )
}

export default FormRelationship;

