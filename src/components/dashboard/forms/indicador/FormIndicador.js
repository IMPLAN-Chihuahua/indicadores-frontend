import { Button, DialogActions, DialogContent } from "@mui/material";
import { useCallback, useReducer, useState } from "react";
import { IndicadorProvider } from "../../../../contexts/IndicadorContext";
// import { StepperProvider } from "../../../../contexts/StepperContext";
import { FormFormula } from "../formula/FormFormula";
import { FormMapa } from "../mapa/FormMapa";
import { FormBasic } from "./FormBasic";
import { FormExtra } from "./FormExtra";
import { HorizontalStepper } from "./HorizontalStepper";

const STEP_LABELS = ['Información Básica', 'Formula', 'Mapa', 'Extra'];

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
    default:
      return 'Step invalido'
  }
}

const initialState = {
  basic: {
    nombre: '',
    codigo: '',
    descripcion: '',
    ultimoValorDisponible: 0,
    anioUltimoValorDisponible: new Date().getFullYear(),
    medida: null,
    cobertura: null,
    ods: null
  },
  formula: {
    ecuacion: '',
    descipcion: '',
    variables: [{ nombre: '', dato: '', anio: '', medida: null, descripcion: '' }]
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
    case 'update':
      return { ...state, ...action.payload };
    case 'clear':
      return initialState;
    default:
      throw new Error('Invalid action type');
  }
}

export const FormIndicador = () => {
  const [indicador, dispatch] = useReducer(reducer, initialState);
  const [activeStep, setActiveStep] = useState(0)

  const handleBack = useCallback(() => {
    setActiveStep(prev => prev === 0 ? 0 : prev - 1)
  }, [setActiveStep]);

  const handleNext = useCallback(() => {
    setActiveStep(prev => {
      const lastValue = (STEP_LABELS.length - 1)
      return prev === lastValue ? lastValue : prev + 1
    })
  }, [setActiveStep]);

  return (
    <IndicadorProvider indicador={indicador} dispatch={dispatch}>
      <DialogContent sx={{ height: '60vh' }}>
        <HorizontalStepper
          activeStep={activeStep}
          stepLabels={STEP_LABELS}
        />
        {getStepContent(activeStep)}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0} >Atras</Button>
        <Button
          variant='contained'
          onClick={handleNext}>Siguiente</Button>
      </DialogActions>
    </IndicadorProvider>
  );
};