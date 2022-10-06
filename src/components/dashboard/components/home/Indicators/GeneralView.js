import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './indicator.css'

import { Button, Card, CardContent, Grid, TextField, Typography, ClickAwayListener, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import { useAlert } from '../../../../../contexts/AlertContext';
import { yupResolver } from '@hookform/resolvers/yup';

import { createIndicatorSchema } from '../../../../../utils/indicatorValidator';
import { getIndicator, updateIndicator } from '../../../../../services/indicatorService';
import { getTemas } from '../../../../../services/moduleService';

import { CatalogoAutocomplete, OdsPicker } from '../../../common/CatalogPicker';
import { BeatLoader } from 'react-spinners';
import { parseDate } from '../../../../../utils/dateParser';
import { isArrayEmpty } from '../../../../../utils/objects';
import { displayLabel } from '../../../../../utils/getCatalog';
import OwnerListDropdown from './Owner/OwnerList';
import AutoCompleteInput from '../../../../common/AutoCompleteInput';

const ODS_ID = 1;
const UNIDAD_MEDIDA_ID = 2;
const COBERTURA_ID = 3;
const CATALOGOS = [ODS_ID, UNIDAD_MEDIDA_ID, COBERTURA_ID];

export const GeneralView = () => {
	const [editingUltimoValor, setEditingUltimoValor] = useState(false);
	const [indicadorInfo, setIndicadorInfo] = useState(null);
	const { id } = useParams();

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
	}

	useEffect(() => {
		getIndicator(id).then(res => {
			setIndicadorInfo(res);
			methods.reset({
				...res,
			});
		})
	}, [id]);

	const methods = useForm({
		defaultValues,
		resolver: yupResolver(createIndicatorSchema),
		mode: 'all',
	});

	const onSubmit = async (data) => {
		const { activo, catalogos, definicion, fuente, idModulo, modulo, nombre, observaciones, owner, ultimoValorDisponible, updatedBy } = data;

		// const { ...indicator } = data;
		// const formData = new FormData();

		// for (const key in indicator) {
		// 	if (key === 'urlImagen' && indicator[key]) {
		// 		formData.append(key, indicator[key][0])
		// 		continue;
		// 	}

		// 	if (indicator[key]) {
		// 		formData.append(key, indicator[key]);
		// 	}
		// };

		// try {
		// 	await updateIndicator(id, formData);
		// 	alert.success('Indicador actualizado exitosamente');
		// } catch (error) {
		// 	alert.error(error);
		// }
	};

	const toggleEditing = () => {
		setEditingUltimoValor(true);
	}

	return (
		(
			<FormProvider {...methods}>
				{
					methods.watch('nombre').length > 0 ?
						(
							<Box className='general-view-body indicator'
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
																!editingUltimoValor ?
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
																				sx={{ width: '70%' }}
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
																			checked={value === 'SI' ? true : value === 'NO' ? false : value}
																			className='indicador-info-input-checkbox'
																			icon={<SentimentVeryDissatisfiedIcon sx={{ fontSize: '30px', color: '#8D7C87' }} />}
																			checkedIcon={<EmojiEmotionsIcon sx={{ fontSize: '30px', color: '#1C7C54' }} />}
																		/>
																	}
																	label={value === 'SI' ? 'Activo' : value === 'NO' ? 'Inactivo' : value ? 'Activo' : 'Inactivo'}
																/>
															)}
														/>

														{/* // <Checkbox
															// 	icon={<SentimentVeryDissatisfiedIcon />}
															// 	checkedIcon={<EmojiEmotionsIcon />}
															// /> */}

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
															{/* <Grid item xs={12} md={4}>
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
																		unidadMedida = value,
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
															<Grid item xs={12} md={4}>
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
															</Grid> */}

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
