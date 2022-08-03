import { Box, Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useCallback, useReducer, useState } from "react";
import { IndicadorProvider, useIndicadorContext } from "../../../../contexts/IndicadorContext";
import { FormFormula } from "../formula/FormFormula";
import { FormMapa } from "../mapa/FormMapa";
import { FormBasic } from "./FormBasic";
import { FormExtra } from "./FormExtra";
import { HorizontalStepper } from "./HorizontalStepper";

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
    label: 'Summary',
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
    image: ''
  },
  extra: {
    observaciones: '',
    fuente: '',
    image: ''
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update-form-basic':
    case 'update-form-extra':
      return { ...state, ...action.payload };
    case 'update-form-formula':
      return { ...state, formula: { ...action.payload } }
    case 'update-form-mapa':
      return { ...state, mapa: { ...action.payload } }
    case 'clear':
      return initialState;
    default:
      throw new Error('Invalid action type');
  }
}

export const FormIndicador = () => {
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

  const handleSubmit = () => {
    console.log('clean everything and send request');
  };

  return (
    <>
      <DialogTitle>
        Nuevo Indicador
        <HorizontalStepper
          activeStep={currentStep}
          stepLabels={STEPS}
        />
      </DialogTitle>
      <IndicadorProvider indicador={indicador} dispatch={dispatch} onSubmit={onSubmit}>
        <DialogContent sx={{ height: '60vh' }}>
          {getStepContent(currentStep)}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}>Atras</Button>
          {
            (currentStep === STEPS.length - 1)
              ? (<Button
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
    </>
  );
};

const Summary = () => {
  const { indicador } = useIndicadorContext();

  return (
    <Box backgroundColor='aliceBlue'>
      <pre>{JSON.stringify(indicador, null, 2)}</pre>
    </Box>
  );
}