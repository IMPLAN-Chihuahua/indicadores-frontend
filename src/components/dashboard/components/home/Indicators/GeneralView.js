import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './indicator.css'

import { Button, Card, CardContent, Grid, TextField, Typography, ClickAwayListener, Checkbox, FormControlLabel } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';

import { createIndicatorSchema } from '../../../../../utils/indicatorValidator';
import { getIndicator, updateIndicator } from '../../../../../services/indicatorService';
import { getTemas } from '../../../../../services/moduleService';

import { CatalogoAutocomplete, OdsPicker } from '../../../common/CatalogPicker';
import { parseDate } from '../../../../../utils/dateParser';
import { displayLabel } from '../../../../../utils/getCatalog';
import OwnerListDropdown from './Owner/OwnerList';
import AutoCompleteInput from '../../../../common/AutoCompleteInput';
import { createHistoricos } from '../../../../../services/historicosService';
import { useAuth } from '../../../../../contexts/AuthContext';
import { isNumber } from '../../../../../utils/stringsValidator';
import { updateOrCreateCatalogo } from '../../../../../services/cataloguesService';
import PersonalLoader from '../../../../common/PersonalLoader/PersonalLoader';

const ODS_ID = 1;
const UNIDAD_MEDIDA_ID = 2;
const COBERTURA_ID = 3;
const CATALOGOS = [ODS_ID, UNIDAD_MEDIDA_ID, COBERTURA_ID];

