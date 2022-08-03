import { Avatar, Box, Badge, Button, Card, CardContent, FormControl, Grid, IconButton, Modal, Switch, TextField, Typography, Backdrop, Fade } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import ImageUploader from "../dashboard/common/ImageUploader";

const FileInput = (props) => {
  const { name, label, height, image, type } = props;
  const { register, unregister, setValue, watch } = useFormContext();
  const [files, setFiles] = useState(watch(name));
  const [previousImage, setPreviousImage] = useState('');

  if (!files || files === null) {
    if (type === 'avatar') {
      setFiles('/images/avatar.jpg');
    }
    else if (type === 'map') {
      setFiles('/images/map.png');
    }
  }

  useEffect(() => {
    setFiles(watch(name));
    if (typeof (image) === 'string') {
      setPreviousImage(image);
    }
  }, [watch(name)]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDrop = useCallback((droppedFiles) => {
    setValue(name, droppedFiles, { shouldValidate: true });
  }, [setValue, name]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    }
  }, [register, unregister, name]);

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

  const handleCancel = () => {
    setOpen(false);
    setFiles(previousImage);
    setValue(name, previousImage, { shouldValidate: true });
  }

  return (
    <>
      {
        typeof files !== 'object'
          ?
          (
            <ImageUploader
              variant={props.variant || 'rounded'}
              type={type}
              imageSource={`http://localhost:8080${files}`}
              badgeContent={
                (<IconButton onClick={handleOpen} sx={{ backgroundColor: 'aliceblue' }}>
                  <EditOutlinedIcon fontSize='large' />
                </IconButton >)
              }
            />
          )
          :
          files === null ?
            (
              <h1>test</h1>
            )
            :
            (
              files?.map((file, index) => {
                return (
                  <div key={index}>
                    <ImageUploader
                      variant={props.variant || 'rounded'}
                      type={type}
                      imageSource={URL.createObjectURL(file)}
                      badgeContent={
                        <IconButton onClick={handleOpen} sx={{ backgroundColor: 'aliceblue' }}>
                          <EditOutlinedIcon />
                        </IconButton >
                      } />
                  </div>
                )
              })
            )
      }


      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        sx={{ display: 'block' }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <label className=" " htmlFor={name}>
              {label}
            </label>
            <div
              {...getRootProps()}
              type='file'
              role='button'
              aria-label='Subir archivo'
              id={name}
            >
              {
                typeof files === 'string' ?
                  <>
                    <input {...props} {...getInputProps()} />
                    <div
                      style={{
                        width: '100%',
                        border: 'dashed 2px lightgrey',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: 5,
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: isDragActive ? '#f8f8f8' : 'white'
                      }}>
                      <Typography pt={3} pb={3}>Arrastra la imagen de perfil para subirla</Typography>
                    </div>
                  </>
                  :
                  <>
                    <input {...props} {...getInputProps()} />
                    <div
                      style={{
                        width: '100%',
                        border: 'dashed 2px lightgrey',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: 5,
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: isDragActive ? '#f8f8f8' : 'white'
                      }}>
                      <Typography pt={3} pb={3}>Arrastra la imagen de perfil para subirla</Typography>
                      {
                        !!files?.length && (
                          <div>
                            {
                              files?.map((file, index) => {
                                return (
                                  <div key={index}>
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                      style={{
                                        height: height || '150px'
                                      }} />
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                      }
                    </div>
                  </>
              }

            </div>
            <Box className='modal-footer'>
              <Button
                variant='contained'
                color='primary'
                className='modal-footer-button'
                onClick={handleClose}
              >
                Guardar
              </Button>
              <Button
                variant='contained'
                color='primary'
                className='modal-footer-button'
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>


    </>
  );

}

export default FileInput;