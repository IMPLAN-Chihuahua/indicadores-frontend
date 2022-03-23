import { Box, Button, TextField, Container, Grid, FormGroup, FormControlLabel, Switch, CssBaseline, Typography, Alert, DialogTitle, DialogContent, DialogActions, Autocomplete, Checkbox } from '@mui/material';
import React from 'react';
import { useForm, Controller, FormProvider } from "react-hook-form";
import ColorPicker from '../../common/ColorPicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { moduleSchema } from '../../../../utils/validator';
import FileInput from '../../../common/FileInput';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import './FormRelationship.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const FormRelationship = ({ data = 0, handleCloseModal }) => {
    let defaultValues = {
        temaIndicador: '',
        codigo: '',
        observaciones: '',
        activo: 'Activo' ? true : false,
        imagen: '',
        color: '',
        urlImagen: '',
    };
    defaultValues = data ? data : defaultValues;
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(moduleSchema),
        mode: 'onBlur',
    });
    const onSubmit = data => alert(JSON.stringify(data));
    const [color, setColor] = React.useState(defaultValues.color ? defaultValues.color : '#d32f2f');

    return (
        <>
            <DialogTitle>Autorizacion</DialogTitle>
            <FormProvider {...methods}>
                <Box
                    component='form'
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <DialogContent>
                    <div className='auth-container'>
                    <div className='auth-date'>
                    <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                    </div>
                    <div className='auth-assign'>

                    <Autocomplete
                    disablePortal
                    options={[
                        { label: 'The Shawshank Redemption', year: 1994 },
                        { label: 'The Godfather', year: 1972 },
                        { label: 'The Godfather: Part II', year: 1974 },
                      ]}
                    sx={{ width: 500 }}
                    renderInput={(params) => <TextField {...params} label="Usuario" />}
                    />
                    
                    <br/>

                    <Autocomplete
                        className='auth-multiple'
                        multiple
                        options={top100Films}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.title}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.title}
                            </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Indicadores"  />
                        )}
                        />
                    </div>
            
                    

                    </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancelar</Button>
                        <Button type='submit' variant='contained'>Guardar</Button>
                    </DialogActions>
                </Box>
            </FormProvider>
        </>
    )
}


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];
export default FormRelationship;