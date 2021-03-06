import * as yup from 'yup';

const confirmPasswordSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().min(8).required()
});

const emailSchema = yup.object().shape({
  correo: yup.string().email().required(),
});

const authSchema = yup.object().shape({
eventStartDate: yup.date().default(() => new Date(Date.now() -86400000)),
one: yup.string().required("*Selecciona un elemento de la lista"),
expirationDate: yup.date("Selecciona una fecha valida").required("Selecciona una fecha").when( "eventStartDate",(eventStartDate, schema) => eventStartDate && schema.min(eventStartDate,"Selecciona una fecha valida")).nullable()
.transform((curr, orig) => orig === '' ? null : curr)
,
});
// use react hook 

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

export { loginSchema, moduleSchema, emailSchema,confirmPasswordSchema, authSchema}