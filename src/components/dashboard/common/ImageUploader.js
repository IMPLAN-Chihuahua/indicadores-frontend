import React, { useState } from 'react';
import { Avatar, Badge, Button, Card, CardContent, FormControl, Grid, IconButton, Modal, Switch, TextField, Typography, Backdrop, Fade } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileInput from "../../common/FileInput";
import { Box } from '@mui/system';

const ImageUploader = ({ imageSource = 'https://pbs.twimg.com/media/Efso_-yUwAAJpRV.jpg', altDefinition }) => {
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
		<Badge
			overlap="circular"
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			badgeContent={
				<IconButton onClick={handleOpen}>
					<Avatar>
						<EditOutlinedIcon />
					</Avatar>
				</IconButton>
			}
		>
			<Avatar sx={{ width: 160, height: 160 }} className='image-indicator' src={imageSource} alt={altDefinition} />

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
							label='Subir Archivo'
						/>
						<Box className='modal-footer'>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								className='modal-footer-button'
							>
								Guardar
							</Button>
							<Button
								type='submit'
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
		</Badge>
	)
}

export default ImageUploader;