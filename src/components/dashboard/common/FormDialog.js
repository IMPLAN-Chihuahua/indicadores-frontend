import { Dialog, Slide } from '@mui/material';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FormDialog = (props) => {
  const { children, handleClose, open, ...dialogOptions } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ maxWidth: '1000px', margin: 'auto' }}
      disableScrollLock={true}
      {...dialogOptions}
    >
      {children}
    </Dialog>
  )
}
export default FormDialog;