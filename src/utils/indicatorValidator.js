import * as yup from 'yup';

const createIndicatorSchema = yup.object({
	nombre:
		yup.string()
			.required('Por favor, ingrese el nombre del indicador'),

	definicion:
		yup.string()
			.required('Por favor, ingrese la definición del indicador'),

	ultimoValorDisponible:
		yup.number()
			.required('Por favor, ingrese el último valor disponible del indicador'),
	observaciones:
		yup.string()
			.optional(),

	anioUltimoValorDisponible:
		yup.number()
			.optional(),

});
export { createIndicatorSchema };
