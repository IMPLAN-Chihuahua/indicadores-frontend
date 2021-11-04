import {
    Container,
    CssBaseline,
    Typography,
    Box,
    OutlinedInput,
    TextField,
    Grid,
    Button,
    Link,
    InputAdornment,
    IconButton,
    InputLabel,
    FormControl,
    FormHelperText
} from '@mui/material';
import {
    VisibilityOff,
    Visibility
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const Register = () => {
    const [claveVisible, setClaveVisible] = useState(false);
    const { control, handleSubmit } = useForm();
    
    const handleShowPassword = () => {
        setClaveVisible(!claveVisible);
    };

    const onSubmit = useCallback(async (data) => {
        console.log(data);

    }, []);

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Typography component="h1" variant="h3">
                    Registro
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="nombres"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Este campo es requerido" }}
                                render={(
                                    {
                                        field: { onChange, value },
                                        fieldState: { error }
                                    }) => (
                                    <TextField
                                        onChange={onChange}
                                        value={value}
                                        error={!!error}
                                        label="Nombre (s)"
                                        helperText={error ? error.message : null}
                                        required
                                        autoFocus
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="apellidopaterno"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Este campo es requerido" }}
                                render={(
                                    {
                                        field: { onChange, value },
                                        fieldState: { error }
                                    }) => (
                                    <TextField
                                        onChange={onChange}
                                        value={value}
                                        error={!!error}
                                        label="Apellido Paterno"
                                        helperText={error ? error.message : null}
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="correo"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Este campo es requerido" }}
                                render={(
                                    {
                                        field: { onChange, value },
                                        fieldState: { error }
                                    }) => (
                                    <TextField
                                        onChange={onChange}
                                        value={value}
                                        error={!!error}
                                        label="Correo"
                                        helperText={error ? error.message : null}
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="clave"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Este campo es requerido" }}
                                render={(
                                    {
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
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, mb: 3 }}>
                        Registrar
                    </Button>
                </Box>
                <Grid
                    container
                    justifyContent="flex-end">
                    <Grid item xs={3}>
                        <Link
                            component={RouterLink}
                            to="/login"
                            replace
                            underline="hover"
                            variant="body2">Iniciar sesion</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Register;