import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const Status = ({ status, type, handleClick }) => {
  const formattedStatus = status?.toLowerCase();
  if (type === 'expires') {
    switch (formattedStatus) {
      case 'si':
        return <b><Chip label='SÍ' variant='outlined' color='primary' /></b>
      case 'inactivo':
      case 'no':
        return <b><Chip label='NO' variant='outlined' color='secondary' /></b>
    }
  } else
    switch (formattedStatus) {
      case 'activo':
      case 'si':
        return (
          <Chip
            label='Activo'
            variant='outlined'
            color='success'
            onClick={handleClick}
            icon={<CheckCircleIcon />}
            sx={{ width: '95px', justifyContent: 'flex-start' }} />)
      case 'inactivo':
      case 'no':
        return (
          <Chip
            label='Inactivo'
            variant='outlined'
            color='error'
            onClick={handleClick}
            icon={<CancelIcon />}
            sx={{ width: '95px', justifyContent: 'flex-start' }} />)
      case 'administrador':
      case 'admin':
        return (
          <Chip
            label='Admin'
            variant='outlined'
            icon={<GppGoodIcon />} />)
      case 'usuario':
      case 'user':
        return (
          <Chip
            label='Usuario'
            variant='outlined'
            icon={<PersonIcon />} />)
      case 'descendente':
        return <div><ArrowDownwardIcon /></div>;
      case 'ascendente':
        return <div><ArrowDownwardIcon /></div>;
      default:
        return <Chip variant='outlined' label={status} />
    }
}
