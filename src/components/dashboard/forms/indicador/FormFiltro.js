import { CheckCircle, PanoramaFishEye } from '@material-ui/icons';
import { Box, Button, Checkbox, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, set, useFieldArray, useForm } from 'react-hook-form';
import AutoCompleteInput from '../../../common/AutoCompleteInput';
import { getUsersGeneralInfo } from '../../../../services/userService';
import { getObjetivosGeneralInfo } from '../../../../services/dimensionService';
import { useAuth } from '../../../../contexts/AuthContext';

const FormFiltro = (props) => {
  const { handleClose, setSearch, searchIndicator, setObjetivo, setOwner, setFilter } = props;
  const [objetivos, setObjetivos] = useState([]);
  const { user } = useAuth();

  const methods = useForm({
    defaultValues: {
      objetivos: undefined,
      searchQuery: searchIndicator,
      usuario: null,
      me: false
    }
  });

  useEffect(() => {
    fetchObjetivos().then(data => {
      setObjetivos(data);
    });
  }, [0])

  const { control, handleSubmit, reset, register, watch } = methods;

  const fetchUsers = async () => {
    const { data } = await getUsersGeneralInfo({
      attributes: ['id', 'nombres', 'apellidoPaterno', 'apellidoMaterno'],
    })
    return data.data;
  };

  const fetchObjetivos = async () => {
    const { data } = await getObjetivosGeneralInfo();
    return data.data
  }

  const onSubmit = (data) => {
    const owner = watch('me') ? user.id : data.usuario?.id;
    setSearch(data.searchQuery);
    setOwner(owner);
    setObjetivo(data.objetivos);
    setFilter(true);
    handleClose();
  };

  const clearFilter = () => {
    setFilter(false);
    setSearch('');
    setOwner(null);
    setObjetivo([]);

    reset({
      searchQuery: '',
      usuario: null,
      me: false,
      objetivos: []
    })

  }

  return (
    <FormProvider {...methods}>
      <Box component={'form'} noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          <Typography variant='h5'>Búsqueda avanzada</Typography>
        </DialogTitle>

        <DialogContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h2' fontSize={'19px'} pb={1} fontWeight={'bold'}>Nombre del indicador</Typography>
                <Divider sx={{ mb: 1 }} />
                <Controller
                  name='searchQuery'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      variant='outlined'
                      label='Buscar indicador'
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h2' fontSize={'19px'} pb={1} fontWeight={'bold'}>Objetivos</Typography>
                <Divider sx={{ mb: 1 }} />

                <Grid container>
                  <Grid item xs={12} sx={{ mt: 1, mb: 1 }}>
                    {
                      objetivos?.map((chip) => (
                        <Controller
                          key={chip.id}
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size='small'
                                  icon={<PanoramaFishEye />}
                                  checkedIcon={< CheckCircle />}
                                  onChange={onChange}
                                  value={chip.id}

                                />}
                              label={<Typography sx={{ fontSize: '12px' }}>{chip.titulo}</Typography>}
                              sx={{
                                borderRadius: '50px',
                                border: '1px solid #ccc',
                                p: '1px',
                                pr: '10px',
                                m: '5px',
                              }}
                              {...register(`objetivos`)}
                            />
                          )}
                          defaultValue={false}
                        />
                      ))
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h2' fontSize={'19px'} pb={1} fontWeight={'bold'}>Usuarios</Typography>
                <Divider sx={{ mb: 1 }} />
                <Controller
                  control={control}
                  defaultValue={null}
                  name='usuario'
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <AutoCompleteInput
                      value={value}
                      onChange={onChange}
                      error={error}
                      label='Usuarios'
                      helperText='Usuario con indicadores asignados'
                      getOptionLabel={item => `${item.nombres} ${item.apellidoPaterno}`}
                      fetcher={fetchUsers}
                      disabled={watch('me')}
                      required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sx={{
              }}>
                <Controller
                  name='me'
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='medium'
                        />
                      }
                      label={'Mis indicadores'}
                      sx={{
                        padding: '5px 10px',
                        margin: '0 10px 10px 0',
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={clearFilter} variant='text' color='secondary'>Limpiar</Button>
          <Button onClick={handleClose} variant='contained' color='secondary'>Cerrar</Button>
          <Button type='submit' variant='contained' color='primary'>Buscar</Button>
        </DialogActions>
      </Box>
    </FormProvider>
  )
}

export default FormFiltro