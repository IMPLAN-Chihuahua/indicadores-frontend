import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FileInput from '../../../common/FileInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../../../../utils/userValidator';

const FormUser = () => {
  const methods = useForm({
    mode: 'onBlur',
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
    resolver: yupResolver(createUserSchema)
  });

  const onSubmit = (data) => {
    const { confirmClave, ...user } = data
    console.log(user)
  }

  return (
    <Container sx={{
      mt: 3, pt: 4, pb: 4, border: '1px solid lightgray', maxWidth: {
        sm: 'sm',
      }
    }}>
      <FormProvider {...methods}>
        <Box
          component='form'
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h3">
                Cuenta
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FileInput
                accept='image/png, image/jpg, image/jpeg, image/gif'
                name='profileImage'
                label='Subir Archivo'
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
              <Typography variant="h6" component="h3">
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained'>Crear</Button>
            </Grid>

          </Grid>
        </Box>
      </FormProvider>
    </Container>
  );
}

export default FormUser;