import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Owner.css';
import { OwnerListDropdown } from './OwnerList';
import { getUsersFromIndicador } from '../../../../../../services/userService';

//Type puede ser 1 o 2 dependiendo del scope que se tenga planeado:
//1: General (Todos los usuarios)
//2: Especifico (cuando se trata de mostrar los usuarios de un indicador)
const Owner = ({ type = 1, id, actualOwner }) => {
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardContent className='moks'>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Responsable del indicador
        </Typography>
        <hr className="owner-hr" />
        <OwnerListDropdown type={type} id={id} actualOwner={actualOwner} />
      </CardContent>

    </Card>
  );
}

export default Owner