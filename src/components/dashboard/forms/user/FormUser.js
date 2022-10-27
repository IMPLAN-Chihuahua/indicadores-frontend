import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import {
  Checkbox, DialogActions, DialogContent, DialogTitle,
  FormControl, FormHelperText, InputLabel, MenuItem, Select,
  Box, TextField, Grid, Typography, Button
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ImageInput } from '../../../common/FileInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../../../../utils/userValidator';
import { createUser } from '../../../../services/userService';
import { useAlert } from '../../../../contexts/AlertContext';
import { getRoles } from '../../../../services/roleService';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { showAlert } from '../../../../utils/alert';
import useIsMounted from '../../../../hooks/useIsMounted';

export const FORM_USER_ACTIONS = {
  NEW: 'Nuevo',
  EDIT: 'Editar'
}

const parseUserToFormData = (user) => {
  const formData = new FormData();
  for (const key in user) {
    if (key === 'profileImage' && user[key]) {
      formData.append('urlImagen', user[key][0])
      continue;
    }
    if (key === 'activo') {
      formData.append(key, user[key] ? 'SI' : 'NO');
      continue;
    }
    if (user[key]) {
      formData.append(key, user[key]);
    }
  }
  return formData;
}

const SelectRoleInput = () => {
  const methods = useFormContext();
  const [roles, setRoles] = useState([]);
  const isMounted = useIsMounted();
  const defineRoles = useCallback(async () => {
    try {
      const { data: roles } = await getRoles();
      if (isMounted()) {
        setRoles(roles.data);
      }
    } catch (err) {
      alert.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    defineRoles();
  }, [defineRoles]);
  
  return (
    <Controller
      name="idRol"
      control={methods.control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth required>
          <InputLabel
            id='rol-label'
            error={!!error}
            htmlFor='id-rol'
          >
            Rol
          </InputLabel>
          <Select
            id='id-rol'
            labelId='rol-label'
            label='Rol'
            error={!!error}
            {...field}
          >
            {roles.map(rol => <MenuItem key={rol.id} value={rol.id}>{rol.rol}</MenuItem>)}
          </Select>
          <FormHelperText error={!!error} id="rol-error">
            {error ? error.message : null}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

const FormUser = (props) => {
  const alert = useAlert();
  const methods = useForm({
    defaultValues: {
      correo: '',
      clave: '',
      confirmClave: '',
      activo: true,
      idRol: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: ''
    },

    mode: 'onBlur'
  });
  const { handleCloseModal, action } = props

  const onSubmit = async (data) => {
    console.log('SUBMIT', data)
    const { confirmClave, ...user } = data;
    const formData = parseUserToFormData(user);

    createUser(formData)
      .then(res => {
        showAlert({
          title: 'Usuario creado exitosamente'
        });
      })
      .catch(err => {
        showAlert({
          title: 'Ha ocurrido un error',
          customConfirmButtonText: 'Ok',
          text: err,
          icon: 'error'
        });
      })
  };

  useEffect(() => {
    if (props.selectedUser) {
      methods.reset({
        ...props.selectedUser,
        activo: props.selectedUser === 'SI',
      });
    }
  }, [])

  return (
    <>
      <DialogTitle>{action} Usuario</DialogTitle>
      <FormProvider {...methods}>
        <Box
          component='form'
          form='form-user'
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          onReset={methods.reset}
        >
          <DialogContent>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ImageInput
                    name='profileImage'
                    label='Imagen de perfil'
                    height='400px'
                  />
                </Box>
              </Grid>
              <Grid item sm={12}>
                <Controller
                  name="correo"
                  control={methods.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label='Correo'
                      type='email'
                      placeholder='johndoe@email.com'
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoComplete={false}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      required
                    />
                  )} />
              </Grid>
              {
                action === FORM_USER_ACTIONS.NEW && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="clave"
                        control={methods.control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <TextField
                            label='Contraseña'
                            type='password'
                            required
                            error={!!error}
                            helperText={error ? error.message : null}
                            onChange={onChange}
                            value={value}
                            fullWidth
                          />
                        )} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="confirmClave"
                        control={methods.control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error }
                        }) => (
                          <TextField
                            label='Confirmar Contraseña'
                            type='password'
                            required
                            error={!!error}
                            helperText={error ? error.message : null}
                            onChange={onChange}
                            value={value}
                            fullWidth
                          />
                        )} />
                    </Grid>
                  </>
                )
              }
              <Grid item xs={12} sm={6}>
                <SelectRoleInput />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="activo"
                  control={methods.control}
                  render={({ field }) => (
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox {...field} defaultChecked={true} />}
                        label="Activo" />
                    </FormGroup>
                  )} />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="subtitle1" component="h4">
                  Información Básica
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Controller
                  name="nombres"
                  control={methods.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label='Nombres'
                      type='text'
                      required
                      placeholder='John'
                      error={!!error}
                      helperText={error ? error.message : null}
                      onChange={onChange}
                      value={value}
                      fullWidth
                    />
                  )} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="apellidoPaterno"
                  control={methods.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label='Apellido Paterno'
                      type='text'
                      placeholder='Doe'
                      required
                      error={!!error}
                      helperText={error ? error.message : null}
                      onChange={onChange}
                      value={value}
                      fullWidth
                    />
                  )} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="apellidoMaterno"
                  control={methods.control}
                  render={({
                    field: { onChange, value }
                  }) => (
                    <TextField
                      label='Apellido Materno'
                      type='text'
                      onChange={onChange}
                      value={value}
                      fullWidth
                    />
                  )} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button variant='contained' type='submit' form='form-user'>Aceptar</Button>
          </DialogActions>
        </Box>
      </FormProvider>
    </>
  );
}

export default FormUser;