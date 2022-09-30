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
    setOptions(items)
  }

  const initOptions = useCallback(() => {
    if (opts.length === 0) {
      fetchOptions();
    } else {
      setOptions(opts)
    }
  }, [opts, fetcher]);

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }
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