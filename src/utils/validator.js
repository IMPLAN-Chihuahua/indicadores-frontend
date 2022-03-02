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


export { loginSchema }