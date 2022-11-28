import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { validateHistoricoSchema } from '../../../../../../utils/historicoValidator';
import { editHistoricos, createHistoricos } from '../../../../../../services/historicosService';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../../../contexts/AuthContext';

const FormHistoricos = (props) => {
  const { type, anio, valor, fuente, id, handleCloseModal, mutate } = props;
  const idIndicador = useParams();
  const { user } = useAuth();
  const methods = useForm({
    defaultValues: {
      id: id ? id : '',
      anio: anio ? anio : '',
      valor: valor ? valor : '',
      fuente: fuente ? fuente : '',
    },
    mode: 'onBlur',
    resolver: yupResolver(validateHistoricoSchema)
  });

  const onSubmit = async (data) => {

    Swal.fire({
      customClass: {
        container: 'my-swal'
      },
      title: `¿Deseas ${type === 1 ? 'editar' : 'agregar'} este valor histórico?`,
      text: `Al ${type === 1 ? 'editar' : 'agregar'} este registro, los cambios generados se actualizarán en la tabla de valores históricos de Chihuahua Métrica y en el sistema de gestión de Chihuahua en Datos.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: type === 1 ? '#2D9CDB' : '#6bca3f',
      cancelButtonColor: '#B7BFCC',
      cancelButtonText: `<div style="color: #7A7A7A; font-weight: 600; font-family: sans-serif">Cancelar ${type === 1 ? 'edición de registro' : 'operación'}</div>`,
      confirmButtonText: '<div style="font-weight: 500; font-family: sans-serif">Guardar cambios</div>',
    }).then((result) => {
      if (result.isConfirmed) {
        type === 1 ? editHistorico(id, data) : createHistorico(data);
      }
    });

  }

  const editHistorico = (id, data) => {
    data.idUsuario = user.id;
    editHistoricos(id, data)
      .then((res) => {
        Swal.fire({
          title: `Registro modificado correctamente`,
          text: `El registro ha sido modificado.`,
          icon: 'success',
          customClass: {
            container: 'my-swal'
          },
        });
        mutate();
        handleCloseModal();
      })
      .catch((err) => {
        Swal.fire({
          title: `Ha ocurrido un error, contacta al administrador`,
          text: err,
          icon: 'error',
          customClass: {
            container: 'my-swal'
          },
        });
      });
  };

  const createHistorico = (data) => {
    data.idUsuario = user.id;
    createHistoricos(idIndicador.id, data)
      .then((res) => {
        Swal.fire({
          title: `Registro agregado correctamente`,
          text: `El registro ha sido agregado.`,
          icon: 'success',
          customClass: {
            container: 'my-swal'
          },
        });
        mutate();
        handleCloseModal();
      })
      .catch((err) => {
        Swal.fire({
          title: `Ha ocurrido un error, contacta al administrador`,
          text: err,
          icon: 'error',
          customClass: {
            container: 'my-swal'
          },
        });
      });
  }

  return (
    <>
      <DialogTitle>{type === 1 ? 'Editar' : "Agregar"} Histórico</DialogTitle>
      <FormProvider {...methods}>
        <DialogContent>
          <Box 
            mt={1}
            component='form'
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            onReset={methods.reset}
          >
            <Controller
              name="anio"
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label='Año'
                  variant='outlined'
                  required
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  sx={{ pb: 2 }}
                />
              )}
            />
            <Controller
              name="valor"
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label='Valor'
                  variant='outlined'
                  required
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  sx={{ pb: 2 }}
                />
              )}
            />
            <Controller
              name="fuente"
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label='Fuente de información'
                  variant='outlined'
                  required
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  sx={{ pb: 2 }}
                />
              )}
            />
            <Box
              sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}
            >
              <Button variant='text' onClick={() => {
                handleCloseModal()
              }}>
                Cancelar
              </Button>
              <Button variant='contained' type='submit' >
                Guardar
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </FormProvider>
    </>
  )
}

export default FormHistoricos