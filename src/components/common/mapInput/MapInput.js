import { Avatar, IconButton, TextField, Typography, Box, Modal, Fade, Backdrop, Button } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileInput from "../../common/FileInput";


import './MapInput.css';
import { Controller } from 'react-hook-form';

const MapInput = ({ altDefinition = '', value }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    bgcolor: 'white',
  };

  return (
    <>
      <Typography variant='h6' component='div' className='content-title'>
        Mapa
      </Typography>
      <Box className='map-container'>
        <Controller
          name="mapa.ubicacion"
          render={({
            field: { onChange, value },
            fieldState: { error }
          }) => (
            <FileInput
              accept='image/png, image/jpg, image/jpeg, image/gif'
              name='mapa.ubicacion'
              image={value ? value : 'test'}
              type={'map'}
            />
          )}
        />
        {
          value ?
            (
              <TextField
                label='Url ArcGIS'
                size='small'
                type='text'
                placeholder='URL del mapa'
                className='map-indicator'
                value={value}
              />
            )
            :
            (
              <TextField
                label='Url ArcGIS'
                size='small'
                type='text'
                placeholder='URL del mapa'
                className='map-indicator'
              />
            )
        }
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <FileInput
              accept='image/png, image/jpg, image/jpeg, image/gif'
              name='profileImage'
            />
            <Box className='modal-footer'>
              <Button
                variant='contained'
                color='primary'
                className='modal-footer-button'
              >
                Guardar
              </Button>
              <Button
                variant='contained'
                color='primary'
                className='modal-footer-button'
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
};

export default MapInput;