import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Skeleton, Typography } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { getUsersFromIndicador } from "../../../../../../services/userService";

const OwnerList = ({ value, name, apellido, image, actualOwner }) => {
  return (
    <Box
      sx={{
        display: "flex"
      }}
      className="owner-container"
    >
      <Avatar
        src={image}
        sx={{ width: 85, height: 85 }}
      ></Avatar>
      <Box className="testz">
        <Typography sx={{ fontSize: 15 }}>
          {name} {apellido}
        </Typography>
        {
          actualOwner === value && (
            <Typography sx={{ fontSize: 12 }} color="text.secondary">
              Responsable actual
            </Typography>
          )
        }
      </Box>
    </Box>
  );
};

export const OwnerListDropdown = ({ type, id, actualOwner }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsersFromIndicador(id)
      .then((res) => {
        setUsers((res.data.data));
      })
      .catch((err) => {
        setUsers([]);
      });
  }, []);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {
          users && users.length > 0 ? (
            <Select
              defaultValue={actualOwner}
              inputProps={{
                name: "User",
                id: "uncontrolled-native"
              }}
              MenuProps={{
                disableScrollLock: true,
              }}
              sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
              IconComponent={() => <SwapVertIcon />}
            >
              {
                users.map((user) => (
                  <MenuItem value={user.idUsuario} key={user.idUsuario}>
                    <OwnerList value={user.idUsuario} name={user.nombres} apellido={user.apellido} image={user.urlImagen} actualOwner={actualOwner} />
                  </MenuItem>
                ))
              }
            </Select>
          ) :
            <Box
              sx={{
                display: "flex"
              }}
              className="owner-container"
            >
              <Skeleton variant="circular" width={70} height={70} animation="wave" />
              <Box className="testz">
                <Typography sx={{ fontSize: 14 }}>
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />
                  <Skeleton variant="rectangular" width={210} height={20} animation="wave" />
                </Typography>
              </Box>
            </Box>
        }
      </FormControl>
    </Box>
  );
};
export default OwnerListDropdown