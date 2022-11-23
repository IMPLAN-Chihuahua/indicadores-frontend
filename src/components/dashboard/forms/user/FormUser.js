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
import { createUserSchema, editUserSchema } from '../../../../utils/userValidator';
import { createUser, updateProfile, updateUser } from '../../../../services/userService';
import { getRoles } from '../../../../services/roleService';
import { useCallback, useEffect, useState } from 'react';
import { showAlert } from '../../../../utils/alert';
import useIsMounted from '../../../../hooks/useIsMounted';
import { useAuth } from '../../../../contexts/AuthContext';

export const FORM_USER_ACTIONS = {
  NEW: 'Nuevo',
  EDIT: 'Editar',
  EDIT_PROFILE: 'Actualizar Perfil'
}

const parseUserToFormData = (user) => {
  const formData = new FormData();
  for (const key in user) {
    if (key === 'urlImagen') {
      formData.append('urlImagen', user[key][0] || null)
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
  const { control } = methods;
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
      name='idRol'
      control={control}
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
          <FormHelperText error={!!error} id='rol-error'>
            {error ? error.message : null}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

const FormUser = (props) => {
  const { handleCloseModal, action } = props;
  const { reloadCurrentUser } = useAuth();
  const methods = useForm({
    defaultValues: {
      correo: '',
      clave: '',
      confirmClave: '',
      activo: true,
      idRol: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      descripcion: ''
    },
    resolver: yupResolver(action === FORM_USER_ACTIONS.NEW ? createUserSchema : editUserSchema)
  });
  const { handleSubmit, reset, control } = methods;

  const handleAction = (action, user) => {
    const { NEW, EDIT, EDIT_PROFILE } = FORM_USER_ACTIONS;
    const formData = parseUserToFormData(user);
    switch (action) {
      case NEW:
        return createUser(formData);
      case EDIT:
        return updateUser(user.id, formData);
      case EDIT_PROFILE:
        return updateProfile(formData);
      default:
        return Promise.reject(new Error('invalid action'));
    }
  }

  const onSubmit = (user) => {
    handleAction(action, user)
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
        if (action === FORM_USER_ACTIONS.EDIT_PROFILE) {
          reloadCurrentUser();
        }
      })
  };

  useEffect(() => {
    if (!props.selectedUser) {
      return;
    }
    reset({
      ...props.selectedUser,
      apellidoMaterno: props.selectedUser.apellidoMaterno || '',
      activo: props.selectedUser.activo === 'SI',
      urlImagen: [props.selectedUser.urlImagen]
    });

  }, [])

  return (
    <FormProvider {...methods}>
      <Box
        component='form'
        id='form-user'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        onReset={reset}
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
                  name='urlImagen'
                  label='Imagen de perfil'
                  height='400px'
                />
              </Box>
            </Grid>
            <Grid item sm={12}>
              <Controller
                name='correo'
                control={control}
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
                      name='clave'
                      control={control}
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
                      name='confirmClave'
                      control={control}
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
            {
              (action === FORM_USER_ACTIONS.NEW || action === FORM_USER_ACTIONS.EDIT) && (
                <>
                  <Grid item xs={12} sm={6}>
                    <SelectRoleInput />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='activo'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />}
                            label='Activo'
                          />
                        </FormGroup>
                      )} />
                  </Grid>
                </>
              )
            }
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant='subtitle1' component='h4'>
                Información Básica
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Controller
                name='nombres'
                control={control}
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
                name='apellidoPaterno'
                control={control}
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
                name='apellidoMaterno'
                control={control}
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
            <Grid item xs={12}>
              <Controller
                name='descripcion'
                control={control}
                render={({
                  field: { onChange, value }
                }) => (
                  <TextField
                    label='Descripcion'
                    type='text'
                    onChange={onChange}
                    value={value}
                    rows={2}
                    fullWidth
                    multiline
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
  );
}

export default FormUser;