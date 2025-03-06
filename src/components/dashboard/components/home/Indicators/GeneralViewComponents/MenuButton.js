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
import { CircularProgress, ListItemIcon, Typography } from '@mui/material';
import { updateIndicator } from '../../../../../../services/indicatorService';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useFormContext } from 'react-hook-form';
import GradeIcon from '@mui/icons-material/Grade';
const FormDestacarIndicadorInObjetivo = React.lazy(() => import('../../../../forms/indicador/FormDestacarIndicadorInObjetivo'))

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

export default function CustomizedMenus() {
  const { control, getValues, setValue } = useFormContext();
  const { id } = useParams()

  const changeIndicadorStatus = async (status) => {
    handleClose()
    Swal.fire({
      title: handleTitle(status),
      text: '¿Estás seguro de que deseas continuar?',
      icon: 'info',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        switch (status) {
          case ARCHIVO:
            setValue('archive', !getValues('archive'))
            await updateIndicator(id, {
              archive: getValues('archive')
            });
            break;
          case ESTADO:
            setValue('activo', !getValues('activo'))
            await updateIndicator(id, {
              activo: getValues('activo')
            });
            break;
        }
      }
    })
  }

  const handleTitle = (status) => {
    const isArchived = getValues('archive')
    const isActive = getValues('activo')

    let actionMessage = '';
    let actionBody = '';


    switch (status) {
      case ARCHIVO:
        actionMessage = isArchived ? 'desarchivará' : 'archivará';
        actionBody = isArchived ? 'se mostrará en la lista de indicadores del sitio web.' : 'no se mostrará en la lista de indicadores del sitio web.';
        break;
      case ESTADO:
        actionMessage = isActive ? 'desactivará' : 'activará';
        actionBody = isActive ? 'no se mostrará en la lista de indicadores del sitio web.' : 'se mostrará en la lista de indicadores del sitio web.';
        break;
    }

    let fullMessage = `Esta acción ${actionMessage} el indicador, lo que significa que ${actionBody}`;

    return fullMessage;
  }

  const [openDestacadoForm, setOpenDestacadoForm] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenDestacadoForm(false);
    setAnchorEl(null);
  };

  return (
    <>
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
            <ListItemIcon>
              <ArchiveOutlinedIcon />
            </ListItemIcon>
            {
              getValues('archive') ?
                <Typography variant='body1' >
                  Desarchivar
                </Typography>
                :
                <Typography variant='body1' >
                  Archivar
                </Typography>
            }
          </MenuItem>
          <MenuItem onClick={() => {
            changeIndicadorStatus(ESTADO)
          }}>
            <ListItemIcon>
              <HideSourceIcon />
            </ListItemIcon>
            {
              getValues('activo') ?
                <Typography variant='body1' >
                  Desactivar
                </Typography>
                :
                <Typography variant='body1' >
                  Activar
                </Typography>
            }
          </MenuItem>
          <MenuItem onClick={() => setOpenDestacadoForm(true)}>
            <ListItemIcon>
              <GradeIcon />
            </ListItemIcon>
            <Typography>Destacar en objetivos</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <FileDownloadOutlinedIcon />
            </ListItemIcon>
            <a href={`http://localhost:8080/api/v1/documentos/${id}/pdf`} target='_blank' rel='noreferrer'>
              <Typography variant='body1' >
                Descargar ficha
              </Typography>
            </a>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <RocketLaunchOutlinedIcon />
            </ListItemIcon>
            <a href={`http://10.218.108.59:3000/chihuahua-en-datos/indicadores/${id}`} target='_blank' rel='noreferrer'>
              <Typography variant='body1' >
                Ver en Métrica
              </Typography>
            </a>
          </MenuItem>
        </StyledMenu>
      </div>
      {
        openDestacadoForm && (
          <React.Suspense fallback={<CircularProgress />}>
            <FormDestacarIndicadorInObjetivo
              open={openDestacadoForm}
              handleClose={() => {
                console.log('closing form')
                handleClose();
              }}
              destacados={getValues('destacados')}
            />
          </React.Suspense>
        )
      }
    </>
  );
}

