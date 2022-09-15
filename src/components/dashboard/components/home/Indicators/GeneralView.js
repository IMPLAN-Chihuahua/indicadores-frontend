import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './indicator.css'

import { Avatar, Button, Card, CardContent, FormControl, Grid, TextField, Typography, ClickAwayListener } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useAlert } from '../../../../../contexts/AlertContext';

import { yupResolver } from '@hookform/resolvers/yup';


import { createIndicatorSchema } from '../../../../../utils/indicatorValidator';
import { getIndicator, updateIndicator } from '../../../../../services/indicatorService';

import { CatalogoAutocomplete, OdsPicker } from '../../../common/CatalogPicker';
import { BeatLoader } from 'react-spinners';
import MapInput from '../../../../common/mapInput/MapInput';
import { parseDate } from '../../../../../utils/dateParser';

const ODS_ID = 1;
const UNIDAD_MEDIDA_ID = 2;
const COBERTURA_ID = 3;

export const GeneralView = () => {
	const [editingUltimoValor, setEditingUltimoValor] = useState(false);


	const alert = useAlert();
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
		observaciones: '',
		codigo: '',
		codigoObjeto: '',
		mapa: {
			url: '',
		}
	}

	useEffect(() => {
		getIndicator(id).then(res => {
			defaultValues = res ? res : defaultValues;
			methods.reset({
				...defaultValues,
			});
		})
	}, [id]);
	const methods = useForm({
		defaultValues,
		resolver: yupResolver(createIndicatorSchema),
		mode: 'all',
	});

	const toggleEditing = () => {
		setEditingUltimoValor(true);
	}

	const onSubmit = async (data) => {
		const { ...indicator } = data;
		const formData = new FormData();

		for (const key in indicator) {
			if (key === 'urlImagen' && indicator[key]) {
				formData.append(key, indicator[key][0])
				continue;
			}

			if (indicator[key]) {
				formData.append(key, indicator[key]);
			}
		};

		try {
			await updateIndicator(id, formData);
			alert.success('Indicador actualizado exitosamente');
		} catch (error) {
			alert.error(error);
		}
	};

	const boobp = methods.watch('urlImagen');
	return (
		(
			<FormProvider {...methods}>
				{
					methods.watch('nombre').length > 0 ?
						(
							<>
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
															<Controller
																name='ultimoValorDisponible'
																control={methods.control}
																render={({
																	field,
																	fieldState: { error }
																}) => (
																	editingUltimoValor ?
																		(
																			<ClickAwayListener
																				onClickAway={() => {
																					setEditingUltimoValor(false);
																				}}
																			>
																				<TextField
																					type='text'
																					size='small'
																					required
																					autoComplete='off'
																					sx={{ width: '60%' }}
																					error={!!error}
																					helperText={error ? error.message : null}
																					variant='outlined'
																					{...field}
																				/>
																			</ClickAwayListener>
																		)
																		:
																		(
																			<Typography variant='h5' component='div' onDoubleClick={toggleEditing}>
																				{field.value}
																			</Typography>
																		)
																)}
															/>
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

														<Box className='information-card-title'>
															<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
																Año del último valor registrado
															</Typography>
															<Controller
																name='anioUltimoValorDisponible'
																control={methods.control}
																render={({
																	field: { onChange, value },
																	fieldState: { error }
																}) => (
																	<Typography variant='h5' component='div'>
																		{value}
																	</Typography>
																)
																}
															/>
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
															<Controller
																name='tendenciaActual'
																control={methods.control}
																render={({
																	field: { onChange, value },
																	fieldState: { error }
																}) => (
																	value === 'ASCENDENTE'
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
																)
																}
															/>
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
									<Box
										component='form'
										onSubmit={methods.handleSubmit(onSubmit)}
										noValidate
										onReset={methods.reset}
										className='body-indicator'
									>
										<Grid container>
											<Grid item xs={12} md={4}>
												<Box className='body-left'>
													<Typography variant="subtitle1" component="h4" className='indicador-info'>
														Información	del indicador
													</Typography>
													<Controller
														name='nombre'
														control={methods.control}
														render={({ field: { onChange, value }, fieldState: { error }
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
																onChange={onChange}
																value={value}
																className='indicador-info-input'
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
																className='indicador-info-input'
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
																className='indicador-info-input'
															/>
														)}
													/>

													<Controller
														name="mapa.url"
														control={methods.control}
														render={({
															field: { onChange, value },
															fieldState: { error }
														}) => (
															<>
																<Box className='indicator-with-map'>
																	<FmdGoodIcon sx={{ fontSize: '18px' }} />
																	<a href={value} target='_blank' rel="noreferrer">
																		Ver mapa
																	</a>
																</Box>
															</>
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
															<Controller
																name="codigo"
																control={methods.control}
																render={({
																	field: { onChange, value },
																	fieldState: { error }
																}) => (
																	<Typography variant="h5" component="div">
																		{value}
																	</Typography>
																)}
															/>
														</Box>
														<Box>
															<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
																Última actualización
															</Typography>
															<Controller
																name="updatedAt"
																control={methods.control}
																render={({
																	field: { onChange, value },
																	fieldState: { error }
																}) => (
																	<Typography variant="h5" component="div">
																		{parseDate(value)}
																	</Typography>
																)}
															/>
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
																	<Controller
																		name="catalogos[0].id"
																		control={methods.control}
																		defaultValue={`default`}
																		render={({
																			field: { value, onChange },
																			fieldState: { error }
																		}) => (
																			<OdsPicker
																				odsId={value}
																			/>
																		)}
																	/>
																</Grid>

																<Grid item xs={12} md={3}>
																	<Controller
																		name="catalogos"
																		control={methods.control}
																		defaultValue={`default`}
																		render={({
																			field: { value, onChange },
																			fieldState: { error }
																		}) => (
																			<CatalogoAutocomplete
																				id={UNIDAD_MEDIDA_ID}
																				value={value}
																				onChange={onChange}
																				label="Unidad Medida"
																				error={error}
																				required={true}
																				type={2}
																				catalog={UNIDAD_MEDIDA_ID}
																			/>
																		)}
																	/>
																</Grid>
																<Grid item xs={12} md={3}>
																	<Controller
																		name="catalogos"
																		control={methods.control}
																		defaultValue={`default`}
																		render={({
																			field: { value, onChange },
																			fieldState: { error }
																		}) => (
																			<CatalogoAutocomplete
																				id={COBERTURA_ID}
																				value={value}
																				onChange={onChange}
																				label="Cobertura geográfica"
																				error={error}
																				required={true}
																				type={2}
																				catalog={COBERTURA_ID}
																			/>
																		)}
																	/>
																</Grid>
															</Grid>
															{/* TODO¨: KILL MESELF
																Display map image
															*/}
															{/* <Box item xs={12} md={12} className='body-right-mapa'>
																<MapInput altInput='mapita' value='ww.google.com' />
															</Box> */}
														</Box>
													</Box>
												</Box>
											</Grid>
										</Grid>
										<br />
										<Box className='indicator-buttons'>
											<Button variant='contained'>Cancelar</Button>
											<Button type='submit' variant='contained' className='btn-bg'>Guardar</Button>
										</Box>
									</Box>
								</Box>
							</>
						)
						:
						<Box className="dt-loading">
							<BeatLoader size={15} color="#1976D2" />
						</Box>
				}
			</FormProvider >
		)
	)
}
