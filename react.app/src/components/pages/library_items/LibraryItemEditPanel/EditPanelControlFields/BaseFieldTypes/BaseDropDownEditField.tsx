import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect } from 'react';
import EditFieldProps from '../BaseEditFieldPropInterface';

interface DropDownEditFieldProps extends EditFieldProps {
  values: any[];
  selectedValue: any;
}

export default function BaseDropDownEditField (props: DropDownEditFieldProps) {
  const {values, label, ariaLabel, selectedValue, handleChange} = props;
  const [value, setValue] = React.useState(selectedValue);
  const handleSelectChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    handleChange(event.target.value);
  };
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id={`${ariaLabel}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${ariaLabel}-select-label`}
        id={`${ariaLabel}-select`}
        value={value}
        onChange={handleSelectChange}
        label={label}
        style={{ textAlign: 'left' }}
      >
        {values.map((value: any) => (
          <MenuItem key={value} value={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}