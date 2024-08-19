import { Button, TextField, DialogTitle, DialogContent, DialogActions, Autocomplete, Box, Typography, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DataSelector } from '../../../common/dataSelector/DataSelector';
import { getUsersGeneralInfo } from '../../../../services/userService';
import { createRelation } from '../../../../services/usuarioIndicadorService';
import { DataContext } from '../../../common/dataSelector/DataContext';
import { dataReducer } from '../../../common/dataSelector/dataReducer';
import { updateAuthSchema, createAuthSchema } from '../../../../utils/validator';
import { yupResolver } from '@hookform/resolvers/yup'
import './FormRelationship.css'
import { useAlert } from '../../../../contexts/AlertContext';
import { getIndicatorsGeneralInfo } from '../../../../services/indicatorService';
import { getModulesGeneralInfo } from '../../../../services/moduleService';

const USER_TO_INDICADORES = 'INDICADORES_TO_USER';
const INDICADOR_TO_USERS = 'USERS_TO_INDICADOR';
const TEMAS_TO_USERS = 'TEMAS_TO_USERS';

const FormRelationship = ({ handleCloseModal, mutate, isEdit, indicador }) => {
  const [dataList, dispatch] = useReducer(dataReducer, [])
  const [mode, setMode] = useState(isEdit ? INDICADOR_TO_USERS : USER_TO_INDICADORES);
  const [listAlert, setListAlert] = useState(false);
  const [placeholder, setPlaceholder] = useState()
  const [expires, setExpires] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const alert = useAlert();

  const { control, handleSubmit, reset } = useForm(
    {
      resolver: isEdit ? yupResolver(updateAuthSchema) : yupResolver(createAuthSchema),
    }
  );

  const onSubmit = data => {

    if (dataList.length === 0) {
      setListAlert(true)
      return;
    }

    setListAlert(false)
    const { one, ...options } = data;
    options.expires = expires === true ? 'SI' : 'NO';
    const selectedOption = 'relationIds';
    const payload = {
      ...options,
      [selectedOption]: dataList.map(e => e.id),
    }

    if (mode === USER_TO_INDICADORES) {
      createRelation(one.id, payload, 'indicadores')
        .then(_ => {
          alert.success('Indicador (es) asignado (s) exitosamente')
          mutate();
        })
        .catch(err => alert.error(err))

    } else if (mode === INDICADOR_TO_USERS) {
      if (isEdit) {
        createRelation(indicador.id, payload, 'usuarios')
          .then(_ => {
            alert.success('Usuario (s) asignado (s) exitosamente')
            mutate();
          })
          .catch(err => alert.error(err))
      } else {
        createRelation(one.id, payload, 'usuarios')
          .then(_ => {
            alert.success('Usuario (s) asignado (s) exitosamente')
            mutate();
          })
          .catch(err => alert.error(err))
      }
    } else if (mode === TEMAS_TO_USERS) {
      createRelation(one.id, payload, 'temas')
        .then(_ => {
          alert.success('Tema (s) asignado (s) exitosamente')
          mutate();
        })
        .catch(err => alert.error(err))
    }
  };

  const handleChangeMode = (mode) => {
    setMode(mode)
    reset({ one: null })
  };

  useEffect(() => {
    if (mode === USER_TO_INDICADORES) {
      setPlaceholder('Selecciona un usuario')
    } else if (mode === INDICADOR_TO_USERS) {
      setPlaceholder('Selecciona un indicador')
    } else if (mode === TEMAS_TO_USERS) {
      setPlaceholder('Selecciona un tema')
    }
    setOptions([]);
  }, [mode])

  useEffect(() => {
    setListAlert(false)
  }, [dataList])

  const fetchInformation = async () => {
    if (mode === USER_TO_INDICADORES) {
      const { data } = await getUsersGeneralInfo({
        attributes: ['id', 'nombres', 'apellidoPaterno', 'apellidoMaterno'],
      });
      return data;
    }
    else if (mode === INDICADOR_TO_USERS) {
      const { data } = await getIndicatorsGeneralInfo({
        attributes: ['id', 'nombre'],
      });
      return data;
    } else if (mode === TEMAS_TO_USERS) {
      const { data } = await getModulesGeneralInfo({
        attributes: ['id', 'temaIndicador'],
      });
      return data;
    }
  }

  const changeExpires = () => {
    setExpires(!expires)
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const { data } = await fetchInformation();
      if (active) {
        setOptions([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <>
      <DataContext.Provider value={{ dataList, dispatch }}>
        <DialogTitle>
          <div className='auth-title'>
            <div className='auth-title-left'>
              Autorizacion a indicadores
            </div>
            <div className='auth-title-right'>
              {
                isEdit ?
                  <></>
                  :
                  <>
                    <button
                      className={`auth-title-btn${(mode === USER_TO_INDICADORES) ? '-active' : ''}`}
                      onClick={() => handleChangeMode(USER_TO_INDICADORES)}>Usuario a indicadores</button>
                    <button
                      className={`auth-title-btn${(mode === TEMAS_TO_USERS) ? '-active' : ''}`}
                      onClick={() => handleChangeMode(TEMAS_TO_USERS)}>Temas de interés a usuarios</button>
                  </>
              }
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
            {options &&
              <Controller
                name='one'
                control={control}
                defaultValue={null}
                render={({ field: props, fieldState: { error } }) => (
                  isEdit ?
                    <Typography variant='h6' align='center'>{indicador.nombre}</Typography>
                    :
                    <Autocomplete
                      {...props}
                      id="asynchronous-autocomplete"
                      type='text'
                      open={open}
                      onOpen={() => {
                        setOpen(true);
                      }}
                      onClose={() => {
                        setOpen(false);
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      getOptionLabel={(option) => {
                        return mode === USER_TO_INDICADORES
                          ? `${option.nombres} ${option.apellidoPaterno}`
                          :
                          mode === INDICADOR_TO_USERS
                            ? option.nombre
                            : option.temaIndicador
                      }}
                      options={options}
                      onChange={(_, data) => props.onChange(data)}
                      loading={loading}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={placeholder}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
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
                    disabled={!expires}
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
                    disabled={!expires}
                  />
                )}
              />
              <Controller
                name='expires'
                control={control}
                defaultValue={true}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value}
                        onChange={onChange}
                        name="expires"
                        color="primary"
                        onClick={changeExpires}
                      />
                    }
                    label="Expira"
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
};

export default FormRelationship;

