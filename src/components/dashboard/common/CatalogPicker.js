import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const catalog = [
    { id: 1, name: 'Categoria 1' },
    { id: 2, name: 'Categoria 2' },
    { id: 3, name: 'Categoria 3' },
    { id: 4, name: 'Categoria 4' },
    { id: 5, name: 'Categoria 5' },
]

const CatalogPicker = () => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (catalog) {
            // TODO: FETCH FROM ENDPOINT WITH CATALOG AS PARAM
            setOptions(catalog);
        }
    }, [catalog]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={option => option.name}
            onChange={handleChange}
            style={{ width: '90%' }}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Seleccione una opción"
                    variant="outlined"
                    size='small'
                    fullWidth
                />
            )}
        />
    );
};

export default CatalogPicker;