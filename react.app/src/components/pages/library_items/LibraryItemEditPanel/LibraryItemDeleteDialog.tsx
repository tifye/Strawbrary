import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';
import { ItemInformationBox } from '../../../sub_components/ItemInformationBox';

interface LibraryItemDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  item: LibraryItem;
}

export default function LibraryItemDeleteDialog(
  props: LibraryItemDeleteDialogProps
) {
  const { open, handleClose, handleDelete, item } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-item-dialog"
    >
      <DialogTitle id="delete-item-dialog">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
        <ItemInformationBox item={item} />
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
