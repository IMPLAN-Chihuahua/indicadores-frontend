import {
  Box, Button, DialogTitle,
  Step, Stepper, StepLabel,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { FormIndicador } from "./FormIndicador";
import { FormFormula } from "../formula/FormFormula";
import { FormMapa } from "../mapa/FormMapa";
import { FormExtra } from "./FormExtra";
import { DialogActions } from "@mui/material";
import { Provider } from "react-redux";
import { indicadorStore } from "./store";

const steps = ['Información Básica', 'Formula', 'Mapa', 'Extra'];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <FormIndicador />
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

export const HorizontalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <Provider store={indicadorStore}>
      <>
        <DialogTitle>
          Nuevo Indicador
        </DialogTitle>
        <Box sx={{ p: '16px 24px' }}>
          <Stepper activeStep={activeStep} style={{ justifyContent: 'space-around' }}>
            {steps.map((label, index) => {
              const stepProps = {};
              return (
                <Step key={index} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </Box>
      </>
      <DialogContent style={{ paddingTop: '20px', height: '70vh' }}>
        {getStepContent(activeStep)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBack} disabled={activeStep === 0}>Atras</Button>
        <Button variant='contained' onClick={handleNext}>{
          activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'
        }</Button>
      </DialogActions>
    </Provider>
  );
}