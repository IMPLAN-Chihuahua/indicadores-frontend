import { Box } from "@mui/system";
import React, { useState } from "react";
import "./userInformation.css";
import { useAuth } from '../../../../../contexts/AuthContext';
import { Avatar } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import FormIndividualUser from "../../../forms/user/FormIndividualUser";
import FormDialog from "../../../common/FormDialog";

export const UserInformation = () => {
  const { user } = useAuth();
  const { correo, nombres, apellidoPaterno, apellidoMaterno } = user;
  const fullName = `${nombres} ${apellidoPaterno} ${apellidoMaterno || ''}`;
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    user && (
      <Box className='user-big-container'>
        <Box className="user-general-container">
          <Box className="user-container">
            <Box className="user-picture">
              <Box className="picture">
                <Avatar alt="Remy Sharp" src={user.urlImagen} sx={{ height: 120, width: 120 }} />
              </Box>
            </Box>
            <Box className="user-information">
              <h2 className="user-name">{fullName}</h2>
              <span className="user-email">{correo}</span>
            </Box>
          </Box>
          <Box className="date" onClick={() => setOpenModal(true)}>
            <Box className="date-text">
              <SettingsIcon />
              <FormDialog
                open={openModal}
                handleClose={handleCloseModal}
                title='Editar Usuario'
              >
                <FormIndividualUser handleCloseModal={handleCloseModal} />
              </FormDialog>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};