export const GeneralView = () => {
	const [indicadorInfo, setIndicadorInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	const { user } = useAuth();

	const temasFetcher = async () => {
		let temas = await getTemas();
		temas = temas.map(({ id, temaIndicador }) => ({ id, temaIndicador }))
		return temas;
	};

	let defaultValues = {
		activo: '',
		anioUltimoValorDisponible: '',
		catalogos: [{
			id: 0,
			nombre: '',
			idCatalogo: ODS_ID
		}],
		codigo: '',
		createdAt: '',
		createdBy: '',
		definicion: '',
		formula: {},
		fuente: '',
		historicos: [],
		id: '',
		idModulo: '',
		modulo: {},
		next: '',
		nombre: '',
		observaciones: '',
		prev: '',
		tendenciaActual: '',
		ultimoValorDisponible: '',
		updatedAt: '',
		updatedBy: '',
		urlImagen: '',
		periodicidad: 0,
	}

	useEffect(() => {
		getIndicator(id).then(res => {
			setIndicadorInfo(res);
			methods.reset({
				...res,
			});
		}).finally(_ => setIsLoading(false))
	}, [id]);

	const methods = useForm({
		defaultValues,
		resolver: yupResolver(createIndicatorSchema),
		mode: 'all',
	});

	const onSubmit = async (data) => {
		let updatedVals = 0;

		const { id: idIndicador, activo, catalogos, definicion, fuente,
			idModulo, modulo, nombre, observaciones, owner, anioUltimoValorDisponible,
			ultimoValorDisponible, updatedBy, periodicidad } = data;

		const status = activo ? 'SI' : 'NO';
		const indicadorData = {
			nombre,
			definicion,
			observaciones,
			ultimoValorDisponible,
			updatedBy: id,
			activo: status,
			fuente,
			owner,
			periodicidad,
			anioUltimoValorDisponible,
		};

		const historicoData = {
			fuente,
			valor: ultimoValorDisponible,
			anio: anioUltimoValorDisponible,
			idUsuario: user.id,
		}

		const catalogosData = {
			catalogos,
			idIndicador,
		}
		updateOrCreateCatalogo(idIndicador, catalogosData);

		Swal.fire({
			title: '¿Deseas actualizar la información del indicador o sólo guardar los cambios?',
			text: "Al guardar la información del indicador no se generará un valor histórico. Si lo que quieres es actualizar el último valor disponible y generar un dato histórico, selecciona la segunda opción.",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: `Guardar cambios`,
			denyButtonText: `Actualizar indicador`,
		}).then(async (result) => {
			if (result.isConfirmed || result.isDenied) {
				if (isNumber(ultimoValorDisponible)) {
					updateData(result, idIndicador, indicadorData, historicoData, updatedVals);
				} else {
					Swal.fire({
						title: 'El último valor disponible no es un valor numérico válido',
						text: 'El valor del indicador no es un valor numérico cerrado, esto quiere decir que no es un número entero o decimal. Si estás seguro de guardar el valor de esta forma, por favor, ten en cuenta que es posible que no se pueda gráficar. Recuerda que el indicador ya cuenta con una unidad de medida.',
						showCancelButton: true,
						confirmButtonText: `Guardar`,
						cancelButtonText: `Cancelar`,
					}).then(async (result) => {
						if (result.isConfirmed) {
							updateData(result, idIndicador, indicadorData, historicoData, updatedVals);
						}
					})
				}
			}
		});

	};

	const updateData = async (result, idIndicador, indicadorData, historicoData, updatedVals) => {
		if (result.isConfirmed) {
			await updateIndicator(idIndicador, indicadorData);
			Swal.fire('Cambios guardados', '', 'success');
		} else if (result.isDenied) {
			try {
				await updateIndicator(idIndicador, indicadorData);
				updatedVals++;
				try {
					await createHistoricos(idIndicador, historicoData);
					updatedVals++;
				} catch (err) {
					console.log(err);
				}
			} catch (error) {
				console.log(error);
			}

			if (updatedVals === 2) {
				Swal.fire('Cambios guardados', '', 'success');
			} else if (updatedVals === 1) {
				Swal.fire('Algunos cambios no se pudieron guardar', 'Intenta nuevamente', 'error');
			} else {
				Swal.fire('No se pudieron guardar los cambios', 'Intenta nuevamente', 'error');
			}
		}
	}

	return (
		isLoading
			? (
				<PersonalLoader />
			)
			: (
				<Box
					sx={{ flex: '1 1 auto', overflowY: 'scroll', height: '500px' }}
					className='indicator'
				>
					<FormProvider {...methods}>
						<Box className='general-view-body'
							component='form'
							onSubmit={methods.handleSubmit(onSubmit)}
							noValidate
							onReset={methods.reset}
							id='form-indicator'
						>
							{/* Sección que contiene las tres cartas de "Último valor disponibñe", "Año" y "Tendencia" */}
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
															(
																<TextField
																	type='text'
																	size='small'
																	required
																	autoComplete='off'
																	sx={{ width: '70%' }}
																	error={!!error}
																	helperText={error ? error.message : null}
																	variant='outlined'
																	{...field}
																/>
															)
														)}
													/>
												</Box>
												<Box className='information-card-icon'>
													<CheckCircleRoundedIcon className="indicador-icon" />
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
															field,
															fieldState: { error }
														}) => (
															(
																<TextField
																	type='text'
																	size='small'
																	required
																	autoComplete='off'
																	sx={{ width: '70%' }}
																	error={!!error}
																	helperText={error ? error.message : null}
																	variant='outlined'
																	{...field}
																/>
															)
														)}
													/>
												</Box>
												<Box className='information-card-icon'>
													<TodayRoundedIcon className="indicador-icon" />
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
													<TroubleshootIcon className="indicador-icon" />
												</Box>
											</CardContent>
										</Card>
									</Grid>
								</Grid>
							</Box>
							<Box>
								<Grid container>
									{/* Sección izquierda que contiene la información del indicador */}
									<Grid item xs={12} md={4}>
										<Box className='body-left'>
											<Typography variant="subtitle1" component="h4" className='indicador-info'>
												Información	del indicador
											</Typography>
											<Controller
												control={methods.control}
												name='modulo'
												defaultValue={null}
												render={({ field: { value, onChange }, fieldState: { error } }) => (
													<AutoCompleteInput
														value={value}
														onChange={onChange}
														error={error}
														label='Tema de interes'
														helperText='Tema al que pertenece el indicador'
														getOptionLabel={(item) => item.temaIndicador}
														fetcher={temasFetcher}
														required
													/>
												)}
											/>
											<Controller
												name='nombre'
												control={methods.control}
												render={({ field: { onChange, value }, fieldState: { error }
												}) => (
													<TextField
														label='Nombre del indicador'
														type='text'
														placeholder='Porcentaje de hogares con jefatura femenina.'
														size='small'
														required
														autoComplete='off'
														sx={{ width: '70%' }}
														error={!!error}
														helperText={error ? error.message : null}
														variant='outlined'
														onChange={onChange}
														value={value}
														className='indicador-info-input'
													/>
												)
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
														rows={5}
														size='small'
														required
														autoComplete='off'
														sx={{ width: '70%' }}
														error={!!error}
														helperText={error ? error.message : null}
														onChange={onChange}
														value={value}
														className='indicador-info-input'
													/>
												)}
											/>
											<Controller
												name="periodicidad"
												control={methods.control}
												render={({
													field: { onChange, value },
													fieldState: { error }
												}) => (
													<TextField
														label='Periodicidad del indicador en meses'
														type='number'
														placeholder='1'
														size='small'
														sx={{ width: '70%' }}
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
														sx={{ width: '70%' }}
														error={!!error}
														helperText={error ? error.message : null}
														onChange={onChange}
														value={value}
														className='indicador-info-input'
													/>
												)}
											/>
										</Box>
									</Grid>
									{/* Sección derecha que contiene información específica del indicador, sú código, fecha de actualización, ficha.. */}
									<Grid item xs={12} md={8}>
										<Box className='body-right'>
											<Box className='body-right-title'>
												<Box>
													<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
														Código del indicador
													</Typography>
													<Typography variant="h5" component="div">
														{indicadorInfo.codigo}
													</Typography>
												</Box>
												<Box>
													<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
														Última actualización
													</Typography>
													<Typography variant="h5" component="div">
														{parseDate(indicadorInfo.updatedAt)}
													</Typography>

												</Box>
												<Box className='body-right-title-link'>
													<a href={`//www.chihuahuametrica.online/chihuahua-en-datos/indicadores/${id}`} target='_blank' rel='noreferrer' className='indicador-metrica-url'>
														<Button variant='contained'>
															Ver ficha
														</Button>
													</a>
												</Box>
												<Box className='body-right-title-link'>
													<Controller
														name="activo"
														control={methods.control}
														render={({
															field: { onChange, value },
															fieldState: { error }
														}) => (
															<FormControlLabel
																control={
																	<Checkbox
																		label='Activo'
																		type='checkbox'
																		onChange={onChange}
																		checked={value === 'SI' || value === 'true' ? true : value === 'NO' || value === 'false' ? false : value}
																		className='indicador-info-input-checkbox'
																		icon={<SentimentVeryDissatisfiedIcon sx={{ fontSize: '30px', color: '#8D7C87' }} />}
																		checkedIcon={<EmojiEmotionsIcon sx={{ fontSize: '30px', color: '#1C7C54' }} />}
																	/>
																}
																label={value === 'SI' || value === 'true' ? 'Activo' : value === 'NO' || value === 'false' ? 'Inactivo' : value ? 'Activo' : 'Inactivo'}
															/>
														)}
													/>
												</Box>
											</Box>
											{/* Sección que contiene los catálogos del indicador */}
											<Box container>
												<Box className='body-right-content'>
													<Box className='body-right-content-title'>
														<Typography variant="h6" component="div">
															Componentes del indicador
														</Typography>
													</Box>
													<Grid container className='body-right-catalogos'>
														{
															CATALOGOS.map((catalogo, index) => {
																return (
																	<Grid item xs={12} md={index == 0 || index == 1 ? 4 : 3} key={index}>
																		<Controller
																			name={`catalogos[${index}]`}
																			control={methods.control}
																			defaultValue={`default`}
																			render={({
																				field: { value, onChange },
																				fieldState: { error }
																			}) => {
																				return (
																					<CatalogoAutocomplete
																						id={catalogo}
																						value={value === 'default' ? null : value}
																						onChange={onChange}
																						label={displayLabel(catalogo)}
																						error={error}
																						required={true}
																						type={1}
																						catalog={catalogo}
																					/>
																				)
																			}}
																		/>
																	</Grid>
																)
															})
														}
													</Grid>
													<Box className="indicator-owner">
														<Controller
															name="owner"
															control={methods.control}
															defaultValue={1}
															render={({
																field: { value, onChange },
																fieldState: { error }
															}) => {
																return (
																	<OwnerListDropdown
																		id={id}
																		type={2}
																		actualOwner={value}
																		onChange={onChange}
																		error={error}
																	/>
																)
															}}
														/>

														{/* <Owner id={id} type={2} actualOwner={indicadorInfo.owner} /> */}
													</Box>
													<Box>
														<Controller
															name='fuente'
															control={methods.control}
															render={({ field: { onChange, value }, fieldState: { error }
															}) =>
															(
																<TextField
																	label='Fuente de información'
																	type='text'
																	placeholder='Fuente: DDUE (2020). Vuelo aéreo de la Dirección de Desarrollo Urbano y Ecología 2020 en SADRE.'
																	size='small'
																	required
																	autoComplete='off'
																	sx={{ width: '100%' }}
																	error={!!error}
																	helperText={error ? error.message : null}
																	variant='outlined'
																	onChange={onChange}
																	value={value}
																	className='indicador-info-input'
																/>
															)
															}
														/>
													</Box>
												</Box>
											</Box>
										</Box>
									</Grid>
								</Grid>
								<br />
								<Box className='indicator-buttons'>
									<Button variant='contained'>Cancelar</Button>
									<Button type='submit' variant='contained' className='btn-bg' form="form-indicator">Guardar</Button>
								</Box>
							</Box>
						</Box>
					</FormProvider >
				</Box>
			)
	)
}
