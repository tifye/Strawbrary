import { Alert, Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { Category } from '../../../../../types';
import { CategoriesStore } from '../../../../../remote_access';

interface CategoryEditFieldProps {
  selectedValue?: Category;
  handleChange: (property: string, value: any) => void;
  error?: any;
}

export default function CategoryEditField(props: CategoryEditFieldProps) {
  const categoriesStore = useRef(new CategoriesStore());
  const {selectedValue, handleChange, error} = props;
  const [value, setValue] = React.useState(selectedValue);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (selectedValue)
      categoriesStore.current.getCategory(selectedValue.id).then(setValue);
    else
      categoriesStore.current.getCategories().then((categories) => {
        setValue(categories[0]);
      });
  }, [selectedValue]);

  useEffect(() => {
    categoriesStore.current.getCategories().then(setCategories);
  }, [open]);
  return (
    <>
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
      {error &&
        <Alert severity='error'>
          {error.map((error) => (
            <><span>{error.message}</span><br /></>
          ))}
        </Alert>        
      }
    </>
  );
}
