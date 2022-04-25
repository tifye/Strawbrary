import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import categories from '../../../../../__mock_data__/categories.json';
import { Category } from '../../../../../types';

interface CategoryEditFieldProps {
  selectedValue: Category;
  handleChange: (property: string, value: any) => void;
}

export default function CategoryEditField(props: CategoryEditFieldProps) {
  const {selectedValue, handleChange} = props;
  const [value, setValue] = React.useState(selectedValue);
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);
  return (
    <Autocomplete
      disablePortal
      id={'item-category-select'}
      options={categories}
      autoComplete
      value={value}
      getOptionLabel={(option) => option.categoryName}
      onChange={(event: any, newValue: any) => {
        setValue(newValue);
        handleChange('categoryId', value);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Category" variant="standard" />
      )}
    />
  );
}
