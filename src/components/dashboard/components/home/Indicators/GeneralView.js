import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom';
import './indicator.css'
import {
	Grid,
	Button,
} from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { createIndicatorSchema } from '../../../../../utils/indicatorValidator';
import { getIndicator, updateIndicator } from '../../../../../services/indicatorService';
import { createHistoricos } from '../../../../../services/historicosService';
import { useAuth } from '../../../../../contexts/AuthContext';
import PersonalLoader from '../../../../common/PersonalLoader/PersonalLoader';
import IndicatorValues from './GeneralViewComponents/IndicatorValues';
import GeneralInformation from './GeneralViewComponents/GeneralInformation';
import MoreInformation from './GeneralViewComponents/MoreInformation';
import Header from './GeneralViewComponents/Header';

export const GeneralView = () => {
	const [isLoading, setLoading] = useState(true);
	const { id: idIndicador } = useParams();
	const { user } = useAuth();

	const methods = useForm({
		defaultValues: indicadorDefaultValues,
		resolver: yupResolver(createIndicatorSchema),
		mode: 'all',
	});

	useEffect(() => {
		getIndicator(idIndicador).then(res => {
			const { objetivos, adornment, ...values } = res;
			const destacados = objetivos.filter(o => o.destacado)
			const _adornment = adornment ? adornment : '';
			methods.reset({ ...values, objetivos, destacados, adornment: _adornment });
		}).finally(_ => setLoading(false))
	}, [idIndicador]);

	const onSubmit = async (data, e) => {
		if (e === undefined) return;
		if (e?.target?.id !== 'form-indicator') return;

		let updatedVals = 0;

		const { activo, definicion, fuente, temas, nombre, observaciones, owner, anioUltimoValorDisponible, idCobertura, idOds,
			ultimoValorDisponible, periodicidad, archive, objetivo, objetivos, adornment, unidadMedida } = data;

		const indicadorData = {
			nombre,
			definicion,
			observaciones,
			ultimoValorDisponible,
			activo,
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
		};

		const historicoData = {
			fuente,
			valor: ultimoValorDisponible,
			anio: anioUltimoValorDisponible,
			idUsuario: user.id,
		}

		Swal.fire({
			title: '¿Deseas actualizar la información del indicador o sólo guardar los cambios?',
			text: "Al guardar la información del indicador no se generará un valor histórico. Si lo que quieres es actualizar el último valor disponible y generar un dato histórico, selecciona la segunda opción.",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: `Guardar cambios`,
			denyButtonText: `Actualizar indicador`,
		}).then(async (result) => {
			if (result.isConfirmed || result.isDenied) {
				return updateData(result, idIndicador, indicadorData, historicoData, updatedVals)
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

	if (isLoading) {
		return (<PersonalLoader />)
	}

	return (
		<FormProvider {...methods}>
			<Grid
				container
				component='form'
				onSubmit={methods.handleSubmit(onSubmit)}
				noValidate
				onReset={methods.reset}
				id='form-indicator'
				sx={{ p: 2 }}
			>
				<Header />
				<IndicatorValues />
				<Grid container item xs={12} md={12} >
					<GeneralInformation />
					<MoreInformation />
				</Grid>
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
}

const indicadorDefaultValues = {
	nombre: '',
	ultimoValorDisponible: '',
	anioUltimoValorDisponible: '',
	activo: '',
	archive: false,
	objetivo: {},
	isDestacado: false,
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
	destacados: [],
	tema: {},
	temas: [],
	idCobertura: '',
	idOds: '',
	objetivos: [],
	observaciones: '',
	tendenciaActual: '',
	updatedAt: '',
	updatedBy: '',
	urlImagen: '',
	periodicidad: 0,
}