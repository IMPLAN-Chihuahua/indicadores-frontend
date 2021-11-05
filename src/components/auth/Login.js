import React, { useCallback, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    OutlinedInput,
    Container,
    Button,
    Grid,
    Link,
    CssBaseline,
    InputAdornment,
    IconButton,
    InputLabel,
    FormControl,
    FormHelperText
} from '@mui/material';
import api from '../../api/APIUtils';
import {
    VisibilityOff,
    Visibility
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

const Login = () => {
    const { control, handleSubmit } = useForm();
    const [claveVisible, setClaveVisible] = useState(false);

    const login = useCallback(async (data) => {
        console.log(data);
        return;
        await api.post('/login', {})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, []);

    const handleShowPassword = () => {
        setClaveVisible(!claveVisible);
    };


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
                        rules={{ required: "Por favor, ingresa tu correo" }}
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
                        rules={{ required: "Por favor, ingresa la clave de esta cuenta" }}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error }
                        }) => (
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel
                                    htmlFor="clave"
                                    required
                                    error={!!error}
                                >Clave</InputLabel>
                                <OutlinedInput
                                    id="clave"
                                    autoComplete="current-password"
                                    required
                                    type={claveVisible ? "text" : "password"}
                                    error={!!error}
                                    value={value}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toogle password visibility"
                                                onClick={handleShowPassword}
                                                onMouseDown={e => e.preventDefault()}
                                                edge="end"
                                            >
                                                {claveVisible ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Clave"
                                />
                                <FormHelperText error={!!error} id="clave-error">
                                    {error ? error.message : null}
                                </FormHelperText>
                            </FormControl>
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