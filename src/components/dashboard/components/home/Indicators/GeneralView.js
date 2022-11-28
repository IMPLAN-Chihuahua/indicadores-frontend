import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom';
import './indicator.css'
import {
	Button, Grid, TextField,
	Typography, Checkbox, FormControlLabel, Paper, Stack, Fab, Link as MUILink
} from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
import { Save } from '@material-ui/icons';

const ODS_ID = 1;
const UNIDAD_MEDIDA_ID = 2;
const COBERTURA_ID = 3;
const CATALOGOS = [ODS_ID, UNIDAD_MEDIDA_ID, COBERTURA_ID];

export const GeneralView = () => {
	const [indicador, setIndicador] = useState(null);
	const [isLoading, setLoading] = useState(true);
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
			setIndicador(res);
			methods.reset({
				...res,
			});
		}).finally(_ => setLoading(false))
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
				<Box sx={{ flex: '1 1 auto', overflowY: 'scroll', height: '500px' }}>
					<FormProvider {...methods}>
						<Box className='general-view-body'
							component='form'
							onSubmit={methods.handleSubmit(onSubmit)}
							noValidate
							onReset={methods.reset}
							id='form-indicator'
						>

							{/* Sección que contiene las tres cartas de "Último valor disponibñe", "Año" y "Estado" */}
							<Grid container p={3} columnGap={2} rowGap={{ xs: 2, md: 0 }}>
								<Paper
									component={Grid}
									item
									xs={12}
									md
									py={3}
									px={2}
								>
									<Typography variant='h5' mb={1}>
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
													required
													autoComplete='off'
													error={!!error}
													fullWidth
													helperText={error ? error.message : null}
													variant='outlined'
													{...field}
												/>
											)
										)}
									/>
								</Paper>
								<Paper
									component={Grid}
									item
									xs={12}
									md
									py={3}
									px={2}
								>
									<Typography variant='h5' mb={1}>
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
													required
													fullWidth
													autoComplete='off'
													error={!!error}
													helperText={error ? error.message : null}
													variant='outlined'
													{...field}
												/>
											)
										)}
									/>
								</Paper>
								<Paper
									component={Grid}
									item
									xs={12}
									md
									py={3}
									px={2}
								>
									<Typography variant='h5' mb={1}>
										Estado
									</Typography>
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
														icon={<SentimentVeryDissatisfiedIcon color='error' sx={{ fontSize: '30px' }} />}
														checkedIcon={<EmojiEmotionsIcon color='success' sx={{ fontSize: '30px' }} />}
													/>
												}
												label={value === 'SI' || value === 'true' ? 'Activo' : value === 'NO' || value === 'false' ? 'Inactivo' : value ? 'Activo' : 'Inactivo'}
											/>
										)}
									/>
								</Paper>
							</Grid>

							<Grid container p={3} columnGap={3} pt={1}>
								{/* Sección izquierda que contiene la información del indicador */}
								<Paper component={Grid} item xs={12} md={4} py={3} px={2} mb={{ xs: 2, md: 0 }}>
									<Typography variant='h5' mb={2}>Información básica</Typography>
									<Stack
										direction={{ xs: 'column', md: 'row' }}
										flexWrap='wrap'
										justifyContent='space-between'
										mb={3}
										sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}
									>
										<Box>
											<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
												Código
											</Typography>
											<Typography>
												{indicador.codigo}
											</Typography>
										</Box>
										<Box>
											<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
												Última actualización
											</Typography>
											<Typography>
												{parseDate(indicador.updatedAt)}
											</Typography>
										</Box>
										<Box className='body-right-title-link'>
											<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
												Tendencia
											</Typography>
											<Typography variant='h5' component="div" className='tendencia-actual'>
												{
													methods.getValues('tendenciaActual') === 'ASCENDENTE'
														? (
															<>
																<ArrowUpwardIcon className='tendencia-ascendente' />
																<Typography>Ascendente</Typography>
															</>
														) : (
															<>
																<ArrowDownwardIcon className='tendencia-descendente' />
																<Typography>Descendente</Typography>
															</>
														)
												}
											</Typography>
										</Box>
										<Box className='body-right-title-link'>
											<a href={`//www.chihuahuametrica.online/chihuahua-en-datos/indicadores/${id}`} target='_blank' rel='noreferrer' className='indicador-metrica-url'>
												<Button variant='text'>
													Ver ficha
												</Button>
											</a>
										</Box>
									</Stack>
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
												fullWidth
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
												label='Nombre'
												type='text'
												placeholder='Porcentaje de hogares con jefatura femenina.'
												required
												autoComplete='off'
												error={!!error}
												helperText={error ? error.message : null}
												variant='outlined'
												onChange={onChange}
												value={value}
												fullWidth
												sx={{ mb: 3, mt: 3 }}
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
												label='Definición'
												type='text'
												placeholder='Hogares donde una mujer es reconocida como jefa de familia por los miembros el hogar.'
												multiline
												rows={5}
												size='small'
												required
												autoComplete='off'
												error={!!error}
												helperText={error ? error.message : null}
												onChange={onChange}
												value={value}
												fullWidth
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
												label='Periodicidad en meses'
												type='number'
												placeholder='Tiempo entre actualizaciones'
												error={!!error}
												helperText={error ? error.message : null}
												onChange={onChange}
												value={value}
												fullWidth
												className='indicador-info-input'
											/>
										)}
									/>
								</Paper>
								{/* Sección derecha que contiene información específica del indicador, sú código, fecha de actualización, ficha.. */}
								<Grid item xs>
									<Stack height='100%' overflow='hidden'>
										<Paper sx={{ py: 3, px: 2, mb: 2 }}>
											<Stack>
												<Typography variant='h5' mb={2}>Más</Typography>

												{/* Sección que contiene los catálogos del indicador */}
												<Grid container justifyContent='space-between' mb={2}>
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
																		}) => (
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
																		)}
																	/>
																</Grid>
															)
														})
													}
												</Grid>
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
															fullWidth
															error={!!error}
															helperText={error ? error.message : null}
															onChange={onChange}
															value={value}
														/>
													)}
												/>
											</Stack>
										</Paper>
										{
											user.roles === 'ADMIN' && (
												<Paper sx={{ py: 3, px: 2, height: '100%' }}>
													<Typography variant='h5' mb={2}>Autorización</Typography>
													<Box width='fit-content' mb={1}>
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
													</Box>
													<MUILink
														component={RouterLink}
														to={`/autorizacion/indicador/${id}`}
													>Administrar usuarios</MUILink>
												</Paper>
											)
										}
									</Stack>
								</Grid>
							</Grid>
							<Fab
								size='large'
								color='primary'
								type='submit'
								form='form-indicator'
								sx={{
									position: 'absolute',
									mb: 2,
									mr: 2,
									bottom: 0,
									right: 0,
								}}>
								<Save sx={{ m: 1 }} />
							</Fab>
						</Box>
					</FormProvider >
				</Box>
			)
	)
}
