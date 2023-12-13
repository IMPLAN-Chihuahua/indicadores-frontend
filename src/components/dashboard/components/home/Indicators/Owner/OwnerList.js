import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Card, CardContent, Divider, Paper, Skeleton, Typography } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { getUsersFromIndicador } from "../../../../../../services/userService";
import './Owner.css'
import useIsMounted from '../../../../../../hooks/useIsMounted';

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

export const OwnerListDropdown = ({ type, id, actualOwner, onChange }) => {
  const [users, setUsers] = useState([]);
  const [owner, setOwner] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const isMounted = useIsMounted();

  useEffect(() => {
    getUsersFromIndicador(id)
      .then((res) => {
        if (isMounted()) {
          setUsers((res.data.data));
          setOwner(actualOwner);
        }
      })
      .catch((err) => {
        setUsers([]);
      })
      .finally(_ => setLoading(false));
  }, [isMounted]);

  return (
    <Paper variant='outlined' sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Responsable
      </Typography>
      <Divider />
      <FormControl fullWidth>
        {
          isLoading
            ? (
              <Box
                sx={{
                  display: "flex"
                }}
                className="owner-container"
              >
                <Skeleton variant="circular" width={50} height={50} animation="wave" />
                <Box className="testz">
                  <Typography sx={{ fontSize: 14 }}>
                    <Skeleton variant="rectangular" width={200} height={20} animation="wave" />
                  </Typography>
                </Box>
              </Box>
            )
            : users.length > 0 && owner > 0 ? (
              <Select
                defaultValue={owner}
                inputProps={{
                  name: "owner",
                }}
                MenuProps={{
                  disableScrollLock: true,
                }}
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                onChange={onChange}
              >
                {
                  users.map(user => (
                    <MenuItem value={user.idUsuario ?? ''} key={user.idUsuario}>
                      <OwnerList value={user.idUsuario} name={user.nombres} apellido={user.apellido} image={user.urlImagen} actualOwner={owner} />
                    </MenuItem>
                  ))
                }
              </Select>)
              : <Typography variant='body2'>Este Indicador no cuenta con usuarios asignados</Typography>
        }
      </FormControl>
    </Paper>
  );
};
export default OwnerListDropdown