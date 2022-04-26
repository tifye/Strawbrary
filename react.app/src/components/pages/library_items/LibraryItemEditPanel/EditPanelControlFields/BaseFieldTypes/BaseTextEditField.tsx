import { FormControl, Input, InputLabel } from '@mui/material';
import React, { useEffect } from 'react';
import EditFieldProps from '../BaseEditFieldPropInterface';
import ErrorAlert from './ErrorAlert';

interface TextEditFieldProps extends EditFieldProps {
  value: string;
  error?: string[];
}


export default function TextEditField (props: TextEditFieldProps) {
  const { label, value, ariaLabel, handleChange, error } = props;
  const [valueState, setValueState] = React.useState(value);
  useEffect(() => {
    setValueState(value);
  }, [value]);
  return (
    <FormControl fullWidth variant="standard">
      
      <InputLabel htmlFor={`item-${ariaLabel}-input`}>{label}</InputLabel>
      <Input
        id={`item-${ariaLabel}-input`}
        aria-describedby={`item-${ariaLabel}-helper`}
        value={valueState}
        error={error ? true : false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValueState(e.target.value);
          handleChange(e.target.value);
        }}
      />
      {error && <ErrorAlert errors={error} />}
    </FormControl>
  );
}
