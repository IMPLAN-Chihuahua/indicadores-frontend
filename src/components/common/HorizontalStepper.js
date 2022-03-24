import {
  Box, Button, DialogTitle,
  Step, Stepper, StepLabel,
  DialogContent
} from "@mui/material";
import { useState } from "react";
import { FormIndicador } from "../dashboard/forms/indicador/FormIndicador";
import { FormFormula } from "../dashboard/forms/formula/FormFormula";
import { FormMapa } from "../dashboard/forms/mapa/FormMapa";
import { FormExtra } from "../dashboard/forms/indicador/FormExtra";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { DialogActions } from "@mui/material";

const steps = ['Información Básica', 'Formula', 'Mapa', 'Extra'];

const getStepContent = (step, formContent) => {
  switch (step) {
    case 0:
      return <FormIndicador {...{ formContent }} />
    case 1:
      return <FormFormula {...{ formContent }} />
    case 2:
      return <FormMapa {...{ formContent }} />
    case 3:
      return <FormExtra {...{ formContent }} />
    default:
      return 'Step invalido'
  }
}

export const HorizontalStepper = () => {
  const methods = useForm();
  const form = methods.watch();
  const [activeStep, setActiveStep] = useState(0);
  const [compiledForm, setCompiledForm] = useState({});

  const handleNext = () => {
    let canContinue = true;
    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, indicador: form });
        canContinue = true;
        break;
      case 1:
        setCompiledForm({ ...compiledForm, formula: form });
        canContinue = true;
        break;
      case 2:
        setCompiledForm({ ...compiledForm, mapa: form });
        canContinue = true;
        break;
      case 3:
        setCompiledForm({ ...compiledForm, extra: form });
        canContinue = onSubmit({ ...compiledForm, });
        break;
      default:
        break;
    }
    if (canContinue) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, indicador: form });
        break;
      case 1:
        setCompiledForm({ ...compiledForm, formula: form });
        break;
      case 2:
        setCompiledForm({ ...compiledForm, mapa: form });
        break;
      case 3:
        setCompiledForm({ ...compiledForm, extra: form });
        break;
      default:
        return 'Step invalido';
    }
  };

  const onSubmit = form => {
    console.log(methods.formState.errors, form)
    // if (Object.keys(errors).length === 0) {
    //   console.log(form);
    // }
  }

  return (
    <FormProvider {...methods}>
      <DialogTitle>Title</DialogTitle>
      <DialogContent style={{height: '70vh'}}>
        {getStepContent(activeStep, compiledForm)}
      </DialogContent>
      <DialogActions>
        <Box width='100%'>
          <Stepper activeStep={activeStep} style={{ justifyContent: 'space-around' }}>
            {steps.map((label, index) => {
              const stepProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </Box>
        <Box
          display='flex'
        >
          <Button onClick={handleBack} disabled={activeStep === 0}>Atras</Button>
          <Button onClick={handleNext}>{
            activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'
          }</Button>
        </Box>
      </DialogActions>
    </FormProvider>
  );
}