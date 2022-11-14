import * as yup from 'yup';

const createUserSchema = yup.object({
  correo:
    yup.string()
      .required('El correo es obligatorio')
      .email('Ingresa un correo validdo'),

  clave:
    yup.string()
      .required('Ingresa la contraseña')
      .min(8, 'La contraseña debe contener al menos 8 caracteres'),

  confirmClave:
    yup.string()
      .oneOf([yup.ref('clave'), null], 'Las contraseñas deben coincidir'),

  nombres:
    yup.string()
      .required('El nombre es requerido'),

  idRol:
    yup.string()
      .required('Selecciona algún rol'),

  apellidoPaterno:
    yup.string()
      .required('El apellido paterno es obligatorio')
});

const editUserSchema = yup.object(
  {
    nombres:
      yup.string()
        .required('El nombre es obligatorio'),

    apellidoPaterno:
      yup.string()
        .required('El apellido paterno es obligatorio')

  }
)

export { createUserSchema, editUserSchema }