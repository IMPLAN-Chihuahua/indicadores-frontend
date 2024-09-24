import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HideSourceIcon from '@mui/icons-material/HideSource';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography } from '@mui/material';
import { updateIndicator } from '../../../../../../services/indicatorService';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link as RouterLink } from 'react-router-dom';
import { Link, TextField } from '@mui/material'

/**Componente completamente robado de https://mui.com/material-ui/react-menu/ */

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
      },
      '&:active': {
        backgroundColor: 'main'
      },
    },
  },
}));

const ARCHIVO = 'ARCHIVO'
const ESTADO = 'ESTADO'

export default function CustomizedMenus({ methods }) {
  const { id } = useParams()

  const changeIndicadorStatus = async (status) => {
    handleClose()
    Swal.fire({
      title: `Esta acción ${status === ARCHIVO ? 'archivará' : 'desactivará'} el indicador, lo que significa que no se mostrará en la lista de indicadores del sitio web.`,
      text: '¿Estás seguro de que deseas continuar?',
      icon: 'info',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        switch (status) {
          case ARCHIVO:
            methods.setValue('archive', !methods.getValues('archive'))
            await updateIndicator(id, {
              archive: methods.getValues('archive')
            });
            break;
          case ESTADO:
            methods.setValue('activo', !methods.getValues('activo'))
            await updateIndicator(id, {
              activo: methods.getValues('activo')
            });
            break;
        }
      }
    })
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-haspopup="true"
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Opciones
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          changeIndicadorStatus(ARCHIVO)
        }}>
          <ArchiveOutlinedIcon />
          {
            methods.getValues('archive') ?
              <Typography variant='body1' sx={{ pl: 1 }}>
                Desarchivar
              </Typography>
              :
              <Typography variant='body1' sx={{ pl: 1 }}>
                Archivar
              </Typography>
          }
        </MenuItem>
        <MenuItem onClick={() => {
          changeIndicadorStatus(ESTADO)
        }}>
          <HideSourceIcon />
          {
            methods.getValues('activo') ?
              <Typography variant='body1' sx={{ pl: 1 }}>
                Desactivar
              </Typography>
              :
              <Typography variant='body1' sx={{ pl: 1 }}>
                Activar
              </Typography>
          }
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FileDownloadOutlinedIcon />
          <a href={`http://10.218.108.59:8080/api/v1/documentos/${id}/pdf`} target='_blank' rel='noreferrer'>
            <Typography variant='body1' sx={{ pl: 1 }}>
              Descargar ficha
            </Typography>
          </a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <RocketLaunchOutlinedIcon />
          <a href={`http://10.218.108.59:3000/chihuahua-en-datos/indicadores/${id}`} target='_blank' rel='noreferrer'>
            <Typography variant='body1' sx={{ pl: 1 }}>
              Ver en Métrica
            </Typography>
          </a>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

