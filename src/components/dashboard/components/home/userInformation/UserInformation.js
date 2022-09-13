import { Box } from "@mui/system";
import React from "react";
import "./userInformation.css";
import { useAuth } from '../../../../../contexts/AuthContext';

export const UserInformation = () => {
  const { user } = useAuth();
  const { correo, nombres, apellidoPaterno, apellidoMaterno } = user;
  const fullName = `${nombres} ${apellidoPaterno} ${apellidoMaterno || ''}`;
  return (
    user && (
      <Box>
        <Box className="user-general-container">
          <Box className="user-container">
            <Box className="user-picture">
              <Box className="picture">
                <img
                  src={user.urlImagen}
                  alt="user"
                  style={{ width: 130, height: 90, borderRadius: "10%" }}
                />
              </Box>
            </Box>
            <Box className="user-information">
              <h2 className="user-name">{fullName}</h2>
              <span className="user-email">{correo}</span>
            </Box>
          </Box>
          <Box className="date">
            <Box className="date-text">
              <h3>{new Date().toLocaleDateString()}</h3>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};
