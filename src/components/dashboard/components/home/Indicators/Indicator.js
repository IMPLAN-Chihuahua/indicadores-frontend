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
import CatalogPicker from '../../../common/CatalogPicker';



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
									<Box className='body-right-content-title'>
										<Typography variant="h6" component="div">
											Componentes del indicador
										</Typography>
									</Box>
									<Box container>
										<Grid container className='body-right-catalogos'>
											<Grid item xs={12} md={4}>
												<OdsPicker odsId={1} />
											</Grid>
											<Grid item xs={12} md={4}>
												<CatalogPicker />
											</Grid>
											<Grid item xs={12} md={4}>
												<CatalogPicker />
											</Grid>
										</Grid>
										<Box item xs={12} md={12} className='body-right-mapa'>
											<Box className='body-right-content-title'>
												<Typography variant="h6" component="div">
													Mapa
												</Typography>
											</Box>
											<div className='mapa-container'>
												<img src={`https://res.cloudinary.com/davzo6qf4/image/upload/v1644535117/mapa_mwlhkq.png`} alt='mapa' className='indicator-map' />
												<IconButton className='mapa-button'>
													<Avatar>
														<EditOutlinedIcon />
													</Avatar>
												</IconButton>
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
					<br />

				</Box>
				<Box className='indicator-buttons'>
					<Button type='submit' variant='contained'>Cancelar</Button>
					<Button type='' variant='contained'>Guardar</Button>
				</Box>
			</FormProvider >
		</Box >
	)
}
