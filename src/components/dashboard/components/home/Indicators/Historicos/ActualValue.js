import { Box, Typography } from "@mui/material";
import React from "react";
import './historicos.css';
import { ultimaFecha } from "../../../../../../utils/dateParser";

export const ActualValue = ({ latestIndicador }) => {
  const { updatedAt, ultimoValorDisponible } = latestIndicador;
  const updatedDate = new Date(updatedAt);
  const today = new Date();

  const dateDifference = today.getMonth() - updatedDate.getMonth();
  const dateDifferenceYear = today.getFullYear() - updatedDate.getFullYear();

  const dateDifferenceText = ultimaFecha(updatedAt, dateDifference, dateDifferenceYear);

  return (
    <Box className='actual-value-elements'>
      <Typography variant="h3">
        {new Intl.NumberFormat('es-MX', {
            style: 'decimal'
        }).format(ultimoValorDisponible)}
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