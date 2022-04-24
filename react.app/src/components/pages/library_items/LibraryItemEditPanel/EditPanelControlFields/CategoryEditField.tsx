import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import EditFieldProps from './BaseEditFieldPropInterface';
import categories from '../../../../../__mock_data__/categories.json';
import { Category } from '../../../../../types';

interface CategoryEditFieldProps extends EditFieldProps {
  selectedValue: Category;
  handleChange: (id: number) => void;
}

export default function CategoryEditField(props: CategoryEditFieldProps) {
  const {selectedValue, handleChange, label, ariaLabel} = props;
  const [value, setValue] = React.useState(selectedValue);
  return (
    <>
      <Autocomplete
        disablePortal
        id={`item-${ariaLabel}-select`}
        options={categories}
        autoComplete
        value={value}
        getOptionLabel={(option) => option.categoryName}
        onChange={(event: any, newValue: any) => {
          setValue(newValue);
          handleChange(newValue.id);
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="standard" />
        )}
      />
    </>
  );
}
