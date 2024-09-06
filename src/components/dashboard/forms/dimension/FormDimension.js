import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { createObjetivoSChema } from '../../../../utils/validator';
import { Box, Button, DialogActions, DialogContent, Grid, TextField } from '@mui/material';
import { ImageInput } from '../../../common/FileInput';
import ColorPicker from '../../common/ColorPicker';

export const FormDimension = (props) => {
  const parseToFormData = (objetivo) => {
    const formData = new FormData();
    for (const key in objetivo) {
      if (key === 'urlImagen') {
        formData.append('urlImagen', objetivo[key][0] || null);
        continue;
      }
      if (objetivo[key]) {
        formData.append(key, objetivo[key]);
      }
    }
    return formData;
  }


  const { selectedObjetivo, handleCloseModal, action } = props;

  const methods = useForm({
    defaultValues: {
      titulo: '',
      descripcion: '',
      urlImagen: '',
      color: '',
    },
    // resolver: yupResolver(createObjetivoSChema),
  });

  const { control, reset, handleSubmit } = methods;

  const onSubmit = (data) => {
    console.count(data);
  }

  useEffect(() => {
    if (!selectedObjetivo) return;
    reset({
      ...selectedObjetivo,
      urlImagen: [selectedObjetivo.urlImagen]
    });
  }, [])

  return (
    <FormProvider {...methods}>
      <Box
        component={'form'}
        noValidate
        id='formObjetivo'
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ImageInput
                name='urlImagen'
                label='Imagen representativa'
                height='400px'
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="titulo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Título'
                    fullWidth
                    required
                    multiline
                    minRows={2}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Descripción'
                    fullWidth
                    required
                    multiline
                    minRows={4}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='color'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ColorPicker
                    color={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            type='submit'
            variant='contained'
            form='formObjetivo'
            onClick={handleSubmit(onSubmit)}
          >Guardar</Button>
        </DialogActions>
      </Box>
    </FormProvider >
  )
}
