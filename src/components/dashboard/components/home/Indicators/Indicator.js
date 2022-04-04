import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './indicator.css'

import { Avatar, Badge, Button, Card, CardContent, FormControl, Grid, IconButton, Modal, Switch, TextField, Typography, Backdrop, Fade, Select, MenuItem } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { yupResolver } from '@hookform/resolvers/yup';


import { createIndicatorSchema } from '../../../../../utils/indicatorValidator';
import { getIndicator } from '../../../../../services/indicatorService';

import ImageUploader from '../../../common/ImageUploader';
import OdsPicker from '../../../common/OdsPicker';



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
		mode: 'all',
	});
	const onSubmit = indicator => alert(indicator);

	return (
		<Box className='indicator'>
			<Box className='indicator-buttons'>
				<Button type='submit' variant='contained'>Cancelar</Button>
				<Button type='' variant='contained'>Guardar</Button>
			</Box>
			<Box>
				<Grid container className='nav-indicator'>
					<Grid item xs={12} md={3}>
						<Card className='information-card'>
							<CardContent className='information-card-content'>
								<Box className='information-card-title'>
									<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
										Último valor disponible
									</Typography>
									<Typography variant="h5" component="div">
										{indicator.ultimoValorDisponible}
									</Typography>
								</Box>
								<Box className='information-card-icon'>
									<Avatar>
										<CheckCircleRoundedIcon />
									</Avatar>
								</Box>

								{/* 								
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
								/> */}

							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={3}>
						<Card className='information-card'>
							<CardContent className='information-card-content'>
								{/* <Controller
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
								/> */}
								<Box className='information-card-title'>
									<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
										Año del último valor registrado
									</Typography>
									<Typography variant="h5" component="div">
										{indicator.anioUltimoValorDisponible}
									</Typography>
								</Box>
								<Box className='information-card-icon'>
									<Avatar>
										<TodayRoundedIcon />
									</Avatar>
								</Box>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={3}>
						<Card className='information-card'>
							<CardContent className='information-card-content'>
								<Box className='information-card-title'>
									<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
										Tendencia actual calculada
									</Typography>
									{
										indicator.tendenciaActual === 'ASCENDENTE'
											? (
												<Typography variant='h5' component="div" className='tendencia-actual'>
													<ArrowUpwardIcon className='tendencia-ascendente' />
													<Typography variant='h6'>¡Ascendente!</Typography>
												</Typography>
											)
											: (
												<Typography variant='h5' component="div" className='tendencia-actual'>
													<ArrowDownwardIcon className='tendencia-descendente' />
													<Typography variant='h6'>¡Descendiente!</Typography>
												</Typography>
											)
									}
								</Box>
								<Box className='information-card-icon'>
									<Avatar>
										<TodayRoundedIcon />
									</Avatar>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
			<FormProvider {...methods}>
				<Box
					component='form'
					onSubmit={methods.handleSubmit(onSubmit)}
					className='body-indicator'
				>
					<Grid container>
						<Grid item xs={12} md={4}>
							<Box className='body-left'>
								<Typography variant="subtitle1" component="h4">
									Información	del indicador
								</Typography>
								<ImageUploader imageSource={indicator.urlImagen} altDefinition={`Fotografía de indicador: ${indicator.nombre}`} />

								{
									indicator.mapa ?
										(
											<>
												<Box className='indicator-with-map'>
													<FmdGoodIcon sx={{ fontSize: '18px' }} />
													<a href={indicator.mapa.url} target='_blank' rel="noreferrer">
														Ver mapa
													</a>
												</Box>
											</>
										)
										:
										<h2>test</h2>
								}
								<Controller
									name='nombre'
									control={methods.control}
									render={({ field, fieldState: { error }
									}) =>
										<TextField
											label='Nombre del indicador'
											type='text'
											placeholder='Porcentaje de hogares con jefatura femenina.'
											size='small'
											required
											autoComplete='off'
											sx={{ width: '60%' }}
											error={!!error}
											helperText={error ? error.message : null}
											variant='outlined'
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
											placeholder='Hogares donde una mujer es reconocida como jefa de familia por los miembros el hogar.'
											multiline
											rows={3}
											size='small'
											required
											autoComplete='off'
											sx={{ width: '60%' }}
											error={!!error}
											helperText={error ? error.message : null}
											onChange={onChange}
											value={value}
										/>
									)}
								/>
								<Controller
									name="observaciones"
									control={methods.control}
									render={({
										field: { onChange, value },
										fieldState: { error }
									}) => (
										<TextField
											label='Observaciones adicionales'
											type='text'
											placeholder='Comentarios del autor'
											multiline
											rows={4}
											size='small'
											sx={{ width: '60%' }}
											error={!!error}
											helperText={error ? error.message : null}
											onChange={onChange}
											value={value}
										/>
									)}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={8}>
							<Box className='body-right'>
								<Box className='body-right-title'>
									<Box>
										<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
											Código del indicador
										</Typography>
										<Typography variant="h5" component="div">
											{indicator.codigo}
										</Typography>
									</Box>
									<Box>
										<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
											Código del tema de indicador
										</Typography>
										<Typography variant="h5" component="div">
											{indicator.codigoObjeto}
										</Typography>
									</Box>
									<Box className='body-right-title-link'>
										<Button variant='contained'>
											ver ficha
										</Button>
									</Box>
								</Box>
								<Box className='body-right-content'>
									<Box container>
										<Box item xs={12} md={12} className='body-right-catalogos'>
											<Typography sx={{ fontSize: 14 }} gutterBottom>
												ODS del indicador
											</Typography>
											<OdsPicker odsId={1} />
										</Box>
										<Box item xs={12} md={12} className='body-right-mapa'>
											<Typography sx={{ fontSize: 14 }} gutterBottom>
												Mapa
											</Typography>
											<div className='mapa-container'>
												<img src={`https://res.cloudinary.com/davzo6qf4/image/upload/v1644535117/mapa_mwlhkq.png`} alt='mapa' className='indicator-map' />
											</div>
											<Controller
												name="mapa.url"
												control={methods.control}
												render={({
													field: { onChange, value },
													fieldState: { error }
												}) => (
													<TextField
														label='Url ArcGIS'
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
									</Box>
								</Box>
							</Box>
						</Grid>
					</Grid>

					{/* <Grid container spacing={1}>
						<Grid item xs={12} md={6}>
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
						<Grid item xs={12} md={12}>
							<Box className='body-down-title'>
							</Box>
							<Box className='body-down'>
							</Box>
						</Grid>
					</Grid>*/}
					<br />
					<br />

				</Box>
			</FormProvider >
		</Box >
	)
}
