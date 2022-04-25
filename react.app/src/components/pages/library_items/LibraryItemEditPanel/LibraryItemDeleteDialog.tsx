import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';

interface LibraryItemDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  item: LibraryItem;
}

export default function LibraryItemDeleteDialog(props: LibraryItemDeleteDialogProps) {
  const { open, handleClose, handleDelete, item } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-item-dialog"
    >
      <DialogTitle id="delete-item-dialog">Are you sure?</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this item?
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Chip label={item.title} color="error"/>
          <Chip label={item.type} color="error"/>
          <Chip label={item.isBorrowable ? 'Available' : 'Unavailable'} color="error"/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
