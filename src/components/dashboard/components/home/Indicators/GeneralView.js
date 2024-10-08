import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom';
import './indicator.css'
import {
	Grid,
	Button,
	Typography
} from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { createIndicatorSchema } from '../../../../../utils/indicatorValidator';
import { getIndicator, updateIndicator } from '../../../../../services/indicatorService';
import { createHistoricos } from '../../../../../services/historicosService';
import { useAuth } from '../../../../../contexts/AuthContext';
import { isNumber } from '../../../../../utils/stringsValidator';
import PersonalLoader from '../../../../common/PersonalLoader/PersonalLoader';
import IndicatorValues from './GeneralViewComponents/IndicatorValues';
import GeneralInformation from './GeneralViewComponents/GeneralInformation';
import MoreInformation from './GeneralViewComponents/MoreInformation';
import Header from './GeneralViewComponents/Header';
import FormulaView from './Formula/FormulaView';
import MapView from './Mapa/MapView';

export const GeneralView = () => {
	const [indicador, setIndicador] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const { id } = useParams();
	const { user } = useAuth();

	let defaultValues = {
		activo: '',
		anioUltimoValorDisponible: '',
		catalogos: [{
			id: 0,
			nombre: '',
			idCatalogo: 1
		}],
		archive: false,
		objetivo: {},
		codigo: '',
		createdAt: '',
		createdBy: '',
		definicion: '',
		formula: {},
		fuente: '',
		historicos: [],
		adornment: '',
		unidadMedida: '',
		id: '',
		idTema: '',
		tema: {},
		temas: [],
		idCobertura: '',
		idOds: '',
		objetivos: [],
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
		metas: []
	}

	const methods = useForm({
		defaultValues,
		resolver: yupResolver(createIndicatorSchema),
		mode: 'all',
	});

	useEffect(() => {
		getIndicator(id).then(res => {
			const sortedCatalogos = res.catalogos.sort((a, b) => a.idCatalogo - b.idCatalogo)
			res.catalogos = sortedCatalogos;
			setIndicador(res);
			methods.reset({
				...res,
			});
		}).finally(_ => setLoading(false))
	}, [id]);

	const onSubmit = async (data) => {
		let updatedVals = 0;

		const { id: idIndicador, activo, catalogos, definicion, fuente,
			idTema, temas, nombre, observaciones, owner, anioUltimoValorDisponible, idCobertura, idOds,
			ultimoValorDisponible, updatedBy, periodicidad, archive, objetivo, objetivos, adornment, unidadMedida, metas } = data;

		const status = activo;
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
			adornment,
			unidadMedida,
			anioUltimoValorDisponible,
			archive,
			temas,
			objetivos,
			idCobertura: idCobertura?.id,
			idOds: idOds?.id,
			idObjetivo: objetivo?.id,
			metas
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

		Swal.fire({
			title: '¿Deseas actualizar la información del indicador o sólo guardar los cambios?',
			text: "Al guardar la información del indicador no se generará un valor histórico. Si lo que quieres es actualizar el último valor disponible y generar un dato histórico, selecciona la segunda opción.",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: `Guardar cambios`,
			denyButtonText: `Actualizar indicador`,
		}).then(async (result) => {
			if (result.isConfirmed || result.isDenied) updateData(result, idIndicador, indicadorData, historicoData, updatedVals);
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
				<FormProvider {...methods}>
					<Grid
						container
						component='form'
						onSubmit={methods.handleSubmit(onSubmit)}
						noValidate
						onReset={methods.reset}
						id='form-indicator'
						sx={{
							p: 2
						}}
					>
						<Header methods={methods} />
						<IndicatorValues methods={methods} updatedAt={indicador.updatedAt} />
						<Grid container xs={12} md={12} >
							<GeneralInformation methods={methods} indicador={indicador} />
							<MoreInformation methods={methods} id={id} />
						</Grid>


						{/* <Grid item xs={6} md={6}>
							<pre style={{ backgroundColor: 'lightcoral' }}>
								{
									JSON.stringify(indicador, null, 2)
								}
							</pre>
						</Grid> */}
					</Grid>


					<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: 3 }}>
						<Button variant='contained'>
							Cancelar
						</Button>
						<Button variant='contained' type='submit' form='form-indicator'>
							Guardar cambios
						</Button>
					</Box>
				</FormProvider >
			)
	)
}