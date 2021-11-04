import React, { useCallback } from 'react';
import {
    Box,
    Typography,
    TextField,
    Container,
    Button,
    Grid,
    Link,
    CssBaseline
} from '@mui/material';
import api from '../../api/APIUtils';
import { Link as RouterLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

const Login = () => {
    const { control, handleSubmit } = useForm();

    const login = useCallback(async (data) => {
        console.log(data);
        return;
        await api.post('/login', {})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, []);


    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography component="h1" variant="h3">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(login)}
                    noValidate
                    sx={{ mt: 1 }}>
                    <Controller
                        name="correo"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="normal"
                                label="Correo"
                                autoComplete="email"
                                required
                                type="email"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={value}
                                onChange={onChange}
                                fullWidth
                                autoFocus
                            />
                        )} />
                    <Controller
                        name="clave"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error }
                        }) => (
                            <TextField
                                margin="normal"
                                label="Clave"
                                autoComplete="current-password"
                                required
                                type="password"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={value}
                                onChange={onChange}
                                fullWidth
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 3 }}>
                        Iniciar Sesion
                    </Button>
                    <Grid container>
                        <Grid item xs sx={{ display: 'flex' }}>
                            <Link component={RouterLink} to="/" underline="hover" variant="body2">¿Olvidaste tu contraseña?</Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/register" replace underline="hover" variant="body2">Registrarse</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;