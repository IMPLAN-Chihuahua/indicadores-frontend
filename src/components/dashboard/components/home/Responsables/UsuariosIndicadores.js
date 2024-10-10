import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Tooltip, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteRelation, getUsersThatDoesntHaveRelation, useRelationUsers } from '../../../../../services/usuarioIndicadorService';
import useIsMounted from '../../../../../hooks/useIsMounted';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import StarIcon from '@mui/icons-material/Star';
import Swal from 'sweetalert2';
import PersonalLoader from '../../../../common/PersonalLoader/PersonalLoader';
import { parseDate } from '../../../../../utils/dateParser';
import OwnerListDropdown from '../Indicators/Owner/OwnerList';

const UsuariosIndicadores = () => {
  const { id } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const isMounted = useIsMounted();

  const usersFetcher = async () => {
    const { data } = await getUsersThatDoesntHaveRelation(id);
    return data;
  };

  const setUsers = useCallback(async () => {
    const users = await usersFetcher();
    if (isMounted()) {
      setUsuarios(users);
    }
  }, [isMounted]);

  const handleCheckboxChange = (idUsuario) => {
    setSelectedCheckboxes((prevSelected) =>
      prevSelected.includes(idUsuario)
        ? prevSelected.filter((id) => id !== idUsuario)
        : [...prevSelected, idUsuario]
    );
  };

  const handleDeleteUsersRelation = () => {
    const payload = {
      usersId: selectedCheckboxes,
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Eliminarás los permisos de edición sobre el indicador de los usuarios seleccionados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRelation(payload)
          .then(_ => { mutate() })
      }
    })

  }

  const { indicador, isLoading, hasError, mutate } = useRelationUsers(id, 1, 20);

  useEffect(() => {
    setUsers();
  }, [setUsers]);

  if (isLoading) {
    return <PersonalLoader />
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant='h5'>
          {indicador?.nombre}
        </Typography>

        <Box>
          <Autocomplete
            multiple
            id='checkboxes-users'
            options={usuarios}
            disableCloseOnSelect
            filterSelectedOptions
            getOptionLabel={(option) => option.nombres}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.nombres}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params}
                variant='outlined' label='Buscar usuarios' />
            )}
          />

        </Box>
      </Box>

      <Grid container
        sx={{
          boxShadow: 'rgba(27, 31, 35, 0.01) 0px 1px 0px, rgba(255, 255, 255, 0.15) 0px 1px 0px inset',
          mt: 1
        }}>
        <Grid item xs={12} md={8} sx={{ pr: 1 }}>
          <FormGroup sx={{ width: '100%', backgroundColor: 'white', p: 2 }}>
            <Typography variant='h6'>
              Usuarios que tienen permiso de edición sobre este indicador
            </Typography>
            {
              indicador?.data?.map((data) => (
                <Box sx={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                  {
                    data.idUsuario != indicador.owner && (
                      <>
                        <FormControlLabel control={
                          <Checkbox
                            onChange={() => handleCheckboxChange(data.idUsuario)}
                          />
                        }
                          label={`${data.usuario.nombres} ${data.usuario.apellidoPaterno}`}
                        />
                        <Typography variant='caption' color={'gray'} ml={1} fontStyle={'italic'}>
                          Desde {parseDate(data.createdAt)}
                        </Typography>
                      </>
                    )
                  }
                </Box>
              ))
            }
          </FormGroup>
        </Grid>
        <Grid item xs={12} md={4}>
          <OwnerListDropdown type={2} id={id} actualOwner={indicador.owner} />
        </Grid>
      </Grid >

      <Box sx={{ mt: 2 }}>
        <Button variant='contained' color='error'
          disabled={selectedCheckboxes.length === 0}
          onClick={handleDeleteUsersRelation}
        >
          Eliminar seleccionados
        </Button>
      </Box>
    </Box >
  )
}

export default UsuariosIndicadores