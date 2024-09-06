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

const createTemaSchema = yup.object({
  temaIndicador:
    yup.string()
      .required('Por favor, ingrese el tema del indicador')
      .min(5, 'El tema del indicador debe contener al menos 5 caracteres'),

  codigo:
    yup.string()
      .required('Por favor, ingrese el código del indicador')
      .min(2, 'El código debe contener al menos 2 caracteres'),

  descripcion:
    yup.string()
      .max(255, 'La descripcion debe contener máximo 255 caracteres'),

});

const createObjetivoSChema = yup.object({
  titulo:
    yup.string()
      .optional('Por favor, ingrese el titulo de la dimensión')
      .min(5, 'El titulo de la dimensión debe contener al menos 5 caracteres'),

  descripcion:
    yup.string()
      .max(255, 'La descripcion debe contener máximo 255 caracteres'),

  urlImagen:
    yup.string()
      .url('Por favor, ingrese una URL valida'),

  color:
    yup.string()
      .optional('Por favor, seleccione un color')
});

export { loginSchema, createTemaSchema, emailSchema, confirmPasswordSchema, createAuthSchema, updateAuthSchema, createObjetivoSChema }