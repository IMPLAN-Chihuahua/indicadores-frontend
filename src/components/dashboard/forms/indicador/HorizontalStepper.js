import {
  Box, DialogTitle,
  Step, Stepper, StepLabel
} from "@mui/material";
import { FormIndicador } from "./FormIndicador";
import { FormFormula } from "../formula/FormFormula";
import { FormMapa } from "../mapa/FormMapa";
import { FormExtra } from "./FormExtra";
import { useState } from "react";

const steps = ['Información Básica', 'Formula', 'Mapa', 'Extra'];

const getStepContent = (step, handleBack, handleNext) => {
  switch (step) {
    case 0:
      return <FormIndicador
        handleNext={handleNext}
      />
    case 1:
      return <FormFormula
        handleBack={handleBack}
        handleNext={handleNext}
      />
    case 2:
      return <FormMapa
        handleBack={handleBack}
        handleNext={handleNext}
      />
    case 3:
      return <FormExtra
        handleBack={handleBack}
      />
    default:
      return 'Step invalido'
  }
}

export const HorizontalStepper = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleBack = () => setActiveStep(prev => prev - 1)
  const handleNext = () => setActiveStep(prev => prev + 1)

  return (
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
      {getStepContent(activeStep, handleBack, handleNext)}
    </>
  );
}