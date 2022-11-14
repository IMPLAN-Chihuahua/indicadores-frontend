import { Box } from "@mui/system";
import React, { useState } from "react";
import "./userInformation.css";
import { useAuth } from '../../../../../contexts/AuthContext';
import { Avatar, DialogTitle } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import FormDialog from "../../../common/FormDialog";
import FormUser, { FORM_USER_ACTIONS } from "../../../forms/user/FormUser";
import PersonalLoader from "../../../../common/PersonalLoader/PersonalLoader";

export const UserInformation = () => {
  const { user } = useAuth();
  const { correo, nombres, apellidoPaterno, apellidoMaterno } = user;
  const fullName = `${nombres} ${apellidoPaterno} ${apellidoMaterno || ''}`;
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (!user) {
    return <PersonalLoader />
  }

  return (
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
          </Box>
        </Box>
      </Box>
      <FormDialog
        open={openModal}
        handleClose={handleCloseModal}
      >
        <DialogTitle>Actualizar Perfil</DialogTitle>
        <FormUser
          handleCloseModal={handleCloseModal}
          action={FORM_USER_ACTIONS.EDIT_PROFILE}
          selectedUser={user}
        />
      </FormDialog>
    </Box>
  );
};
