import * as yup from 'yup';

const createIndicatorSchema = yup.object({
    nombre: 
		yup.string()
			.required('Por favor, ingrese el nombre del indicador'),
	
	definicion:
		yup.string()
			.required('Por favor, ingrese la definición del indicador'),
	
	codigo:
		yup.string()
			.required('Por favor, ingrese el código tema')
			.min(3, 'El código debe contener al menos 3 caracteres')
			.max(3, 'El código debe contener máximo 3 caracteres')
			.matches(/^[0-9]+$/, 'El código debe contener solo números'),
	codigoObjeto: 
		yup.string()
			.required('Por favor, ingrese el código del indicador'),
			
	ultimoValorDisponible:
		yup.number()
			.required('Por favor, ingrese el último valor disponible del indicador'),
	
	tendenciaDeseada:
		yup.string().oneOf(['ASCENDENTE', 'DESCENDENTE', 'NO APLICA'], 'Por favor, seleccione una tendencia'),

	unidadMedida:
		yup.string()
			.required('Por favor, ingrese la unidad de medida del indicador'),
	
	coberturaGeografica:
		yup.string()
			.required('Por favor, ingrese la cobertura geográfica del indicador'),
	
	ods: 
		yup.string()
			.required('Por favor, ingrese el ODS del indicador'),
});

export { createIndicatorSchema };
