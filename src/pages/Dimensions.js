import { Box, Button, Card, CardContent, CardMedia, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getDimensionsGeneralInfo } from '../services/dimensionService';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from '../components/dashboard/common/FormDialog';
import { FormDimension } from '../components/dashboard/forms/dimension/FormDimension';



const Dimensions = () => {
  const [dimensions, setDimensions] = useState([])
  const getDimensions = () => {
    getDimensionsGeneralInfo({})
      .then(({ data }) => {
        setDimensions(data.data)
      })
  }

  useEffect(() => {
    getDimensions()
  }, [])

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'start',
      alignItems: 'start',
      justifyContent: 'start',
    }}>
      {
        dimensions.map((dimension) => (
          <Cardie
            key={dimension.id}
            id={dimension.id}
            titulo={dimension.titulo}
            descripcion={dimension.descripcion}
            color={dimension.color}
            urlImagen={dimension.urlImagen}
            count={dimension.indicadoresCount}
          />

        ))
      }
    </Box>
  )
};

const Cardie = (dimension) => {
  const {
    id,
    titulo,
    descripcion,
    color,
    urlImagen,
    count
  } = dimension
  console.log('%c ' + dimension, 'background: #222; color: #26A783; font-weight: bold;');

  const [openModal, setOpenModal] = useState(false);
  const [selectedDimension, setSelectedDimension] = useState(null);

  const handleCloseModal = async () => {
    setOpenModal(false)
    setSelectedDimension(null)
  };

  const handleEdit = () => {
    setOpenModal(true)
    setSelectedDimension(dimension)
  }


  return (
    <Box sx={{
      minHeight: 200,
      display: 'flex',
      flexDirection: 'row',
      m: 1,
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      borderRadius: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.58)',
      position: 'relative'
    }}>
      <Box
        component={'img'}
        sx={{
          minHeight: 250,
          maxHeight: 250,
          minWidth: 400,
          maxWidth: 400,
        }}
        alt={titulo}
        src={urlImagen}
      />

      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: 'black',
          borderRadius: 1,
        }}
        onClick={() => {
          handleEdit()
        }}
      >
        <EditIcon />
      </IconButton>

      <Box sx={{ p: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{
          mr: 3
        }}>
          {titulo}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {descripcion}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: color,
          color: 'white',
          padding: 1,
          borderTopLeftRadius: 5,

        }}
      >
        <b>Indicadores en esta dimensión:</b> {count}
      </Box>

      <FormDialog
        open={openModal}
        handleClose={handleCloseModal}
      >
        <DialogTitle>Editar dimensión</DialogTitle>
        <FormDimension
          selectedDimension={selectedDimension}
          handleCloseModal={handleCloseModal}
          action='edit' />
      </FormDialog>
    </Box>
  )
};

export default Dimensions