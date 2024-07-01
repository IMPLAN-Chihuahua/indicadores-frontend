import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { createDimensionSChema } from '../../../../utils/validator';
import { Box, Button, DialogActions, DialogContent, Grid, TextField } from '@mui/material';
import { ImageInput } from '../../../common/FileInput';
import ColorPicker from '../../common/ColorPicker';

export const FormDimension = (props) => {
  const parseToFormData = (dimension) => {
    const formData = new FormData();
    for (const key in dimension) {
      if (key === 'urlImagen') {
        formData.append('urlImagen', dimension[key][0] || null);
        continue;
      }
      if (dimension[key]) {
        formData.append(key, dimension[key]);
      }
    }
    return formData;
  }


  const { selectedDimension, handleCloseModal, action } = props;

  const methods = useForm({
    defaultValues: {
      titulo: '',
      descripcion: '',
      urlImagen: '',
      color: '',
    },
    // resolver: yupResolver(createDimensionSChema),
  });

  const { control, reset, handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log('aksas')
    console.log(data);
  }

  useEffect(() => {
    if (!selectedDimension) return;
    reset({
      ...selectedDimension,
      urlImagen: [selectedDimension.urlImagen]
    });
  }, [])

  return (
    <FormProvider {...methods}>
      <Box
        component={'form'}
        noValidate
        id='formDimension'
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
            form='formDimension'
            onClick={handleSubmit(onSubmit)}
          >Guardar</Button>
        </DialogActions>
      </Box>
    </FormProvider >
  )
}
