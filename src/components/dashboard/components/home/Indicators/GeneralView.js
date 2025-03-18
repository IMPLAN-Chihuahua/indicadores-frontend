import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './indicator.css'
import {
	Grid,
	Button,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { createIndicatorSchema } from '../../../../../utils/indicatorValidator';
import { getIndicator, updateIndicator } from '../../../../../services/indicatorService';
import PersonalLoader from '../../../../common/PersonalLoader/PersonalLoader';
import IndicatorValues from './GeneralViewComponents/IndicatorValues';
import GeneralInformation from './GeneralViewComponents/GeneralInformation';
import MoreInformation from './GeneralViewComponents/MoreInformation';
import Header from './GeneralViewComponents/Header';
import { showAlert } from '../../../../../utils/alert';

export const GeneralView = () => {
	const [isLoading, setLoading] = useState(true);
	const { id: idIndicador } = useParams();

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

	const onSubmit = async (formData, e) => {
		if (e === undefined) return;
		if (e?.target?.id !== 'form-indicator') return;

		const indicadorValues = createRequestObject(formData)

		Swal.fire({
			title: '¿Deseas actualizar la información del indicador o sólo guardar los cambios?',
			text: "Al guardar la información del indicador no se generará un valor histórico. Si lo que quieres es actualizar el último valor disponible y generar un dato histórico, selecciona la segunda opción.",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: `Guardar cambios`,
			denyButtonText: `Actualizar indicador`,
		})
			.then(result => {
				if (result.isConfirmed) {
					return updateIndicator(idIndicador, indicadorValues)
				} else if (result.isDenied) {
					return updateIndicator(idIndicador, { ...indicadorValues, createHistoricos: true })
				}
			})
			.then(res => {
				if (res?.status === 204) {
					showAlert({
						title: 'Cambios guardados',
						indicador: 'El indicador ha sido actualizado',
						icon: 'success'
					})
				}
			})
			.catch(err => {
				showAlert({
					title: 'Hubo un error',
					text: err,
					icon: 'error'
				})
			});
	};


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


			<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: 3, position: 'absolute', bottom: 0, right: 0 }}>
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
	elif: '',
}

const createRequestObject = (formData) => {
	const { activo, definicion, fuente, temas, nombre, observaciones, owner, anioUltimoValorDisponible, idCobertura, ods,
		ultimoValorDisponible, periodicidad, archive, objetivo, objetivos, adornment, unidadMedida, elif } = formData;
	const indicadorData = {
		nombre,
		definicion,
		observaciones,
		ultimoValorDisponible,
		activo,
		fuente,
		elif,
		owner,
		periodicidad,
		adornment,
		unidadMedida,
		anioUltimoValorDisponible,
		archive,
		temas,
		objetivos,
		idCobertura: idCobertura?.id,
		idOds: ods.id,
		idObjetivo: objetivo?.id,
	};

	return indicadorData;
}