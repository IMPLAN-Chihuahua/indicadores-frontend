import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller, useForm } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const FormUser = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      correo: '',
      password: '',
      confirmPassword: '',
      activo: true,
      idRol: 2,
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: ''
    }
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Container sx={{
      mt: 3, pt: 4, pb: 4, border: '1px solid lightgray', maxWidth: {
        sm: 'sm',
      }
    }}>
      <CssBaseline />
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Grid container columnSpacing={3} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h3">
              Cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              backgroundColor='aliceBlue'
              height={150}
            >
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Controller
              name="correo"
              control={control}
              render={({
                field: { onChange, value }
              }) => (
                <TextField
                  label='Correo'
                  type='email'
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, value }
              }) => (
                <TextField
                  label='Contraseña'
                  type='password'
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({
                field: { onChange, value }
              }) => (
                <TextField
                  label='Confirmar Contraseña'
                  type='password'
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
              control={control}
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
              control={control}
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
              control={control}
              render={({
                field: { onChange, value }
              }) => (
                <TextField
                  label='Nombres'
                  type='text'
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="apellidoPaterno"
              control={control}
              render={({
                field: { onChange, value }
              }) => (
                <TextField
                  label='Apellido Paterno'
                  type='text'
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="apellidoMaterno"
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
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='submit' variant='contained'>Crear</Button>
          </Grid>

        </Grid>
      </Box>
    </Container>
  );
}

export default FormUser;