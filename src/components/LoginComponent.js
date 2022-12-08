import React, { useState } from 'react';
import {
	Box, Typography, TextField,
	OutlinedInput, Container, Button,
	Link, InputAdornment, IconButton, InputLabel,
	FormControl, FormHelperText
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/validator';
import { useAlert } from '../contexts/AlertContext';

const LoginComponent = () => {
	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(loginSchema)
	});
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const [passwordIsVisible, setPasswordIsVisible] = useState(false);
	const handleShowPassword = () => setPasswordIsVisible(prev => !prev);
	const auth = useAuth();
	const alert = useAlert();

	const onSubmit = data => {
		auth.handleLogin(data,
			() => navigate(from, { replace: true }),
			(errorMessage) => { alert.error(errorMessage) });
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography component="h1" variant="h1" mt={4} sx={{ fontSize: '28px' }}>
					Chihuahua en Datos
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
								sx={{ mb: 2, mt: 2, }}
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
									type={passwordIsVisible ? "text" : "password"}
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
												{passwordIsVisible ? <VisibilityOff /> : <Visibility />}
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
					<Link component={RouterLink} to="/recuperacion-de-cuenta" underline="hover" variant="body2" >¿Olvidaste tu contraseña?</Link>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginComponent;