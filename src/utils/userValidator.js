import * as yup from 'yup';

const createUserSchema = yup.object({
  correo:
    yup.string()
      .required('Por favor, ingrese un correo')
      .email('Por favor, ingrese un correo validdo'),

  clave:
    yup.string()
      .required('Por favor, ingrese la contraseña')
      .min(8, 'La contraseña debe contener al menos 8 caracteres'),

  confirmClave:
    yup.string()
      .oneOf([yup.ref('clave'), null], 'Las contraseñas deben coincidir'),

  nombres:
    yup.string()
      .required('Por favor, ingrese el nombre del usuario'),

  apellidoPaterno:
    yup.string()
      .required('Por favor, ingrese el apellido paterno del usuario')
});

export { createUserSchema }