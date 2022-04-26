import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';
import { ItemInformationBox } from '../../../sub_components/ItemInformationBox';

interface LibraryItemCheckoutDialogProps {
  open: boolean;
  handleClose: () => void;
  item: LibraryItem;
}

export default function LibraryItemCheckoutDialog(
  props: LibraryItemCheckoutDialogProps
) {
  const { open, handleClose, item } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="checkout-item-dialog"
    >
      <DialogTitle id="checkout-item-dialog">Checkout Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to checkout this item?
        </DialogContentText>
        <ItemInformationBox item={item} />
        <TextField
          autoFocus
          margin="dense"
          id="checkout-item-borrower"
          label="Borrower's name"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" color="success">
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
