import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';
import LibraryItemsTableRow from '../LibraryItemsTable/LibraryItemsTableRow';

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
        <LibraryItemsTableRow item={item} selected={false} />
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
