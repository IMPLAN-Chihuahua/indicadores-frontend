import React, { useEffect, useState } from 'react'
import './indicator.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Button, Container, FormControl, Grid, Input, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';

import { Controller, FormProvider, useForm } from 'react-hook-form';

import { getIndicator } from '../../../../../services/indicatorService';
import { useParams } from 'react-router-dom';

import FileInput from '../../../../common/FileInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { createIndicatorSchema } from '../../../../../utils/indicatorValidator';
import { Box } from '@mui/system';

export const Indicator = () => {

	const { id } = useParams();
	let defaultValues = {
		anioUltimoValorDisponible: '',
		definicion: '',
		formula: {},
		historicos: [],
		id: '',
		mapa: {},
		nombre: '',
		tendenciaActual: '',
		tendenciaDeseada: '',
		ultimoValorDisponible: '',
		urlImagen: '',
		observaciones: '',
		codigo: '',
		codigoObjeto: '',
		mapa: {
			url: '',
		}
	}
	const [indicator, setIndicator] = useState(defaultValues);

	useEffect(() => {
		getIndicator(id).then(res => {
			setIndicator(res);
		})
			.catch(err => {
				setIndicator([])
			})
	}, []);

	useEffect(() => {
		if (indicator) {
			methods.reset({
				...indicator,
			})
		}
	}, [indicator])

	const methods = useForm({
		defaultValues,
		resolver: yupResolver(createIndicatorSchema),
		mode: 'onBlur',
	});
	const onSubmit = indicator => alert(indicator);

	return (
		<Box>
			<Box className='nav-indicator'>
				<Box className='nav-indicator-left nav-arrows'>
					<ArrowBackIosNewIcon className='nav-indicator-icon' />
				</Box>
				<Box className='nav-indicator-center'>
					<Typography variant='h6'>{indicator.nombre}</Typography>
				</Box>
				<Box className='nav-indicator-right nav-arrows'>
					<ArrowForwardIosIcon className='nav-indicator-icon' />
				</Box>
			</Box>
			<FormProvider {...methods}>
				<Box
					component='form'
					onSubmit={methods.handleSubmit(onSubmit)}
					className='body-indicator'
				>
					<Grid container spacing={5}>
						<Grid item xs={4} md={4}>
							<Box className="body-upper-left-title">
								<Typography variant="subtitle1" component="h4">
									Información	de indicador
								</Typography>
							</Box>
							<Box className='body-upper-left'>
								{
									indicator.urlImagen ?
										<img src={indicator.urlImagen} alt={indicator.nombre} className='image-indicator' />
										:
										<FileInput
											accept='image /png, image/jpg, image/jpeg, image/gif'
											name='profileImage'
											className='image-indicator'
										/>
								}
								<Controller
									name='nombre'
									control={methods.control}
									render={({ field, fieldState: { error }
									}) =>
										<TextField
											autoComplete='off'
											size='small'
											required
											placeholder='Porcentaje de hogares con jefatura femenina.'
											error={!!error}
											helperText={error ? error.message : null}
											variant='outlined'
											label='Nombre del indicador'
											type='text'
											{...field}
										/>
									}
								/>
								<Controller
									name="definicion"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<TextField
											label='Definicion del indicador'
											type='text'
											size='small'
											required
											placeholder='Hogares donde una mujer es reconocida como jefa de familia por los miembros el hogar.'
											error={!!error}
											helperText={error ? error.message : null}
											onChange={onChange}
											value={value}
										/>
									)}
								/>
							</Box>
							<Box className='body-mid-left'>
								<Typography variant="subtitle1" component="h4">
									Valores
								</Typography>
								<Controller
									name="ultimoValorDisponible"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<TextField
											label='Ultimo valor disponible'
											size='small'
											type='number'
											required
											placeholder='700'
											error={!!error}
											helperText={error ? error.message : null}
											onChange={onChange}
											value={value}
										/>
									)}
								/>
								<Controller
									name="anioUltimoValorDisponible"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<TextField
											label='Año del último valor registrado'
											size='small'
											type='number'
											required
											placeholder={`${new Date().getFullYear()}`}
											error={!!error}
											helperText={error ? error.message : null}
											onChange={onChange}
											value={value}
										/>
									)}
								/>
								<Controller
									name="tendenciaActual"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<>
											<FormControl fullWidth>
												<InputLabel>Tendencia actual</InputLabel>
												<Select
													label='Tendencia actual'
													type='text'
													size='small'
													required
													placeholder='Hogares donde una mujer es reconocida como jefa de familia por los miembros el hogar.'
													error={!!error}
													onChange={onChange}
													value={value}
												>
													<MenuItem value='ASCENDENTE'>Ascendente</MenuItem>
													<MenuItem value='DESCENDENTE'>Descendente</MenuItem>
													<MenuItem value='NA'>No aplica</MenuItem>
												</Select>
											</FormControl>
										</>
									)}
								/>
								<Controller
									name="tendenciaDeseada"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<>
											<FormControl fullWidth>
												<InputLabel>Tendencia deseada</InputLabel>
												<Select
													label='Tendencia actual'
													type='text'
													required
													placeholder='Hogares donde una mujer es reconocida como jefa de familia por los miembros el hogar.'
													size='small'
													error={!!error}
													onChange={onChange}
													value={value}
												>
													<MenuItem value='ASCENDENTE'>Ascendente</MenuItem>
													<MenuItem value='DESCENDENTE'>Descendente</MenuItem>
													<MenuItem value='NA'>No aplica</MenuItem>
												</Select>
											</FormControl>
										</>
									)}
								/>
							</Box>
						</Grid>
						<Grid item xs={2} md={2}>

						</Grid>
						<Grid item xs={5} md={5}>
							<Box className='body-upper-right-title'>
								<Typography variant="subtitle1" component="h4">
									Identificadores
								</Typography>
							</Box>
							<Box className='body-upper-right'>
								<Controller
									name="codigo"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<TextField
											label='Código tema'
											type='text'
											required
											size='small'
											placeholder='013'
											error={!!error}
											helperText={error ? error.message : null}
											onChange={onChange}
											value={value}
										/>
									)}
								/>
								<Controller
									name="codigoObjeto"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<TextField
											label='Código indicador'
											type='text'
											required
											size='small'
											placeholder='013-123-456'
											error={!!error}
											helperText={error ? error.message : null}
											onChange={onChange}
											value={value}
										/>
									)}
								/>
								<Switch />
							</Box>
							<br />
							<Box className='body-mid-right'>
							</Box>
						</Grid>
					</Grid>
					<br />
					<br />
					<Grid container spacing={1}>
						<Grid item xs={12} md={12}>
							<Box className='body-down-title'>
							</Box>
							<Box className='body-down'>
								<Controller
									name="observaciones"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<TextField
											label='Observaciones adicionales'
											size='small'
											type='text'
											placeholder='Comentarios del autor'
											multiline
											rows={3}
											className='indicator-observaciones'
											error={!!error}
											helperText={error ? error.message : null}
											onChange={onChange}
											value={value}
										/>
									)}
								/>
							</Box>
						</Grid>
					</Grid>
					<br />
					<Grid container spacing={1}>
						<Grid item xs={12} md={12}>
							<Box className='body-down-title'>
								<Typography variant="subtitle1" component="h4">
									Mapa
								</Typography>
								<img src='https://res.cloudinary.com/davzo6qf4/image/upload/v1644535117/mapa_mwlhkq.png' alt='mapa' className='indicator-map-image' />
								<br />
								<Controller
									name="mapa.url"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<TextField
											label='Mapa'
											size='small'
											type='text'
											placeholder='URL del mapa'
											error={!!error}
											className='indicator-mapa'
											helperText={error ? error.message : null}
											onChange={onChange}
											value={value}
										/>
									)}
								/>
							</Box>
						</Grid>
					</Grid>
					<Grid container spacing={1}>
						<Grid item xs={12} md={12} className='indicator-buttons'>
							<Button type='submit' variant='contained'>Cancelar</Button>
							<Button type='' variant='contained'>Guardar</Button>
						</Grid>
					</Grid>
				</Box>
			</FormProvider>
		</Box>
	)
}
