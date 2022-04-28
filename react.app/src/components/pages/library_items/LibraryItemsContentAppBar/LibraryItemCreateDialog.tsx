import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { collectErrors } from '../../../../collect_validation_errors';
import { LibraryItemsStore } from '../../../../remote_access';
import { LibraryItem, LibraryItemType } from '../../../../types';
import typeFieldFactory from '../LibraryItemEditPanel/typeFieldFactory';

interface LibraryItemCreateDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function LibraryItemCreateDialog(props: LibraryItemCreateDialogProps) {
  const { open, handleClose } = props;
  const [item, setItem] = React.useState<LibraryItem | null>(null);
  const [errors, setErrors] = useState<any>({});
  const libraryItemsStore = useRef(new LibraryItemsStore());

  const handleFieldChange = useCallback(async (property: string, value: any) => {
    item[property] = value;
    setErrors(await collectErrors(item));
    setItem(item);
    console.log(`handleFieldChange: ${property} = ${value}`);
  }, [item]);
  
  useEffect(() => {
    // TODO: fixs this by either class-validator groups, generalizing editFields even more, by factory, or create a separate class
    const item = new LibraryItem();
    item.id = 0;
    // item.categoryId = 0;
    item.isBorrowable = true;
    item.title = '';
    item.author = '';
    item.runTimeMinutes = 0;
    item.pages = 0;
    item.type = LibraryItemType.Book;
    setItem(item);
  }, [open]);

  const onClose = () => {
    setErrors({});
    handleClose();
  };

  const onCreate = async () => {
    const validationErrors = await collectErrors(item); 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setItem(await libraryItemsStore.current.createLibraryItem(item));
      setErrors({});
      onClose();
    }
  };  
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Create a Library Item</DialogTitle>
      <DialogContent>
        <form>
          <Stack style={{ padding: 16 }} spacing={3}>
            {item && typeFieldFactory(item.type, {handleFieldChange, item, errors})}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          disabled={Object.keys(errors).length > 0}
          onClick={onCreate}
          variant="contained"
          color="success"
        >Create</Button>
      </DialogActions>
    </Dialog>
  );
}