import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import React from 'react';
import { LibraryItem } from '../../../../types';

interface LibraryItemCheckoutDialogProps {
  open: boolean;
  handleClose: () => void;
  item: LibraryItem;
}

export default function LibraryItemCheckoutDialog (props: LibraryItemCheckoutDialogProps) {
  const { open, handleClose, item } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="checkout-item-dialog"
    >
      <DialogTitle id="checkout-item-dialog">Checkout Item</DialogTitle>
      <DialogContent>
        Are you sure you want to checkout this item?
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Chip label={item.id} color="info"/>
          <Chip label={item.title} color="info"/>
          <Chip label={item.type} color="info"/>
          <Chip label={item.isBorrowable ? 'Available' : 'Unavailable'} color="info"/>
        </Stack>
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