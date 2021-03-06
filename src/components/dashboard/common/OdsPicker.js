import React, { useEffect, useState } from 'react';
import { Button, IconButton, Input, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import Popover from '@mui/material/Popover';
import MenuIcon from '@mui/icons-material/Menu';

const itemData = [
	{
		id: 1,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-01.jpg',
		title: 'Fin de la pobreza',
	},
	{
		id: 2,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-02.jpg',
		title: 'Hambre cero',
	},
	{
		id: 3,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-03.jpg',
		title: 'Salud y bienestar',
	},
	{
		id: 4,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-04.jpg',
		title: 'Educación de calidad',
	},
	{
		id: 5,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-05.jpg',
		title: 'Igualdad de género',
	},
	{
		id: 6,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-06.jpg',
		title: 'Agua limpia y saneamiento',
	},
	{
		id: 7,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-07.jpg',
		title: 'Energía asequible y no contaminante',
	},
	{
		id: 8,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-08.jpg',
		title: 'Trabajo decente y crecimiento económico',
	},
	{
		id: 9,
		img: 'https://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2015/09/S_SDG_Icons-01-10-1.jpg',
		title: 'Reducción de las desigualdades',
	},
	{
		id: 10,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-11.jpg',
		title: 'Ciudades y comunidades sostenibles',
	},
	{
		id: 11,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-13.jpg',
		title: 'Acción por el clima',
	},
	{
		id: 12,
		img: 'http://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2016/01/S_SDG_Icons-01-14.jpg',
		title: 'Vida submarina',
	},
];

const OdsPicker = ({ odsId = 0 }) => {

	const [anchor, setAnchor] = useState(null);
	const [image, setImage] = useState({ id: '', img: '', title: '' });

	useEffect(() => {
		const item = itemData.find(item => item.id === odsId);
		if (item) {
			setImage(item);
		}
	}, [odsId]);

	const handleClick = (e) => {
		setAnchor(e.currentTarget);
	};

	const handleClose = () => {
		setAnchor(null);
	};

	const handleImageSelected = (image) => {
		setImage(image);
		handleClose();
	};

	const open = Boolean(anchor);
	const id = open ? 'image-selector' : undefined;

	return (
		<>
			<OutlinedInput
				size='small'
				style={{ width: '90%' }}
				value={image.title}
				placeholder='Seleccione un ODS'
				endAdornment={
					<InputAdornment position='end'>
						<IconButton aria-describedby={id} onClick={handleClick} edge='end'>
							<MenuIcon />
						</IconButton>
					</InputAdornment>
				}
			>
			</OutlinedInput>

			<Popover
				id={id}
				open={open}
				anchorEl={anchor}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<ImageList sx={{ width: 350, height: 350 }}>
					<ImageListItem key="Subheader" cols={2}>
						<ListSubheader component="div">Objetivos de Desarrollo Sostenible</ListSubheader>
					</ImageListItem>
					{itemData.map((item) => (
						<ImageListItem key={item.img} sx={{
							cursor: 'pointer',
						}}
							onClick={() => handleImageSelected(item)}
						>
							<img
								src={`${item.img}?w=248&fit=crop&auto=format`}
								srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								alt={item.title}
								loading="lazy"

							/>
							<ImageListItemBar
								title={item.title}
								subtitle={item.author}
							/>
						</ImageListItem>
					))}
				</ImageList>
			</Popover>
		</>
	);
}

export default OdsPicker;