import { Autocomplete, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useIsMounted from "../../hooks/useIsMounted";

export default function AutoCompleteInput(props) {
  const { value, onChange, label, error, required,
    opts = [], fetcher, getOptionLabel, helperText = '' } = props;
  const [options, setOptions] = useState([]);
  const isMounted = useIsMounted();
  const fetchOptions = async () => {
    const items = await fetcher();
    if (isMounted()) {
      setOptions(items)
    }
  }

  const initOptions = useCallback(async () => {
    if (fetcher || opts.length === 0) {
      await fetchOptions();
    } else {
      if (isMounted()) {
        setOptions(opts)
      }
    }
  }, [opts, fetchOptions, isMounted]);

  useEffect(() => {
    initOptions();
  }, []);

  return (
    <Autocomplete
      value={value}
      autoHighlight
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, data) => onChange(data)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error ? error.message : helperText}
          required={required}
        />
      )}
    />
  );
}