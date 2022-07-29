import React, { useState } from 'react';
import { Avatar, Badge, Button, Card, CardContent, FormControl, Grid, IconButton, Modal, Switch, TextField, Typography, Backdrop, Fade, Box } from '@mui/material';
import './common.css'

const ImageUploader = ({ imageSource, badgeContent, type = 'avatar' }) => {

	const [openImage, setOpenImage] = useState(false);
	const [image, setImage] = useState('');

	const handleState = (e) => {
		setOpenImage(!openImage);
		setImage(e);
	};

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxwidth: '600px',
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

			{
				typeof image === 'string' && (
					<Modal
						open={openImage}
						onClose={handleState}
					>
						<Fade in={openImage}>
							<img src={`${image}`} style={style} />
						</Fade>
					</Modal>
				)
			}

		</Badge>
	)
}

export default ImageUploader;