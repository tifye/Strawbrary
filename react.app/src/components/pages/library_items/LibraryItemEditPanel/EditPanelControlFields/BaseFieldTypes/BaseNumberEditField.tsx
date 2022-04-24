import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';
import EditFieldProps from '../BaseEditFieldPropInterface';

interface NumberEditFieldProps extends EditFieldProps {
  value: number;
}


export default function NumberEditField (props: NumberEditFieldProps) {
  const { value, label, ariaLabel, handleChange } = props;
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel htmlFor={`item-${ariaLabel}-input`}>{label}</InputLabel>
      <Input
        id={`item-${ariaLabel}-input`}
        aria-describedby={`item-${ariaLabel}-helper`}
        value={value}
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
      />
    </FormControl>
  );
}
