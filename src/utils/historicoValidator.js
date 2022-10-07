import * as yup from 'yup';

const validateHistoricoSchema = yup.object({
  anio:
    yup.number()
      .required('Por favor, ingrese un año')
      .typeError('Por favor, ingrese sólo valores numéricos'),

  valor:
    yup.number()
      .required('Por favor, ingrese un valor')
      .typeError('Por favor, ingrese sólo valores numéricos'),

  fuente:
    yup.string()
      .required('Por favor, ingrese una fuente de información'),
});

const orderHistoricos = (historicos) => {
  return historicos.sort((a, b) => {
    return a.anio - b.anio;
  });
}

export { validateHistoricoSchema, orderHistoricos }