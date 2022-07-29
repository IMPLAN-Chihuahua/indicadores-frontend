import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getCatalogos, getCatalogosDetails, getCatalogosFromIndicador, useCatalogos } from '../../../services/cataloguesService';
import OdsPicker from './OdsPicker';
import { Controller } from 'react-hook-form';
import { Grid } from '@mui/material';

const CatalogPicker = ({ idIndicatorCatalog = 0, control, xs = 12, md = 4, catalogs = [] }) => {
    const [catalogos, setCatalogos] = useState([]);
    // const { catalogos, loading } = useCatalogos();
    useEffect(() => {
        getCatalogos()
            .then(res => {
                setCatalogos(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {
                catalogos.map(catalog => {
                    if (catalog.nombre !== 'ODS') {
                        return (
                            <Grid item xs={xs} md={md} key={catalog.id}>
                                <RegularCatalogs idCatalog={catalog.id} Catalog={catalog.nombre} idIndicatorCatalog={idIndicatorCatalog} control={control} catalogs={catalogs} />
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid item xs={xs} md={md} key={catalog.id}>
                                <OdsCatalog odsId={1} />
                            </Grid>
                        )
                    }
                })
            }
        </>
    )
};

const OdsCatalog = (odsId = 1) => {
    //TODO: Receive ods id from DB
    return <OdsPicker odsId={odsId} />
};

const RegularCatalogs = ({ idCatalog, Catalog, idIndicatorCatalog, control, catalogs }) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([{ id: 0, nombre: 'Seleccione una opción', idCatalogo: 0 }]);
    const [indicatorCatalogues, setIndicatorCatalogues] = useState([{ id: 0, nombre: 'Seleccione una opción', idCatalogo: 0 }]);

    const catalogFromIndicador = catalogs.filter(catalog => catalog.id === idCatalog);

    useEffect(() => {
        getCatalogosDetails(idCatalog).
            then(res => {
                setOptions(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [0]);
    useEffect(() => {
        getCatalogosFromIndicador(idIndicatorCatalog)
            // find in array js
            //RHF Provider
            .then(res => {
                const test = res.find(
                    element => element.idCatalogoDetail === idCatalog
                )
                setIndicatorCatalogues({
                    id: test.idCatalogoDetail,
                    nombre: test.nombreAtributo,
                    idCatalogo: idCatalog
                });
            })
            .catch(err => {
                console.log(err);
            })
    }, [0]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Controller
                name={`${Catalog}`}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error }
                }) => (
                    <Autocomplete
                        id="combo-box-demo"
                        options={options}
                        getOptionLabel={option => option.nombre}
                        onChange={handleChange}
                        style={{ width: '90%' }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={`${Catalog}`}
                                variant="outlined"
                                size='small'
                                fullWidth
                                value={'a'}
                            />
                        )}
                    />
                )}
                defaultValue={[{ id: 0, nombre: 'Seleccione una opción', idCatalogo: 0 }]}
            />

        </>
    );
}


export const CatalogoAutocomplete = ({ value, onChange, label, id, error, required, opts = [] }) => {
    const [options, setOptions] = useState([]);
    const fetchCatalogDetails = useCallback(async () => {
        const items = await getCatalogosDetails(id);
        setOptions(items)
    }, [id]);

    useEffect(() => {
        if (opts.length === 0) {
            fetchCatalogDetails();
        } else {
            setOptions(opts)
        }
    }, []);

    return (<Autocomplete
        value={value}
        autoHighlight
        options={options}
        getOptionLabel={option => option.nombre}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_, data) => onChange(data)}
        renderInput={(params) => (
            <TextField
                {...params}
                label={label}
                error={!!error}
                helperText={error?.message}
                required={required}
            />
        )}
    />
    );
}

export default CatalogPicker;