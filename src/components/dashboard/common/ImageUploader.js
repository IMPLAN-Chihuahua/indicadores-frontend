import React, { useState } from 'react';
import { Avatar, Badge, Button, Card, CardContent, FormControl, Grid, IconButton, Modal, Switch, TextField, Typography, Backdrop, Fade } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileInput from "../../common/FileInput";
import { Box } from '@mui/system';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const ImageUploader = ({ imageSource, badgeContent }) => {

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
			badgeContent={badgeContent}
		>
			<Avatar sx={{ width: 160, height: 160 }} className='image-indicator' src={`${imageSource}`} />
		</Badge>
	)
}

export default ImageUploader;