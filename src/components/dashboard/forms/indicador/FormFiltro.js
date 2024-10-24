import { Autocomplete, Box, Button, Checkbox, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import React from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useAuth } from '../../../../contexts/AuthContext';
import { useObjetivos } from '../../../../services/objetivoService';
import { useTemas } from '../../../../services/temaService';
import { useUsers } from '../../../../services/userService';

const defaultValues = {
  objetivos: [],
  usuarios: [],
  temas: [],
  usuario: null,
  me: false,
}
const FormFiltro = (props) => {
  const { handleClose, submitCallback } = props;
  const { objetivos, isLoading: isObjetivosLoading } = useObjetivos();
  const { temas, isLoading: isTemasLoading } = useTemas();
  const { users: usuarios, isLoading: isUsuariosLoading } = useUsers();
  const { user } = useAuth();

  const methods = useForm({ defaultValues });

  const { control, handleSubmit, reset } = methods;
  const meValue = useWatch({ name: 'me', control })

  const onSubmit = (data) => {
    const owner = meValue ? user.id : null;
    const objetivos = data.objetivos.map(o => o.id);
    const temas = data.temas.map(t => t.id);
    const usuarios = meValue ? [] : data.usuarios.map(u => u.id)
    const hasActiveFilters = owner !== null || [objetivos, temas, usuarios].some(arr => arr.length > 0)

    submitCallback({
      owner,
      objetivos,
      temas,
      usuarios,
      hasActiveFilters
    });
    handleClose();
  };

  const clearFilter = () => {
    reset(defaultValues);
    submitCallback({ owner: null, objetivos: [], temas: [], usuarios: [], hasActiveFilters: false })
  };

  return (
    <Box component={'form'} noValidate onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Búsqueda avanzada</DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <Controller
                    control={control}
                    name='objetivos'
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        value={value}
                        onChange={(e, data) => onChange(data)}
                        multiple
                        id='objetivos-autocomplete'
                        options={objetivos}
                        loading={isObjetivosLoading}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={tema => tema.titulo}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant='standard'
                            label='Selecciona objetivos'
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='temas'
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, data) => onChange(data)}
                    multiple
                    id='temas-autocomplete'
                    options={temas}
                    loading={isTemasLoading}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={tema => tema.temaIndicador}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='standard'
                        label='Selecciona temas'
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='usuarios'
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, data) => onChange(data)}
                    multiple
                    disabled={meValue}
                    id='usuarios-autocomplete'
                    options={usuarios}
                    loading={isUsuariosLoading}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={tema => tema.nombres}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='standard'
                        label='Selecciona usuarios'
                      />
                    )}
                  />
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
                        checked={field.value}
                      />
                    }
                    label={'Mis indicadores'}
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
  )
}


export default FormFiltro