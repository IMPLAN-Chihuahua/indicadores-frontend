import { Box, Button, TextField, Container, Grid, FormGroup, FormControlLabel, Switch, CssBaseline, Typography, Alert, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React from 'react';
import { useForm, Controller, FormProvider } from "react-hook-form";
import ColorPicker from '../../common/ColorPicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { moduleSchema } from '../../../../utils/validator';
import FileInput from '../../../common/FileInput';

const FormModel = ({ data = 0, handleCloseModal }) => {
  let defaultValues = {
    temaIndicador: '',
    codigo: '',
    observaciones: '',
    activo: 'Activo' ? true : false,
    imagen: '',
    color: '',
    urlImagen: '',
  };
  defaultValues = data ? data : defaultValues;
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(moduleSchema),
    mode: 'onBlur',
  });

  const onSubmit = data => alert(JSON.stringify(data));
  const [color, setColor] = React.useState(defaultValues.color ? defaultValues.color : '#d32f2f');

  return (
    <>
      <DialogTitle>Modulo</DialogTitle>
      <FormProvider {...methods}>
        <Box
          component='form'
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          <DialogContent>
            <Grid
              container
              columnSpacing={3}
              rowSpacing={2}
            >
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <FileInput
                    accept='image/png, image/jpg, image/jpeg, image/gif'
                    name='profileImage'
                    label='Subir Archivo'
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="temaIndicador"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) =>
                    <TextField
                      autoComplete='off'
                      size='small'
                      required
                      placeholder='Accesibilidad ciclista'
                      error={!!error}
                      helperText={error ? error.message : null}
                      variant='outlined'
                      label='Tema indicador'
                      {...field}
                    />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="codigo"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => <TextField
                    size='small'
                    required
                    placeholder='123'
                    error={!!error}
                    helperText={error ? error.message : null}
                    variant='outlined'
                    label='Código'
                    {...field}
                  />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="color"
                  control={methods.control}
                  render={({ field }) => (
                    <ColorPicker color={color} onChange={setColor} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="observaciones"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) =>
                    <TextField
                      multiline
                      error={!!error}
                      helperText={error ? error.message : null}
                      rows={3}
                      sx={{ width: '100%' }}
                      variant='outlined'
                      label='Observaciones'
                      {...field}
                    />}
                />
              </Grid>
              <Grid item xs={1}>
                <Controller
                  name="activo"
                  control={methods.control}
                  render={({ field }) => (
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch {...field} defaultChecked={defaultValues.activo === 'Activo' ? true : false} />
                        }
                        label='Activo'
                        labelPlacement='end'
                      />
                    </FormGroup>
                  )} />
              </Grid>
            </Grid>
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
export default FormModel;