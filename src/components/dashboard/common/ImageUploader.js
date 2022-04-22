import React, { useState } from 'react';
import { Avatar, Badge, Button, Card, CardContent, FormControl, Grid, IconButton, Modal, Switch, TextField, Typography, Backdrop, Fade } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileInput from "../../common/FileInput";
import { Box } from '@mui/system';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const ImageUploader = ({ imageSource, badgeContent, type = 'avatar' }) => {

	return (
		<Badge
			overlap="circular"
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			badgeContent={badgeContent}
		>
			{
				type === 'avatar' ?
					(
						<Avatar sx={{ width: 160, height: 160 }} className='image-indicator' src={`${imageSource}`} />
					)
					:
					(
						<img src={`${imageSource}`} alt='map' />
					)
			}
		</Badge>
	)
}

export default ImageUploader;