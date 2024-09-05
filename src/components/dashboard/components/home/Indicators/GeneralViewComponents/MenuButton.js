import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HideSourceIcon from '@mui/icons-material/HideSource';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography } from '@mui/material';

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

export default function CustomizedMenus() {
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
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
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
        <MenuItem onClick={handleClose}>
          <ArchiveOutlinedIcon />
          <Typography variant='body1' sx={{ pl: 1 }}>
            Archivar
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <HideSourceIcon />
          <Typography variant='body1' sx={{ pl: 1 }}>
            Desactivar
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FileDownloadOutlinedIcon />
          <Typography variant='body1' sx={{ pl: 1 }}>
            Descargar ficha
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <RocketLaunchOutlinedIcon />
          <Typography variant='body1' sx={{ pl: 1 }}>
            Ver en Métrica
          </Typography>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}