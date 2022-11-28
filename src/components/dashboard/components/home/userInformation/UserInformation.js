import { Box } from "@mui/system";
import React, { useState } from "react";
import "./userInformation.css";
import { useAuth } from '../../../../../contexts/AuthContext';
import { Avatar, DialogTitle, IconButton, Paper, Stack, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import FormDialog from "../../../common/FormDialog";
import FormUser, { FORM_USER_ACTIONS } from "../../../forms/user/FormUser";
import PersonalLoader from "../../../../common/PersonalLoader/PersonalLoader";

export const UserInformation = () => {
  const { user } = useAuth();
  const { correo, nombres, apellidoPaterno, apellidoMaterno, descripcion } = user;
  const fullName = `${nombres} ${apellidoPaterno} ${apellidoMaterno || ''}`;
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (!user) {
    return <PersonalLoader />
  }

  return (
    <>
      <Paper
        component={Stack}
        direction={{ md: 'row', xs: 'column' }}
        variant='outlined'
        sx={{
          mb: 3,
          p: 2,
          position: 'relative'
        }}
      >
        <Avatar
          variant='rounded'
          alt={user.nombres}
          src={user.urlImagen || user.nombres}
          sx={{
            height: 120,
            width: 120,
            alignSelf: 'center'
          }} />
        <Box ml={{ md: 2 }}>
          <Typography variant='h5'>{fullName}</Typography>
          <Typography variant='body1'>{correo}</Typography>
          <Typography variant='body2'>{descripcion}</Typography>
        </Box>
        <Box position='absolute' top={2} right={2}>
          <IconButton onClick={() => setOpenModal(true)}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Paper>
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
    </>
  );
};
