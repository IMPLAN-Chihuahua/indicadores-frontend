import { Box, Typography } from "@mui/material";
import React from "react";
import './historicos.css';
import { ultimaFecha } from "../../../../../../utils/dateParser";

export const ActualValue = ({ value, date }) => {
  const updatedDate = new Date(date);
  const today = new Date();

  const dateDifference = today.getMonth() - updatedDate.getMonth();
  const dateDifferenceYear = today.getFullYear() - updatedDate.getFullYear();

  const dateDifferenceText = ultimaFecha(date, dateDifference, dateDifferenceYear);

  return (
    <Box className='actual-value-elements'>
      <Typography variant="h3">
        {value}
      </Typography>
      <Typography variant="caption" gutterBottom>
        Último valor disponible
      </Typography>
      <Typography variant="h5" gutterBottom>
        Actualizado {dateDifferenceText}
      </Typography>
    </Box>
  );
}