import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/validator';
import Copyright from './Copyright';


const LoginComponent = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });
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
                    <Typography component="h1" variant="h4" mt={2} sx={{fontSize: '24px'}}>
                        INICIAR SESIÓN
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
                                    sx={{ mb: 2, mt: 2,}}
                                    size='small'
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
                                <FormControl margin="dense" variant="outlined" fullWidth
                                size='small'
                                >
                                 
                                    <InputLabel
                                        htmlFor="clave"
                                        error={!!error}
                                    >Contraseña
                                    </InputLabel>
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
                                        label="contraseña"
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
                        <Link component={RouterLink} to="/" underline="hover" variant="body2" >¿Olvidaste tu contraseña?</Link>
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
        </>
    );
};

export default LoginComponent;