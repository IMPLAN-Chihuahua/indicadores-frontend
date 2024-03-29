import React, { useState } from 'react';
import { Avatar, Badge, Modal, Fade } from '@mui/material';
import './common.css'

const ImageUploader = ({ imageSource, badgeContent, type = 'avatar', klass, variant = 'circular' }) => {
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
						<Avatar 
						variant={variant}
						onClick={() => {
							handleState(imageSource);
						}} sx={{ width: 160, height: 160 }}
							className={`${klass} image-indicator image-selector `}
							src={`${imageSource}`} />
					)
					:
					(
						<img
							onClick={() => {
								handleState(imageSource);
							}}
							src={`${imageSource}`}
							width='100%'
							alt='map'
							className={`${klass} image-selector `}
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