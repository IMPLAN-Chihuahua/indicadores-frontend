import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const Status = ({ status }) => {
  const formattedStatus = status.toLowerCase();
  switch (formattedStatus) {
    case 'activo':
    case 'si':
      return <Chip label='Activo' variant='outlined' color='success' icon={<CheckCircleIcon />} />
    case 'inactivo':
    case 'no':
      return <Chip label='Inactivo' variant='outlined' color='error' icon={<CancelIcon />} />
    case 'administrador':
      return <Chip label='Administrador' variant='outlined' color='primary' icon={<GppGoodIcon />} />
    case 'usuario':
      return <Chip label='Usuario' variant='outlined' color='default' icon={<PersonIcon />} />
    case 'descendente':
      return <div><ArrowDownwardIcon /></div>;
    case 'ascendente':
      return <div><ArrowDownwardIcon /></div>;
    default:
      return <Chip variant='outlined' label={status} />
  }
}
