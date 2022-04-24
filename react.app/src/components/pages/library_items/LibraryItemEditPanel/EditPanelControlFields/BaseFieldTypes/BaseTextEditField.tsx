import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';
import EditFieldProps from '../BaseEditFieldPropInterface';

interface TextEditFieldProps extends EditFieldProps {
  value: string;
}


export default function TextEditField (props: TextEditFieldProps) {
  const { label, value, ariaLabel, handleChange } = props;
  const [valueState, setValueState] = React.useState(value);
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel htmlFor={`item-${ariaLabel}-input`}>{label}</InputLabel>
      <Input
        id={`item-${ariaLabel}-input`}
        aria-describedby={`item-${ariaLabel}-helper`}
        value={valueState}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValueState(e.target.value);
          handleChange(e.target.value);
        }}
      />
    </FormControl>
  );
}
