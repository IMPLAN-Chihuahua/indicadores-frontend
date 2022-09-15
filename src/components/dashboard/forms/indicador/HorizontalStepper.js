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
            stepLabels.map(({ label, idx }) => (
              <Step key={idx}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))
          }
        </Stepper>
      </Box>
    </>
  );
}