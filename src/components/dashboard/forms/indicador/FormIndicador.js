import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useCallback, useReducer, useState } from "react";
import { IndicadorProvider } from "../../../../contexts/IndicadorContext";
import { protectedApi } from "../../../../services";
import { FormFormula } from "../formula/FormFormula";
import { FormMapa } from "../mapa/FormMapa";
import { FormBasic } from "./FormBasic";
import { FormExtra } from "./FormExtra";
import { HorizontalStepper } from "./HorizontalStepper";
import { Summary } from "./Summary";

const STEPS = [
  {
    idx: 0,
    label: 'Información Básica',
    form: 'form-basic'
  }, {
    idx: 1,
    label: 'Formula',
    form: 'form-formula'
  }, {
    idx: 2,
    label: 'Mapa',
    form: 'form-mapa'
  }, {
    idx: 3,
    label: 'Extra',
    form: 'form-extra'
  }, {
    idx: 4,
    label: 'Resumen',
    form: ''
  }
];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <FormBasic />
    case 1:
      return <FormFormula />
    case 2:
      return <FormMapa />
    case 3:
      return <FormExtra />
    case 4:
      return <Summary />;
    default:
      throw new Error('Step invalido');
  }
}

const initialState = {
  nombre: '',
  codigo: '',
  definicion: '',
  ultimoValorDisponible: 0,
  anioUltimoValorDisponible: new Date().getFullYear(),
  tema: null,
  medida: null,
  cobertura: null,
  ods: null,
  formula: {
    ecuacion: '',
    descripcion: '',
    variables: [{ nombre: '', dato: '', anio: '', medida: null, nombreAtributo: '' }]
  },
  mapa: {
    url: '',
    hasMapa: false,
    image: ''
  },
  observaciones: '',
  fuente: '',
  image: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update-form-basic':
    case 'update-form-extra':
      return { ...state, ...action.payload };
    case 'update-form-mapa':
      return { ...state, mapa: { ...action.payload } }
    case 'update-form-formula':
      return { ...state, formula: { ...action.payload } }
    case 'clear':
      return initialState;
    default:
      throw new Error('Invalid action type');
  }
}

const sanitizeIndicador = (indicador) => {
  const formData = new FormData();
  for (const field of Object.keys(indicador)) {
    if (!indicador[field]) {
      continue;
    }
    if (field === 'tema') {
      formData.append('idModulo', indicador[field].id);
      continue;
    }
    if (field === 'medida' || field === 'ods' || field === 'cobertura') {
      formData.append('catalogos[]', indicador[field].id);
      continue;
    }
    if (field === 'formula') {
      const formula = indicador[field];
      for (const key of Object.keys(formula)) {
        if (key === 'variables') {
          const variable = formula[key];
          for (const varField of Object.keys(variable)) {
            formData.append(`formula[variables][${varField}]`, variable[varField]);
          }
          continue;
        }
        formData.append(`formula[${key}]`, formula[key])
      }
    }
    if (field === 'mapa') {
      continue;
    }
    formData.append(field, indicador[field])
  }
  return formData;
}

export const FormIndicador = (props) => {
  const [indicador, dispatch] = useReducer(reducer, initialState);
  const [currentStep, setCurrentStep] = useState(0)

  const handleBack = useCallback(() => {
    setCurrentStep(prev => prev === 0 ? 0 : prev - 1)
  }, [setCurrentStep]);

  const handleNext = useCallback(() => {
    setCurrentStep(prev => {
      const lastValue = (STEPS.length - 1)
      return prev === lastValue ? lastValue : prev + 1
    })
  }, [setCurrentStep]);

  const onSubmit = useCallback((data) => {
    const currentForm = STEPS[currentStep].form;
    dispatch({ type: `update-${currentForm}`, payload: { ...data } });
    handleNext();
  }, [currentStep]);

  const handleSubmit = async () => {
    console.log('POST request')
  };

  return (
    <IndicadorProvider indicador={indicador} dispatch={dispatch} onSubmit={onSubmit}>
      <DialogTitle>
        Nuevo Indicador
        <HorizontalStepper
          activeStep={currentStep}
          stepLabels={STEPS}
        />
      </DialogTitle>
      <DialogContent sx={{ height: '60vh' }}>
        {getStepContent(currentStep)}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ mr: 'auto' }}
          onClick={props.close}
        >Cancelar</Button>
        <Button
          onClick={handleBack}
          disabled={currentStep === 0}>Atras</Button>
        {
          (currentStep === STEPS.length - 1)
            ? (
              <Button
                variant='contained'
                onClick={handleSubmit}>
                Terminar
              </Button>)
            : (<Button
              type='submit'
              form={STEPS[currentStep].form}
              variant='contained'>Siguiente</Button>)
        }
      </DialogActions>
    </IndicadorProvider>
  );
};