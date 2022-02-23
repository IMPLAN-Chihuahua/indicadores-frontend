import { Typography } from '@mui/material';
import React from 'react';

const Copyright = () => {
    return (
        <Typography variant='caption'>
            Copyright © {new Date().getFullYear()} IMPLAN
        </Typography>
    );
};

export default Copyright;