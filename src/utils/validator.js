import * as yup from 'yup';

const confirmPasswordSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().min(8).required()
});

const emailSchema = yup.object().shape({
  correo: yup.string().email().required(),
});

const createAuthSchema = yup.object().shape({
  one: yup.object({
    id: yup.number(),
    nombre: yup.string()
  }).nullable().required('Por favor, selecciona un elemento'),

  expires: yup.boolean(),
  desde: yup.string()
    .nullable()
    .when('expires', {
      is: true,
      then: yup.string().required('Por favor, selecciona una fecha de inicio'),
      otherwise: yup.string().nullable()
    }),
  hasta: yup.string()
    .nullable()
    .transform((curr, orig) => orig === '' ? null : curr)
    .when('expires', {
      is: true,
      then: yup.string().required('Por favor, selecciona una fecha de expiración'),
      otherwise: yup.string().nullable()
    })
});

const updateAuthSchema = yup.object().shape({
  expires: yup.boolean(),
  desde: yup.string()
    .nullable()
    .when('expires', {
      is: true,
      then: yup.string().required('Por favor, selecciona una fecha de inicio'),
      otherwise: yup.string().nullable()
    }),
  hasta: yup.string()
    .nullable()
    .transform((curr, orig) => orig === '' ? null : curr)
    .when('expires', {
      is: true,
      then: yup.string().required('Por favor, selecciona una fecha de expiración'),
      otherwise: yup.string().nullable()
    })
});

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

export { loginSchema, moduleSchema, emailSchema, confirmPasswordSchema, createAuthSchema, updateAuthSchema }