import * as yup from 'yup';

const createIndicatorSchema = yup.object({
	nombre:
		yup.string()
			.required('Por favor, ingrese el nombre del indicador'),

	definicion:
		yup.string()
			.required('Por favor, ingrese la definición del indicador'),

	ultimoValorDisponible:
		yup.string()
			.required('Por favor, ingrese el último valor disponible del indicador'),
	observaciones:
		yup.string()
			.optional(),

	anioUltimoValorDisponible:
		yup.number()
			.optional(),

	periodicidad:
		yup.number()
			.integer()
			.typeError('Periodicidad debe ser un número')
			.min(0)
			.nullable(),
});
export { createIndicatorSchema };
