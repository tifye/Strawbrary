import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { Category } from '../../../../../types';
import { CategoriesStore } from '../../../../../remote_access';

interface CategoryEditFieldProps {
  selectedValue: Category;
  handleChange: (property: string, value: any) => void;
}

export default function CategoryEditField(props: CategoryEditFieldProps) {
  const categoriesStore = useRef(new CategoriesStore());
  const {selectedValue, handleChange} = props;
  const [value, setValue] = React.useState(selectedValue);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    categoriesStore.current.getCategory(selectedValue.id).then(setValue);
  }, [selectedValue]);

  useEffect(() => {
    categoriesStore.current.getCategories().then(setCategories);
  }, [open]);
  return (
    <Autocomplete
      disablePortal
      id={'item-category-select'}
      options={categories}
      autoComplete
      value={value}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => (option as Category).categoryName}
      onChange={(event: any, newValue: any) => {
        const { id } = newValue;
        setValue(newValue);
        handleChange('categoryId', id);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Category" variant="standard" />
      )}
    />
  );
}
