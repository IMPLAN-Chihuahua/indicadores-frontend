import React, { useState } from 'react';
import { Avatar, Badge, Button, Card, CardContent, FormControl, Grid, IconButton, Modal, Switch, TextField, Typography, Backdrop, Fade, Box } from '@mui/material';
import './common.css'

const ImageUploader = ({ imageSource, badgeContent, type = 'avatar' }) => {

	const [openImage, setOpenImage] = useState(false);
	const [image, setImage] = useState('');

	const handleState = (e) => {
		setImage(e);
		setOpenImage(!openImage);
	};

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
			anchorOrigin={{
				vertical: type === 'avatar' ? 'bottom' : 'top',
				horizontal: 'right'
			}}
			badgeContent={badgeContent}
		>
			{
				type === 'avatar' ?
					(
						console.log('asdadad' + imageSource),
						<Avatar onClick={() => {
							handleState(imageSource);
						}} sx={{ width: 160, height: 160 }}
							className={`image-indicator image-selector `}
							src={`${imageSource}`} />
					)
					:
					(
						<img
							onClick={() => {
								handleState(imageSource);
							}}
							src={`${imageSource}`}
							alt='map'
							className='image-selector'
						/>
					)
			}

			<Modal
				open={openImage}
				onClose={handleState}
				closeAfterTransition
				sx={{ display: 'block' }}
			>
				<Fade in={openImage}>
					<img src={`${image}`} alt='map' />
				</Fade>
			</Modal>
		</Badge>
	)
}

export default ImageUploader;