import { IconButton, InputAdornment, Stack, TextField } from "@mui/material"
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDebouncedCallback } from "use-debounce";


export default function SearchInput({ AdvancedSearch, onDebouncedChange, placeholder = '' }) {
    const [value, setValue] = useState('')
    const debounced = useDebouncedCallback(onDebouncedChange, 500)

    const handleChange = (val) => {
        setValue(val)
        debounced(val)
    }

    return (
        <TextField
            size="medium"
            className='dh-search-input'
            value={value}
            onChange={(e) => {
                const val = e.target.value;
                handleChange(val)
            }}
            placeholder={placeholder || 'Buscar'}
            variant='standard'
            autoComplete='off'
            InputProps={{
                startAdornment: (<InputAdornment position='start'>
                    <SearchIcon />
                </InputAdornment>),
                endAdornment: (<InputAdornment position='end'>
                    <Stack direction='row'> {
                        value?.length > 0 && (
                            <IconButton onClick={() => handleChange('')} >
                                <ClearIcon />
                            </IconButton>
                        )}
                        {AdvancedSearch}
                    </Stack>
                </InputAdornment>)
            }}
        />
    )
}