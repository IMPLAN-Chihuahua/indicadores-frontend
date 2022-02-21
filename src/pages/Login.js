import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    OutlinedInput,
    Container,
    Button,
    Link,
    CssBaseline,
    InputAdornment,
    IconButton,
    InputLabel,
    FormControl,
    FormHelperText,
    Alert,
    Snackbar,
    Paper
} from '@mui/material';
import {
    VisibilityOff,
    Visibility,
} from '@mui/icons-material'
import LockIcon from '@mui/icons-material/Lock';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Copyright from '../components/Copyright';

const Login = () => {
    const { control, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';
    const [claveVisible, setClaveVisible] = useState(false);
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('');
    const handleShowPassword = () => {
        setClaveVisible(!claveVisible);
    };
    const auth = useAuth();
    const onSubmit = data => {
        auth.handleLogin(data,
            () => navigate(from, { replace: true }),
            (errorMessage) => {
                setOpen(true)
                setError(errorMessage)
            });
    };

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    };

    return (
        <>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 7,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Box
                        sx={{
                            backgroundColor: 'lightblue',
                            borderRadius: 50,
                            height: 80,
                            width: 80,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <LockIcon fontSize='large' />
                    </Box>
                    <Typography component="h1" variant="h3" mt={2}>
                        Iniciar Sesión
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
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
                                    sx={{ mb: 2, mt: 2 }}
                                    label="Correo"
                                    autoComplete="email"
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
                                <FormControl margin="dense" variant="outlined" fullWidth>
                                    <InputLabel
                                        htmlFor="clave"
                                        error={!!error}
                                    >Contraseña</InputLabel>
                                    <OutlinedInput
                                        id="clave"
                                        autoComplete="current-password"
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
                                        label="Contraseña"
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
                            disabled={auth.isLoading}
                            variant="contained"
                            sx={{ mt: 2, mb: 3 }}>
                            Iniciar Sesion
                        </Button>
                        <Link component={RouterLink} to="/" underline="hover" variant="body2">¿Olvidaste tu contraseña?</Link>
                    </Box>
                </Box>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} closeText='Cerrar'>
                        {error}
                    </Alert>
                </Snackbar>
            </Container>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                <Copyright />
            </Box>
        </>
    );
};

export default Login;