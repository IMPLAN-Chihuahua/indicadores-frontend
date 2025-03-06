import { Autocomplete, Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, TextField, Tooltip, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { changeOwner, createRelation, deleteRelation, getUsersThatDoesntHaveRelation, useRelationUsers } from '../../../../../services/usuarioIndicadorService';
import useIsMounted from '../../../../../hooks/useIsMounted';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Swal from 'sweetalert2';
import PersonalLoader from '../../../../common/PersonalLoader/PersonalLoader';
import { parseDate } from '../../../../../utils/dateParser';
import OwnerListDropdown from '../Indicators/Owner/OwnerList';
import { Controller, FormProvider, useForm } from 'react-hook-form';


const UsuariosIndicadores = () => {
  const { id } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [clear, setClear] = useState(false);
  const [owner, setOwner] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const isMounted = useIsMounted();

  const methods = useForm({
    defaultValues: {
      owner: ''
    }
  })

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

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Eliminarás los permisos de edición sobre el indicador de los usuarios seleccionados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRelation(selectedCheckboxes)
          .then(_ => {
            mutate()
            setSelectedCheckboxes([])
            setRefresher(!refresher)
          })
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

  const handleAddNewUsers = () => {
    const ids = newUsers.map((user) => user.id);

    Swal.fire({
      title: 'Se agregará a los usuarios seleccionados',
      text: 'Los usuarios seleccionados podrán editar el indicador.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
    }).then((result) => {
      if (result.isConfirmed) {
        createRelation(id, { ids })
          .then(_ => {
            mutate();
            setClear(!clear);
            setNewUsers([])
            setUsuarios(usuarios.filter((user) => !ids.includes(user.id)))
            setRefresher(!refresher);
          })
      }
    })
  }

  const handleSubmitChangeOwner = (data) => {
    const payload = {
      idUsuario: data.owner
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Cambiarás al responsable del indicador',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar'
    }).then((result) => {
      if (result.isConfirmed) {
        changeOwner(id, payload)
          .then(_ => {
            mutate();
          })
      }
    })
  }

  const checkChangeOnOwner = (e, onChange) => {
    onChange(e);
    setOwner(e.target.value);
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

        <Box sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}>
          <Autocomplete
            multiple
            id='checkboxes-users'
            options={usuarios}
            key={clear}
            disableCloseOnSelect
            filterSelectedOptions
            getOptionLabel={(option) => option.nombres}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, value) => setNewUsers(value)}
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
          <Button disabled={newUsers.length === 0} variant='contained' color='primary' onClick={handleAddNewUsers}>
            Agregar usuarios
          </Button>
        </Box>
      </Box>

      <Grid container
        sx={{
          boxShadow: 'rgba(27, 31, 35, 0.01) 0px 1px 0px, rgba(255, 255, 255, 0.15) 0px 1px 0px inset',
          mt: 1,
          backgroundColor: 'red',
          minHeight: 300,
        }}>
        <Grid item xs={12} md={8}>
          <FormGroup sx={{ width: '100%', height: '100%', backgroundColor: 'white', p: 2 }}>
            <Typography variant='h6' gutterBottom>
              Usuarios que tienen permiso de edición sobre este indicador
            </Typography>
            <Divider />
            {
              indicador?.data?.length > 1 ?
                indicador.data.map((data) => (
                  <Box key={data.id} sx={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                    {
                      data.idUsuario != indicador.owner && (
                        <>
                          <FormControlLabel control={
                            <Checkbox
                              onChange={() => handleCheckboxChange(data.id)}
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
                )) : (
                  <Box sx={{
                    width: '100%', p: 2
                  }}>
                    <Typography variant='body1' color='gray'>
                      Aún no hay usuarios asignados 😿
                    </Typography>
                  </Box>
                )
            }
          </FormGroup>
        </Grid>
        <FormProvider {...methods}>
          <Grid item xs={12} md={4}
            component={'form'}
            id='form-owner'
            onSubmit={methods.handleSubmit(handleSubmitChangeOwner)}
            noValidate
          >
            <Controller
              name='owner'
              key={refresher}
              control={methods.control}
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => (
                <OwnerListDropdown
                  type={2}
                  id={id}
                  actualOwner={indicador.owner}
                  onChange={
                    (e) => {
                      checkChangeOnOwner(e, onChange)
                    }
                  }
                  error={error}
                />
              )}
            />
          </Grid>
        </FormProvider>
      </Grid >
      <Box sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: 3
      }}>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          form='form-owner'
          disabled={owner === indicador.owner || owner === null || owner === ''}
        >
          Guardar cambios
        </Button>
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