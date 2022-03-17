import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FileInput from '../../../common/FileInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../../../../utils/userValidator';
import { createUser } from '../../../../services/userService';
import { useAlert } from '../../../../contexts/AlertContext';

const FormUser = ({ handleCloseModal }) => {
  const alert = useAlert();
  const methods = useForm({
    defaultValues: {
      correo: '',
      clave: '',
      confirmClave: '',
      activo: true,
      idRol: 2,
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: ''
    },
    resolver: yupResolver(createUserSchema),
    mode: 'onBlur'
  });
  
  const onSubmit = async (data) => {
    const { confirmClave, ...user } = data
    const formData = new FormData();

    for (const key in user) {
      if (key === 'profileImage' && user[key]) {
        formData.append(key, user[key][0])
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
    try {
      await createUser(formData);
      alert.success('Usuario creado exitosamente');
      handleCloseModal();
    } catch (err) {
      alert.error(err);
    }
  };

  return (
    <>
      <DialogTitle>Usuario</DialogTitle>
      <FormProvider {...methods}>
        <Box
          component='form'
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          <DialogContent>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12} >
                <Typography variant="subtitle1" component="h4">
                  Cuenta
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FileInput
                  accept='image/png, image/jpg, image/jpeg, image/gif'
                  name='profileImage'
                />
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
                      required
                      placeholder='johndoe@email.com'
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
              <Grid item xs={12} sm={6}>
                <Controller
                  name="idRol"
                  defaultValue={2}
                  control={methods.control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id='rol-label'>Rol</InputLabel>
                      <Select
                        id='id-rol'
                        labelId='rol-label'
                        label='Rol'
                        {...field}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Usuario</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="activo"
                  control={methods.control}
                  render={({ field }) => (
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch {...field} defaultChecked={true} />}
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
            <Button variant='contained' type='submit'>Aceptar</Button>
          </DialogActions>
        </Box>
      </FormProvider>
    </>
  );
}

export default FormUser;