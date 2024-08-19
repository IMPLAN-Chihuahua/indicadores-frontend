import {
  Box, Button, TextField, Grid, FormGroup,
  FormControlLabel, DialogContent, DialogActions, Checkbox
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, FormProvider } from "react-hook-form";
import ColorPicker from '../../common/ColorPicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTemaSchema } from '../../../../utils/validator';
import { ImageInput } from '../../../common/FileInput';
import { showAlert } from '../../../../utils/alert';
import { createModule, updateModule } from '../../../../services/moduleService';

export const FORM_TEMA_ACTIONS = {
  NEW: 'Nuevo',
  EDIT: 'Editar'
}

const parseToFormData = (tema) => {
  const formData = new FormData();
  for (const key in tema) {
    if (key === 'image') {
      formData.append('urlImagen', tema[key][0] || null);
      continue;
    }
    if (key === 'activo') {
      formData.append(key, tema[key] ? true : false);
      continue;
    }
    if (tema[key]) {
      formData.append(key, tema[key]);
    }
  }
  return formData;
}

const FormTemaInteres = (props) => {
  const { selectedTema, handleCloseModal, action } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const methods = useForm({
    defaultValues: {
      temaIndicador: '',
      codigo: '',
      observaciones: '',
      activo: true,
      color: '#D2D2D2',
    },
    resolver: yupResolver(createTemaSchema),
  });
  const { control, reset, handleSubmit } = methods;
  const { NEW, EDIT } = FORM_TEMA_ACTIONS;

  const handleAction = (action, tema) => {
    const formData = parseToFormData(tema);
    switch (action) {
      case NEW:
        return createModule(formData);
      case EDIT:
        return updateModule(tema.id, formData);
      default:
        Promise.reject(new Error('Invalid action'));
    }
  }

  const onSubmit = data => {
    setSubmitting(true);
    handleAction(action, data)
      .then(res => {
        if (res) {
          showAlert({
            title: 'Operación realizada con éxito',
            icon: 'success',
          }).then(handleCloseModal)
        }
      })
      .catch(err => {
        showAlert({
          title: 'Hubo un error',
          icon: 'error',
          text: err
        })
      })
      .finally(_ => {
        setSubmitting(false);
      })
  }

  useEffect(() => {
    if (!selectedTema) {
      return;
    }
    reset({
      ...selectedTema,
      activo: selectedTema.activo,
      image: [selectedTema.urlImagen]
    })
  }, [selectedTema])

  return (
    <FormProvider {...methods}>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
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
                <ImageInput
                  name='image'
                  label='Imagen representativa'
                  height='400px'
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="temaIndicador"
                control={control}
                render={({ field, fieldState: { error } }) =>
                  <TextField
                    autoComplete='off'
                    fullWidth
                    required
                    placeholder='Accesibilidad ciclista'
                    error={!!error}
                    helperText={error ? error.message : null}
                    variant='outlined'
                    label='Tema de interés'
                    {...field}
                  />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="codigo"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    required
                    fullWidth
                    placeholder='ASD'
                    error={!!error}
                    helperText={error ? error.message : null}
                    variant='outlined'
                    label='Código'
                    {...field}
                  />)}
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
            <Grid item xs={12}>
              <Controller
                name="descripcion"
                control={control}
                render={({ field, fieldState: { error } }) =>
                  <TextField
                    multiline
                    error={!!error}
                    helperText={error ? error.message : null}
                    rows={3}
                    sx={{ width: '100%' }}
                    variant='outlined'
                    label='Descripción'
                    value={field.value}
                    onChange={field.onChange}
                  />}
              />
            </Grid>
            <Grid item xs={1}>
              <Controller
                name='activo'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={value}
                          onChange={(e) => onChange(e.target.checked)}
                        />
                      )}
                      label='Activo'
                    />
                  </FormGroup>
                )} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            type='submit'
            variant='contained'
            disabled={isSubmitting}
          >Guardar</Button>
        </DialogActions>
      </Box>
    </FormProvider>
  )
}
export default FormTemaInteres;