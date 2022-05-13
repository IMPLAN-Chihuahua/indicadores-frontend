import { Box, Typography } from "@mui/material";
import React from "react";
import './historicos.css';

export const ActualValue = ({ value, date }) => {
  const updatedDate = new Date(date);
  const today = new Date();

  const dateDifference = today.getMonth() - updatedDate.getMonth();
  const dateDifferenceYear = today.getFullYear() - updatedDate.getFullYear();
  let dateDifferenceText = '';
  if (dateDifferenceYear > 0) {
    dateDifferenceYear === 1
      ? dateDifferenceText = `hace ${dateDifferenceYear} año`
      : dateDifferenceText = `hace ${dateDifferenceYear} años`;
  } else if (dateDifference === 0) {
    const dayDifference = today.getDate() - updatedDate.getDate();
    dayDifference === 0
      ? dateDifferenceText = 'hoy'
      : dayDifference === 1
        ? dateDifferenceText = `hace ${dayDifference} día`
        : dateDifferenceText = `hace ${dayDifference} días`;
  }
  else {
    dateDifference === 1
      ? dateDifferenceText = `hace ${dateDifference} mes`
      : dateDifferenceText = `hace ${dateDifference} meses`;
  }

  return (
    <Box className='actual-value-elements'>
      <Typography variant="h3" gutterBottom>
        {value}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Actualizado {dateDifferenceText}
      </Typography>
    </Box>
  );
}