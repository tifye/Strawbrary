import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { plainToInstance } from 'class-transformer';
import React, { useCallback, useRef, useState } from 'react';
import { collectErrors } from '../../../../collect_validation_errors';
import { Category } from '../../../../types';

interface CreateCategoriesDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateCategoriesDialog(
  props: CreateCategoriesDialogProps
) {
  const { open, handleClose } = props;
  const [inputError, setInputError] = useState<string[] | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const category = useRef(plainToInstance(Category, {
    id: 0,
    categoryName,
  }));

  const onInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      category.current.categoryName = e.target.value;
      setCategoryName(e.target.value);
      const errors = await collectErrors(category.current);
      console.log(errors);
      if (errors['categoryName']) setInputError(errors['categoryName']);
      else setInputError(null);
    }, []);

  const onSaveClicked = useCallback(() => {
    /* TODO: Implement */
    close();
    setInputError(null);
  }, [categoryName]);

  const close = useCallback(() => {
    handleClose();
  }, []);  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Create new Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Category Name"
          fullWidth
          variant="standard"
          id="category-name"
          onChange={onInputChange}
        />
        {inputError && inputError.length > 0 &&
        <Alert severity='error'>
          {inputError.map((error: string) => (
            <span key={error}>{error}<br /></span>
          ))}
        </Alert>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Cancel
        </Button>
        <Button onClick={onSaveClicked} color="success" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
