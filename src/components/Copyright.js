import { Typography } from '@mui/material';
import React from 'react';

const Copyright = () => {
    return (
        <Typography variant='caption'>
            Copyright © {new Date().getFullYear()} Instituto de Planeación Integral del Municipio de Chihuahua
        </Typography>
    );
};

export default Copyright;