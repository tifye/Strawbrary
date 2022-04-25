import { FormControl, Input, InputLabel } from '@mui/material';
import React, { useEffect } from 'react';
import EditFieldProps from '../BaseEditFieldPropInterface';

interface NumberEditFieldProps extends EditFieldProps {
  value: number;
}


export default function NumberEditField (props: NumberEditFieldProps) {
  const { value, label, ariaLabel, handleChange } = props;
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValueState(Number(e.target.value));
          handleChange(e.target.value);
        }}
      />
    </FormControl>
  );
}
