import { Alert, FormControl, Input, InputLabel } from '@mui/material';
import React, { useEffect } from 'react';
import EditFieldProps from '../BaseEditFieldPropInterface';

interface NumberEditFieldProps extends EditFieldProps {
  value: number;
  error?: string[];
}


export default function NumberEditField (props: NumberEditFieldProps) {
  const { value, label, ariaLabel, handleChange, error } = props;
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
        type="number"
        error={error ? true : false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValueState(Number(e.target.value));
          handleChange(Number(e.target.value));
        }}
      />
      {error && 
        <Alert severity="error" icon={false}>
          {error.map((error: string) => (
            <><span key={error}>{error}</span><br /></>
          ))}
        </Alert>
      }
    </FormControl>
  );
}
