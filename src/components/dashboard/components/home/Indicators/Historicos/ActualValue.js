import { Box, Typography } from "@mui/material";
import React from "react";
import './historicos.css';

export const ActualValue = ({ value, date }) => {
  const updatedDate = new Date(date);
  const today = new Date();

  const dateDifference = today.getMonth() - updatedDate.getMonth();

  let dateDifferenceText = '';

  if (dateDifference === 0) {
    const dayDifference = today.getDate() - updatedDate.getDate();
    dayDifference === 0
      ? dateDifferenceText = 'Hoy'
      : dateDifference === 1
        ? dateDifferenceText = `hace ${dayDifference} días`
        : dateDifferenceText = `hace ${dayDifference} día`;

  } else {
    dateDifferenceText = `hace ${dateDifference} meses`;
  }

  return (
    <Box className='actual-value-container'>
      <Box className='actual-value-elements'>
        <Typography variant="h3" gutterBottom>
          {value}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Actualizado {dateDifferenceText}
        </Typography>
      </Box>
    </Box>
  );
}