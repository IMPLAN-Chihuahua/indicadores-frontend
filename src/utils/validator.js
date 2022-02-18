import * as yup from 'yup';

const loginSchema = yup.object({
  correo:
    yup.string()
      .required('Por favor, ingrese su correo')
      .email('Por favor, ingrese un correo valido'),
  clave:
    yup.string()
      .required('Por favor, ingrese su contraseña')
      .min(8, 'La contraseña debe contener al menos 8 caracteres')
      .max(32, 'La contraseña debe contener a lo más 32 caracteres')
});


export { loginSchema }