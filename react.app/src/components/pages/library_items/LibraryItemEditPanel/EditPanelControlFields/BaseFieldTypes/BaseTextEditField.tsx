import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';
import EditFieldProps from '../BaseEditFieldPropInterface';

interface TextEditFieldProps extends EditFieldProps {
  value: string;
}


export default function TextEditField (props: TextEditFieldProps) {
  const { label, value, ariaLabel, handleChange } = props;
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel htmlFor={`item-${ariaLabel}-input`}>{label}</InputLabel>
      <Input
        id={`item-${ariaLabel}-input`}
        aria-describedby={`item-${ariaLabel}-helper`}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
      />
    </FormControl>
  );
}
