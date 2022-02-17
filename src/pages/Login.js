import React, { useCallback, useState } from 'react';
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
    FormHelperText
} from '@mui/material';
import {
    VisibilityOff,
    Visibility,
} from '@mui/icons-material'
import LockIcon from '@mui/icons-material/Lock';
import { Link as RouterLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

const Login = () => {
    const { control, handleSubmit } = useForm();
    const [claveVisible, setClaveVisible] = useState(false);
    const handleShowPassword = () => {
        setClaveVisible(!claveVisible);
    };
    const onSubmit = data => console.log(data);

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
                <Typography component="h1" variant="h3">
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
                                sx={{mb: 2, mt: 2}}
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
                            <FormControl margin="dense" variant="outlined" fullWidth>
                                <InputLabel
                                    htmlFor="clave"
                                    required
                                    error={!!error}
                                >Contraseña</InputLabel>
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
                        variant="contained"
                        sx={{ mt: 2, mb: 3 }}>
                        Iniciar Sesion
                    </Button>
                    <Link component={RouterLink} to="/" underline="hover" variant="body2">¿Olvidaste tu contraseña?</Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;