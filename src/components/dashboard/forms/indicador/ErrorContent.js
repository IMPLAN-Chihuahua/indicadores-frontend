import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from '@mui/material';

const ErrorContent = (props) => {
  return (
    <div style={{ height: '100%', margin: 'auto', display: 'flex', justifyContent: props.justifyContent || 'center', alignItems: 'center' }}>
      <ErrorIcon color='error' sx={{ fontSize: 50 }} />
      <div style={{marginLeft: '15px'}}>
        <Typography variant='h5' color='error'>Hubo un problema</Typography>
        <Typography variant='body2' color='error'>{props.error}</Typography>
        <Typography variant='caption'>Intentalo más tarde</Typography>
      </div>
    </div>
  );
}

export default ErrorContent;