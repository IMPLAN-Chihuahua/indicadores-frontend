import * as yup from 'yup';

const loginSchema = yup.object({
  correo:
    yup.string()
      .required('Por favor, ingrese su correo')
      .email('Por favor, ingrese un correo valido'),
  clave:
    yup.string()
      .required('Por favor, ingrese su contraseña')
});

const moduleSchema = yup.object({
  temaIndicador: 
    yup.string()
      .required('Por favor, ingrese el tema del indicador')
      .min(5, 'El tema del indicador debe contener al menos 5 caracteres'),

  codigo:
    yup.string()
      .required('Por favor, ingrese el código del indicador')
      .min(3, 'El código debe contener al menos 3 caracteres')
      .max(3, 'El código debe contener máximo 3 caracteres')
      .matches(/^[0-9]+$/, 'El código debe contener solo números'),
    
  observaciones:
    yup.string()
      .max(255, 'Las observaciones debe contener máximo 255 caracteres'),

});

export { loginSchema, moduleSchema }