import {
  Box, DialogTitle,
  Step, Stepper, StepLabel
} from "@mui/material";

export const HorizontalStepper = ({ activeStep = 0, stepLabels }) => {
  return (
    <>
      <Box sx={{ p: '16px 24px' }}>
        <Stepper activeStep={activeStep} style={{ justifyContent: 'space-around' }}>
          {
            stepLabels.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))
          }
        </Stepper>
      </Box>
    </>
  );
}