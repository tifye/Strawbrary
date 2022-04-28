import { DeleteForever } from '@mui/icons-material';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { instanceToInstance } from 'class-transformer';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { collectErrors } from '../../../../collect_validation_errors';
import { CategoriesStore } from '../../../../remote_access';
import { Category } from '../../../../types';

interface EditCategoryDialogProps {
  open: boolean;
  handleClose: () => void;
  category: Category;
}

export default function EditCategoryDialog(props: EditCategoryDialogProps) {
  const { open, handleClose, category } = props;
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [inputErrors, setInputErrors] = useState<string[] | null>(null);
  const categoriesStore = useRef(new CategoriesStore());
  const editingCategory = useMemo(() => {
    return instanceToInstance(category);
  }, [category]);


  const onInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryName(e.target.value);
      editingCategory.categoryName = e.target.value;
      const errors = await collectErrors(editingCategory);
      if (errors['categoryName']) setInputErrors(errors['categoryName']);
      else setInputErrors(null);
    },
    [categoryName, category, editingCategory]
  );

  const close = useCallback(() => {
    handleClose();
    setInputErrors(null);
  }, []);

  const onSave = async () => {
    const errors = await collectErrors(editingCategory);
    if (errors['categoryName']) {
      setInputErrors(errors['categoryName']);
      return;
    }

    try {
      await categoriesStore.current.updateCategory(editingCategory);
      close();
    } catch (e: any) {
      setInputErrors([e.message]);
    }
  };

  const onDelete = async () => {
    try {
      const wasSuccess = await categoriesStore.current.deleteCategory(editingCategory);
      if (wasSuccess) {
        close();
      } else {
        setInputErrors(['Failed to delete category']);
      }
    } catch (e: any) {
      setInputErrors([e.message]);
    }
  };

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
      <DialogTitle style={{ display: 'flex' }}>
        <Typography style={{ flexGrow: 1 }}>Edit Category</Typography>
        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          disabled={(category._count && category._count.libraryItems > 0)}
        >
          <DeleteForever />
          Delete
        </Button>
      </DialogTitle>
      <DialogContent>
        {(category._count && category._count.libraryItems > 0) &&
        <DialogContentText>Reference {category._count.libraryItems} items</DialogContentText>
        }
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          id="category-name"
          label="Category Name"
          variant="standard"
          value={categoryName}
          onChange={onInputChange}
        />
        {inputErrors && inputErrors.length > 0 && (
          <Alert severity="error">
            {inputErrors &&
              inputErrors.map((error) => (
                <span key={error}>
                  {error}
                  <br />
                </span>
              ))}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          color="success"
          variant="contained"
          disabled={!!inputErrors}
          onClick={onSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
